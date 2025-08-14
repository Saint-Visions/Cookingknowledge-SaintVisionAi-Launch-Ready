import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mic, 
  MicOff, 
  Square, 
  Play, 
  Pause,
  Volume2,
  Settings,
  Zap,
  Activity,
  CheckCircle,
  AlertCircle,
  Upload,
  Trash2,
  Download
} from 'lucide-react';
import { useSpeech, UseSpeechOptions } from '@/hooks/use-speech';
import { cn } from '@/lib/utils';

export interface VoiceInterfaceProps {
  mode?: 'compact' | 'full' | 'floating';
  context?: 'realtime' | 'batch' | 'enterprise';
  onTranscript?: (transcript: string, confidence: number) => void;
  onStatusChange?: (status: string) => void;
  className?: string;
  showProviderInfo?: boolean;
  showTranscript?: boolean;
  maxHeight?: string;
  placeholder?: string;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  mode = 'full',
  context = 'realtime',
  onTranscript,
  onStatusChange,
  className,
  showProviderInfo = true,
  showTranscript = true,
  maxHeight = '400px',
  placeholder = 'Start speaking to see your transcript here...'
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [volume, setVolume] = useState(0);

  const speechOptions: UseSpeechOptions = {
    context,
    onTranscript: (result) => {
      onTranscript?.(result.transcript, result.confidence);
    },
    onStatusChange: (status) => {
      onStatusChange?.(status);
    },
    onError: (error) => {
      console.error('Voice interface error:', error);
    }
  };

  const {
    isRecording,
    isProcessing,
    status,
    transcript,
    interimTranscript,
    confidence,
    error,
    currentProvider,
    availableProviders,
    providerStatus,
    startRecording,
    stopRecording,
    toggleRecording,
    clearTranscript,
    processAudioFile,
    updateConfig,
    switchProvider
  } = useSpeech(speechOptions);

  // Simulate volume levels during recording (in real app, you'd get this from audio analysis)
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setVolume(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setVolume(0);
    }
  }, [isRecording]);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
      try {
        await processAudioFile(file);
      } catch (error) {
        console.error('Failed to process uploaded file:', error);
      }
    }
  };

  // Get status styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recording': return 'text-green-400';
      case 'processing': return 'text-blue-400';
      case 'error': return 'text-red-400';
      default: return 'text-white/70';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recording': return <Activity className="w-4 h-4 animate-pulse" />;
      case 'processing': return <Zap className="w-4 h-4 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'idle': return <CheckCircle className="w-4 h-4" />;
      default: return <Mic className="w-4 h-4" />;
    }
  };

  // Compact mode - just the recording button
  if (mode === 'compact') {
    return (
      <Button
        onClick={toggleRecording}
        variant={isRecording ? "default" : "outline"}
        size="sm"
        disabled={isProcessing}
        className={cn(
          "transition-all duration-200",
          isRecording && "bg-red-500 hover:bg-red-600 animate-pulse",
          className
        )}
      >
        {isRecording ? (
          <Square className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
        {isRecording ? 'Stop' : 'Record'}
      </Button>
    );
  }

  // Floating mode - minimal overlay
  if (mode === 'floating') {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Card className="glass-morphism border-white/20 w-80">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(status)}
                <span className={cn("text-sm font-medium capitalize", getStatusColor(status))}>
                  {status}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {currentProvider}
              </Badge>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <Button
                onClick={toggleRecording}
                variant={isRecording ? "default" : "outline"}
                size="sm"
                disabled={isProcessing}
                className={cn(
                  "flex-1",
                  isRecording && "bg-red-500 hover:bg-red-600"
                )}
              >
                {isRecording ? <Square className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isRecording ? 'Stop' : 'Record'}
              </Button>
              
              <Button
                onClick={clearTranscript}
                variant="outline"
                size="sm"
                disabled={!transcript}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {isRecording && (
              <div className="mb-3">
                <Progress value={volume} className="h-1" />
                <p className="text-xs text-white/60 mt-1">Audio level</p>
              </div>
            )}

            {(transcript || interimTranscript) && (
              <div className="text-sm text-white/80 max-h-20 overflow-y-auto">
                {transcript}
                {interimTranscript && (
                  <span className="text-white/50 italic">{interimTranscript}</span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Full mode - complete interface
  return (
    <Card className={cn("glass-morphism border-white/10", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-blue-400" />
            Voice Interface
          </CardTitle>
          
          {showProviderInfo && (
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {currentProvider}
              </Badge>
              <div className="flex items-center space-x-1">
                {Object.entries(providerStatus).map(([provider, available]) => (
                  <div
                    key={provider}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      available ? "bg-green-400" : "bg-red-400"
                    )}
                    title={`${provider}: ${available ? 'Available' : 'Unavailable'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Bar */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
          <div className="flex items-center space-x-2">
            {getStatusIcon(status)}
            <span className={cn("font-medium capitalize", getStatusColor(status))}>
              {status}
            </span>
            {confidence > 0 && (
              <Badge variant="secondary" className="text-xs">
                {Math.round(confidence * 100)}% confidence
              </Badge>
            )}
          </div>
          
          <div className="text-sm text-white/60">
            {availableProviders.length} provider{availableProviders.length !== 1 ? 's' : ''} available
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Recording Controls */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={toggleRecording}
            variant={isRecording ? "default" : "outline"}
            disabled={isProcessing}
            className={cn(
              "h-12 transition-all duration-200",
              isRecording && "bg-red-500 hover:bg-red-600 animate-pulse"
            )}
          >
            {isRecording ? (
              <>
                <Square className="w-5 h-5 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Start Recording
              </>
            )}
          </Button>

          <div className="relative">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing}
            />
            <Button
              variant="outline"
              disabled={isProcessing}
              className="w-full h-12"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Audio
            </Button>
          </div>
        </div>

        {/* Volume Meter */}
        {isRecording && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Audio Level</span>
              <span className="text-sm text-white/70">{Math.round(volume)}%</span>
            </div>
            <Progress value={volume} className="h-2" />
          </div>
        )}

        {/* Transcript Display */}
        {showTranscript && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/90">Transcript</span>
              {transcript && (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={clearTranscript}
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => navigator.clipboard.writeText(transcript)}
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div 
              className="min-h-[100px] p-3 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm overflow-y-auto"
              style={{ maxHeight }}
            >
              {transcript || interimTranscript ? (
                <div>
                  {transcript}
                  {interimTranscript && (
                    <span className="text-white/50 italic">
                      {interimTranscript}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-white/50 italic">
                  {placeholder}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Provider Selection */}
        {availableProviders.length > 1 && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-white/90">Speech Provider</span>
            <div className="grid grid-cols-3 gap-2">
              {(['deepgram', 'azure', 'hybrid'] as const).map((provider) => (
                <Button
                  key={provider}
                  onClick={() => switchProvider(provider)}
                  variant={currentProvider?.toLowerCase().includes(provider) ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  {provider === 'deepgram' && 'Deepgram'}
                  {provider === 'azure' && 'Azure'}
                  {provider === 'hybrid' && 'Hybrid'}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceInterface;
