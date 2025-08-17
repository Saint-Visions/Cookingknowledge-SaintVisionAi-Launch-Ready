import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

// Types for speech services
export interface SpeechConfig {
  provider: 'deepgram' | 'azure' | 'hybrid';
  model?: string;
  language?: string;
  punctuate?: boolean;
  smart_format?: boolean;
  profanity_filter?: boolean;
  redact?: string[];
}

export interface TranscriptionResult {
  transcript: string;
  confidence: number;
  alternatives?: Array<{
    transcript: string;
    confidence: number;
  }>;
  is_final: boolean;
  channel?: number;
  duration?: number;
  start?: number;
  end?: number;
}

export interface SpeechProvider {
  name: string;
  isRealTime: boolean;
  transcribe(audio: Blob, config?: SpeechConfig): Promise<TranscriptionResult>;
  synthesize?(text: string, config?: SpeechConfig): Promise<AudioBuffer>;
  startRealTimeTranscription?(config?: SpeechConfig): Promise<void>;
  stopRealTimeTranscription?(): Promise<void>;
  isAvailable(): boolean;
}

// Deepgram Provider - Real-time, high accuracy, low latency
export class DeepgramProvider implements SpeechProvider {
  name = 'Deepgram';
  isRealTime = true;
  private client: any;
  private connection: any;
  private isConnected = false;
  private onTranscriptCallback?: (result: TranscriptionResult) => void;

  constructor(private apiKey: string) {
    if (this.apiKey) {
      this.client = createClient(this.apiKey);
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey && !!this.client;
  }

  async transcribe(audio: Blob, config?: SpeechConfig): Promise<TranscriptionResult> {
    if (!this.isAvailable()) {
      throw new Error('Deepgram client not available');
    }

    try {
      const arrayBuffer = await audio.arrayBuffer();
      const response = await this.client.listen.prerecorded.transcribeFile(
        new Uint8Array(arrayBuffer),
        {
          model: config?.model || 'nova-2',
          language: config?.language || 'en-US',
          punctuate: config?.punctuate ?? true,
          smart_format: config?.smart_format ?? true,
          profanity_filter: config?.profanity_filter ?? false,
          redact: config?.redact || [],
          utterances: true,
          diarize: true,
        }
      );

      const transcript = response.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';
      const confidence = response.result?.results?.channels?.[0]?.alternatives?.[0]?.confidence || 0;

      return {
        transcript,
        confidence,
        is_final: true,
        alternatives: response.result?.results?.channels?.[0]?.alternatives?.slice(1) || [],
      };
    } catch (error) {
      console.error('Deepgram transcription error:', error);
      throw new Error(`Deepgram transcription failed: ${error}`);
    }
  }

  async startRealTimeTranscription(config?: SpeechConfig): Promise<void> {
    if (!this.isAvailable()) {
      throw new Error('Deepgram client not available');
    }

    if (this.isConnected) {
      await this.stopRealTimeTranscription();
    }

    try {
      this.connection = this.client.listen.live({
        model: config?.model || 'nova-2',
        language: config?.language || 'en-US',
        punctuate: config?.punctuate ?? true,
        smart_format: config?.smart_format ?? true,
        profanity_filter: config?.profanity_filter ?? false,
        redact: config?.redact || [],
        interim_results: true,
        utterance_end_ms: 1000,
        vad_events: true,
        endpointing: 300,
      });

      this.connection.on(LiveTranscriptionEvents.Open, () => {
        console.log('🎙️ Deepgram real-time connection opened');
        this.isConnected = true;
      });

      this.connection.on(LiveTranscriptionEvents.Transcript, (data: any) => {
        const transcript = data.channel?.alternatives?.[0]?.transcript;
        const confidence = data.channel?.alternatives?.[0]?.confidence;
        const is_final = data.is_final;

        if (transcript && this.onTranscriptCallback) {
          this.onTranscriptCallback({
            transcript,
            confidence: confidence || 0,
            is_final,
            alternatives: data.channel?.alternatives?.slice(1) || [],
            duration: data.duration,
            start: data.start,
            end: data.end,
          });
        }
      });

      this.connection.on(LiveTranscriptionEvents.Error, (error: any) => {
        console.error('Deepgram connection error:', error);
      });

      this.connection.on(LiveTranscriptionEvents.Close, () => {
        console.log('🔴 Deepgram connection closed');
        this.isConnected = false;
      });

      // Start capturing microphone
      await this.startMicrophoneCapture();

    } catch (error) {
      console.error('Failed to start Deepgram real-time transcription:', error);
      throw error;
    }
  }

  async stopRealTimeTranscription(): Promise<void> {
    if (this.connection) {
      this.connection.finish();
      this.connection = null;
      this.isConnected = false;
    }
    await this.stopMicrophoneCapture();
  }

  private mediaRecorder?: MediaRecorder;
  private audioStream?: MediaStream;

  private async startMicrophoneCapture(): Promise<void> {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
        } 
      });

      this.mediaRecorder = new MediaRecorder(this.audioStream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && this.connection) {
          event.data.arrayBuffer().then((arrayBuffer) => {
            this.connection.send(new Uint8Array(arrayBuffer));
          });
        }
      };

      this.mediaRecorder.start(100); // Send data every 100ms for real-time processing
    } catch (error) {
      console.error('Failed to start microphone capture:', error);
      throw error;
    }
  }

  private async stopMicrophoneCapture(): Promise<void> {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder = undefined;
    }
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = undefined;
    }
  }

  onTranscript(callback: (result: TranscriptionResult) => void): void {
    this.onTranscriptCallback = callback;
  }
}

// Azure Speech Provider - Enterprise features, compliance, custom models
export class AzureSpeechProvider implements SpeechProvider {
  name = 'Azure Speech';
  isRealTime = false;

  constructor(
    private subscriptionKey: string,
    private region: string
  ) {}

  isAvailable(): boolean {
    return !!this.subscriptionKey && !!this.region;
  }

  async transcribe(audio: Blob, config?: SpeechConfig): Promise<TranscriptionResult> {
    if (!this.isAvailable()) {
      throw new Error('Azure Speech credentials not available');
    }

    try {
      const arrayBuffer = await audio.arrayBuffer();
      const endpoint = `https://${this.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          'Content-Type': 'audio/wav',
          'Accept': 'application/json',
        },
        body: arrayBuffer,
      });

      if (!response.ok) {
        throw new Error(`Azure Speech API error: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        transcript: result.DisplayText || '',
        confidence: result.Confidence || 0,
        is_final: true,
        duration: result.Duration,
      };
    } catch (error) {
      console.error('Azure Speech transcription error:', error);
      throw new Error(`Azure Speech transcription failed: ${error}`);
    }
  }

  async synthesize(text: string, config?: SpeechConfig): Promise<AudioBuffer> {
    if (!this.isAvailable()) {
      throw new Error('Azure Speech credentials not available');
    }

    const endpoint = `https://${this.region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const ssml = `
      <speak version='1.0' xml:lang='${config?.language || 'en-US'}'>
        <voice xml:lang='${config?.language || 'en-US'}' xml:gender='Female' name='en-US-AriaNeural'>
          ${text}
        </voice>
      </speak>
    `;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
        },
        body: ssml,
      });

      if (!response.ok) {
        throw new Error(`Azure TTS API error: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      return await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Azure TTS error:', error);
      throw new Error(`Azure TTS failed: ${error}`);
    }
  }
}

// Hybrid Speech Service - Smart routing between providers
export class HybridSpeechService {
  private deepgram?: DeepgramProvider;
  private azure?: AzureSpeechProvider;
  private fallbackProvider?: SpeechProvider;

  constructor(config: {
    deepgram?: { apiKey: string };
    azure?: { subscriptionKey: string; region: string };
  }) {
    if (config.deepgram?.apiKey) {
      this.deepgram = new DeepgramProvider(config.deepgram.apiKey);
    }
    
    if (config.azure?.subscriptionKey && config.azure?.region) {
      this.azure = new AzureSpeechProvider(config.azure.subscriptionKey, config.azure.region);
    }

    // Set fallback priority: Azure -> Deepgram -> Browser API
    if (this.azure?.isAvailable()) {
      this.fallbackProvider = this.azure;
    } else if (this.deepgram?.isAvailable()) {
      this.fallbackProvider = this.deepgram;
    }
  }

  selectProvider(
    context: 'realtime' | 'batch' | 'enterprise' | 'training',
    options?: { preferAccuracy?: boolean; preferSpeed?: boolean }
  ): SpeechProvider {
    // Smart routing logic based on use case
    switch (context) {
      case 'realtime':
        // Prefer Deepgram for real-time (low latency, high accuracy)
        if (this.deepgram?.isAvailable()) {
          return this.deepgram;
        }
        break;
        
      case 'enterprise':
      case 'training':
        // Prefer Azure for enterprise features and compliance
        if (this.azure?.isAvailable()) {
          return this.azure;
        }
        break;
        
      case 'batch':
        // Choose based on preferences or availability
        if (options?.preferAccuracy && this.deepgram?.isAvailable()) {
          return this.deepgram;
        }
        if (this.azure?.isAvailable()) {
          return this.azure;
        }
        break;
    }

    // Fallback to any available provider
    if (this.fallbackProvider?.isAvailable()) {
      return this.fallbackProvider;
    }

    throw new Error('No speech providers available');
  }

  async transcribe(
    audio: Blob, 
    context: 'realtime' | 'batch' | 'enterprise' = 'batch',
    config?: SpeechConfig
  ): Promise<TranscriptionResult> {
    const provider = this.selectProvider(context);
    
    try {
      return await provider.transcribe(audio, config);
    } catch (error) {
      console.error(`Primary provider (${provider.name}) failed, trying fallback...`);
      
      // Try fallback provider if primary fails
      if (this.fallbackProvider && this.fallbackProvider !== provider) {
        return await this.fallbackProvider.transcribe(audio, config);
      }
      
      throw error;
    }
  }

  async startRealTimeTranscription(config?: SpeechConfig): Promise<SpeechProvider> {
    const provider = this.selectProvider('realtime');
    
    if (!provider.startRealTimeTranscription) {
      throw new Error(`Provider ${provider.name} does not support real-time transcription`);
    }
    
    await provider.startRealTimeTranscription(config);
    return provider;
  }

  async stopRealTimeTranscription(): Promise<void> {
    // Stop all active real-time transcriptions
    if (this.deepgram?.stopRealTimeTranscription) {
      await this.deepgram.stopRealTimeTranscription();
    }
  }

  getAvailableProviders(): string[] {
    const providers: string[] = [];
    
    if (this.deepgram?.isAvailable()) {
      providers.push('Deepgram');
    }
    
    if (this.azure?.isAvailable()) {
      providers.push('Azure Speech');
    }
    
    return providers;
  }

  getProviderStatus(): Record<string, boolean> {
    return {
      deepgram: this.deepgram?.isAvailable() ?? false,
      azure: this.azure?.isAvailable() ?? false,
    };
  }
}

// Singleton instance for app-wide use
let speechService: HybridSpeechService | null = null;

export const initializeSpeechServices = (config?: {
  deepgram?: { apiKey: string };
  azure?: { subscriptionKey: string; region: string };
}): HybridSpeechService => {
  if (!speechService) {
    const speechConfig = {
      deepgram: {
        apiKey: config?.deepgram?.apiKey || 
                import.meta.env.VITE_DEEPGRAM_API_KEY || 
                process.env.DEEPGRAM_API_KEY || '',
      },
      azure: {
        subscriptionKey: config?.azure?.subscriptionKey || 
                        import.meta.env.VITE_AZURE_SPEECH_KEY || 
                        process.env.AZURE_SPEECH_KEY || '',
        region: config?.azure?.region || 
               import.meta.env.VITE_AZURE_SPEECH_REGION || 
               process.env.AZURE_SPEECH_REGION || 'eastus',
      },
    };

    speechService = new HybridSpeechService(speechConfig);
  }
  
  return speechService;
};

export const getSpeechService = (): HybridSpeechService => {
  if (!speechService) {
    return initializeSpeechServices();
  }
  return speechService;
};

export default getSpeechService;
