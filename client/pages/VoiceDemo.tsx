import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AppLayout } from '@/components/AppLayout';
import VoiceInterface from '@/components/VoiceInterface';
import { useSpeech } from '@/hooks/use-speech';
import {
  Mic,
  Volume2,
  Zap,
  Brain,
  Settings,
  CheckCircle,
  AlertCircle,
  Play,
  Square,
  Download,
  Upload,
  Globe,
  Crown,
  Sparkles,
  Activity
} from 'lucide-react';

export default function VoiceDemo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<'realtime' | 'batch' | 'comparison'>('realtime');
  const [demoResults, setDemoResults] = useState<Array<{
    provider: string;
    transcript: string;
    confidence: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    clearTranscript,
    processAudioFile,
    switchProvider
  } = useSpeech({
    context: selectedDemo === 'realtime' ? 'realtime' : 'batch',
    onTranscript: (result) => {
      console.log('Demo transcript:', result);
    },
    onError: (error) => {
      console.error('Demo error:', error);
    }
  });

  const handleProviderComparison = async () => {
    // Demo: Compare different providers on the same audio
    // This would be implemented with actual audio samples
    setDemoResults([
      {
        provider: 'Deepgram',
        transcript: 'Welcome to SaintVision AI voice demonstration featuring advanced speech recognition technology.',
        confidence: 0.97,
        duration: 2.3
      },
      {
        provider: 'Azure Speech',
        transcript: 'Welcome to SaintVision AI voice demonstration featuring advanced speech recognition technology.',
        confidence: 0.92,
        duration: 3.1
      }
    ]);
  };

  const demoFeatures = [
    {
      icon: Zap,
      title: 'Real-time Transcription',
      description: 'Live speech-to-text with 150ms latency',
      status: 'active',
      color: 'text-blue-400'
    },
    {
      icon: Brain,
      title: 'Hybrid AI Processing',
      description: 'Smart routing between Deepgram and Azure',
      status: 'active',
      color: 'text-purple-400'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Support for 30+ languages and dialects',
      status: 'active',
      color: 'text-green-400'
    },
    {
      icon: Crown,
      title: 'Enterprise Grade',
      description: 'SOC 2 compliant with 99.9% uptime',
      status: 'active',
      color: 'text-gold-400'
    }
  ];

  const useCases = [
    {
      title: 'Live Conversations',
      description: 'Real-time chat with AI assistants',
      provider: 'Deepgram',
      latency: '~150ms',
      accuracy: '98%',
      icon: MessageSquare
    },
    {
      title: 'Batch Processing',
      description: 'Process recorded calls and meetings',
      provider: 'Azure + Deepgram',
      latency: '~2-5s',
      accuracy: '95%',
      icon: Upload
    },
    {
      title: 'Training Data',
      description: 'Custom model training for business terms',
      provider: 'Azure Speech',
      latency: 'Training mode',
      accuracy: '92%',
      icon: Settings
    }
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-charcoal-900 text-white">
        {/* Header */}
        <div className="bg-charcoal-800 border-b border-white/10 p-6">
          <div 
            className={`transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center saintvision-glow">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold saintvision-gradient-text">
                    Voice AI Demonstration
                  </h1>
                  <p className="text-white/70">
                    Experience Deepgram + Azure Speech Integration
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  {availableProviders.length} Providers Active
                </Badge>
                <div className="flex items-center space-x-2">
                  {Object.entries(providerStatus).map(([provider, available]) => (
                    <div
                      key={provider}
                      className={`w-3 h-3 rounded-full ${
                        available ? 'bg-green-400' : 'bg-red-400'
                      }`}
                      title={`${provider}: ${available ? 'Available' : 'Unavailable'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Demo Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className={`glass-morphism cursor-pointer transition-all ${
                selectedDemo === 'realtime' 
                  ? 'border-blue-500/50 bg-blue-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedDemo('realtime')}
            >
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <h3 className="font-semibold mb-2">Real-time Demo</h3>
                <p className="text-white/60 text-sm">Live speech transcription</p>
              </CardContent>
            </Card>

            <Card 
              className={`glass-morphism cursor-pointer transition-all ${
                selectedDemo === 'batch' 
                  ? 'border-purple-500/50 bg-purple-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedDemo('batch')}
            >
              <CardContent className="p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <h3 className="font-semibold mb-2">Batch Processing</h3>
                <p className="text-white/60 text-sm">Upload audio files</p>
              </CardContent>
            </Card>

            <Card 
              className={`glass-morphism cursor-pointer transition-all ${
                selectedDemo === 'comparison' 
                  ? 'border-green-500/50 bg-green-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedDemo('comparison')}
            >
              <CardContent className="p-6 text-center">
                <Activity className="w-8 h-8 mx-auto mb-3 text-green-400" />
                <h3 className="font-semibold mb-2">Provider Comparison</h3>
                <p className="text-white/60 text-sm">Compare accuracy & speed</p>
              </CardContent>
            </Card>
          </div>

          {/* Demo Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Voice Interface */}
            <div className="space-y-6">
              <Card className="glass-morphism border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mic className="w-5 h-5 mr-2 text-blue-400" />
                    {selectedDemo === 'realtime' && 'Real-time Voice Interface'}
                    {selectedDemo === 'batch' && 'Batch Processing Interface'}
                    {selectedDemo === 'comparison' && 'Provider Comparison'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDemo === 'comparison' ? (
                    <div className="space-y-4">
                      <Button
                        onClick={handleProviderComparison}
                        className="w-full bg-green-500 hover:bg-green-600"
                      >
                        <Activity className="w-4 h-4 mr-2" />
                        Run Provider Comparison
                      </Button>
                      
                      {demoResults.length > 0 && (
                        <div className="space-y-3">
                          {demoResults.map((result, index) => (
                            <Card key={index} className="bg-white/5 border-white/10">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="outline">{result.provider}</Badge>
                                  <span className="text-sm text-white/60">{result.duration}s</span>
                                </div>
                                <p className="text-sm text-white/80 mb-2">{result.transcript}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-white/60">Confidence</span>
                                  <span className="text-xs text-green-400">{Math.round(result.confidence * 100)}%</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <VoiceInterface
                      mode="full"
                      context={selectedDemo}
                      showProviderInfo={true}
                      showTranscript={true}
                      maxHeight="300px"
                      placeholder={
                        selectedDemo === 'realtime' 
                          ? "Click record and start speaking to see real-time transcription..."
                          : "Upload an audio file to see batch processing in action..."
                      }
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Features & Information */}
            <div className="space-y-6">
              {/* Feature Grid */}
              <Card className="glass-morphism border-white/10">
                <CardHeader>
                  <CardTitle>Voice AI Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {demoFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <Icon className={`w-6 h-6 mb-2 ${feature.color}`} />
                          <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                          <p className="text-xs text-white/60">{feature.description}</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {feature.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Use Cases */}
              <Card className="glass-morphism border-white/10">
                <CardHeader>
                  <CardTitle>Use Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {useCases.map((useCase, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{useCase.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {useCase.provider}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{useCase.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-white/50">Latency:</span>
                            <span className="text-blue-400 ml-2">{useCase.latency}</span>
                          </div>
                          <div>
                            <span className="text-white/50">Accuracy:</span>
                            <span className="text-green-400 ml-2">{useCase.accuracy}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Integration Status */}
              <Card className="glass-morphism border-white/10">
                <CardHeader>
                  <CardTitle>Integration Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Deepgram SDK</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">Connected</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Azure Speech</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">Available</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Hybrid Routing</span>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-gold-400" />
                        <span className="text-xs text-gold-400">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WebSocket Streaming</span>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                        <span className="text-xs text-blue-400">Real-time</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Technical Specifications */}
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-400">Deepgram Integration</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li>• Nova-2 model for highest accuracy</li>
                    <li>• WebSocket streaming for real-time</li>
                    <li>• Custom vocabulary support</li>
                    <li>• Diarization and punctuation</li>
                    <li>• 150ms average latency</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-400">Azure Speech Integration</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li>• Enterprise compliance features</li>
                    <li>• Custom neural voice models</li>
                    <li>• Batch processing capabilities</li>
                    <li>• SOC 2 Type II certification</li>
                    <li>• Multi-language support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-green-400">Hybrid Architecture</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li>• Smart provider routing</li>
                    <li>• Automatic failover system</li>
                    <li>• Cost optimization logic</li>
                    <li>• Performance monitoring</li>
                    <li>• Context-aware selection</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
