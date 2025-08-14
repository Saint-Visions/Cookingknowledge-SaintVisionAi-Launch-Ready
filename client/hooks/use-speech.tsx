import { useState, useEffect, useCallback, useRef } from 'react';
import { getSpeechService, TranscriptionResult, SpeechConfig, SpeechProvider } from '@/lib/speech-services';

export interface UseSpeechOptions {
  context?: 'realtime' | 'batch' | 'enterprise';
  config?: SpeechConfig;
  autoStart?: boolean;
  onTranscript?: (result: TranscriptionResult) => void;
  onError?: (error: Error) => void;
  onStatusChange?: (status: SpeechStatus) => void;
}

export type SpeechStatus = 'idle' | 'starting' | 'recording' | 'processing' | 'error';

export interface UseSpeechReturn {
  // State
  isRecording: boolean;
  isProcessing: boolean;
  status: SpeechStatus;
  transcript: string;
  interimTranscript: string;
  confidence: number;
  error: string | null;
  
  // Provider info
  currentProvider: string | null;
  availableProviders: string[];
  providerStatus: Record<string, boolean>;
  
  // Controls
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  toggleRecording: () => Promise<void>;
  clearTranscript: () => void;
  
  // File processing
  processAudioFile: (file: File) => Promise<TranscriptionResult>;
  
  // Configuration
  updateConfig: (config: Partial<SpeechConfig>) => void;
  switchProvider: (provider: 'deepgram' | 'azure' | 'hybrid') => void;
}

export const useSpeech = (options: UseSpeechOptions = {}): UseSpeechReturn => {
  // State management
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentProvider, setCurrentProvider] = useState<string | null>(null);
  const [config, setConfig] = useState<SpeechConfig>(options.config || { provider: 'hybrid' });

  // Refs for managing state
  const speechService = useRef(getSpeechService());
  const activeProvider = useRef<SpeechProvider | null>(null);
  const isInitialized = useRef(false);

  // Initialize speech service
  useEffect(() => {
    if (!isInitialized.current) {
      try {
        speechService.current = getSpeechService();
        setCurrentProvider('Hybrid');
        isInitialized.current = true;
      } catch (error) {
        console.error('Failed to initialize speech service:', error);
        setError('Failed to initialize speech service');
        setStatus('error');
      }
    }
  }, []);

  // Get available providers
  const availableProviders = speechService.current?.getAvailableProviders() || [];
  const providerStatus = speechService.current?.getProviderStatus() || {};

  // Update status and notify parent
  const updateStatus = useCallback((newStatus: SpeechStatus) => {
    setStatus(newStatus);
    options.onStatusChange?.(newStatus);
  }, [options.onStatusChange]);

  // Handle transcript updates
  const handleTranscript = useCallback((result: TranscriptionResult) => {
    if (result.is_final) {
      setTranscript(prev => prev + result.transcript + ' ');
      setInterimTranscript('');
    } else {
      setInterimTranscript(result.transcript);
    }
    
    setConfidence(result.confidence);
    options.onTranscript?.(result);
  }, [options.onTranscript]);

  // Start real-time recording
  const startRecording = useCallback(async () => {
    if (isRecording) return;

    try {
      setError(null);
      updateStatus('starting');
      setIsRecording(true);

      // Start real-time transcription
      activeProvider.current = await speechService.current.startRealTimeTranscription({
        ...config,
        language: config.language || 'en-US',
        punctuate: true,
        smart_format: true,
      });

      // Set up transcript callback for Deepgram
      if (activeProvider.current && 'onTranscript' in activeProvider.current) {
        (activeProvider.current as any).onTranscript(handleTranscript);
      }

      setCurrentProvider(activeProvider.current.name);
      updateStatus('recording');

    } catch (error) {
      console.error('Failed to start recording:', error);
      setError(error instanceof Error ? error.message : 'Failed to start recording');
      setIsRecording(false);
      updateStatus('error');
      options.onError?.(error instanceof Error ? error : new Error('Failed to start recording'));
    }
  }, [isRecording, config, handleTranscript, updateStatus, options]);

  // Stop recording
  const stopRecording = useCallback(async () => {
    if (!isRecording) return;

    try {
      updateStatus('processing');
      
      await speechService.current.stopRealTimeTranscription();
      activeProvider.current = null;
      
      setIsRecording(false);
      updateStatus('idle');

    } catch (error) {
      console.error('Failed to stop recording:', error);
      setError(error instanceof Error ? error.message : 'Failed to stop recording');
      updateStatus('error');
      options.onError?.(error instanceof Error ? error : new Error('Failed to stop recording'));
    }
  }, [isRecording, updateStatus, options]);

  // Toggle recording state
  const toggleRecording = useCallback(async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  // Clear transcript
  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  // Process audio file
  const processAudioFile = useCallback(async (file: File): Promise<TranscriptionResult> => {
    setIsProcessing(true);
    setError(null);
    updateStatus('processing');

    try {
      const audioBlob = new Blob([file], { type: file.type });
      const result = await speechService.current.transcribe(
        audioBlob, 
        options.context || 'batch',
        config
      );

      setTranscript(result.transcript);
      setConfidence(result.confidence);
      updateStatus('idle');
      
      return result;

    } catch (error) {
      console.error('Failed to process audio file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process audio file';
      setError(errorMessage);
      updateStatus('error');
      options.onError?.(error instanceof Error ? error : new Error(errorMessage));
      throw error;

    } finally {
      setIsProcessing(false);
    }
  }, [config, options.context, updateStatus, options.onError]);

  // Update configuration
  const updateConfig = useCallback((newConfig: Partial<SpeechConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Switch provider (for future use)
  const switchProvider = useCallback((provider: 'deepgram' | 'azure' | 'hybrid') => {
    setConfig(prev => ({ ...prev, provider }));
    setCurrentProvider(provider === 'hybrid' ? 'Hybrid' : provider === 'deepgram' ? 'Deepgram' : 'Azure Speech');
  }, []);

  // Auto-start if requested
  useEffect(() => {
    if (options.autoStart && !isRecording && status === 'idle') {
      startRecording();
    }
  }, [options.autoStart, isRecording, status, startRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        speechService.current.stopRealTimeTranscription();
      }
    };
  }, [isRecording]);

  return {
    // State
    isRecording,
    isProcessing,
    status,
    transcript,
    interimTranscript,
    confidence,
    error,
    
    // Provider info
    currentProvider,
    availableProviders,
    providerStatus,
    
    // Controls
    startRecording,
    stopRecording,
    toggleRecording,
    clearTranscript,
    
    // File processing
    processAudioFile,
    
    // Configuration
    updateConfig,
    switchProvider,
  };
};

export default useSpeech;
