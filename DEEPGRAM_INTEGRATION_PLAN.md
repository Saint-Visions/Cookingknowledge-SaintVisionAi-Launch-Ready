# Deepgram Integration Plan for SaintVision AI

## Current Azure + Proposed Deepgram Architecture

### Hybrid Speech Strategy:
- **Real-time conversations**: Deepgram (low latency, high accuracy)
- **Batch processing**: Azure Speech (enterprise compliance, custom models)
- **Fallback system**: Azure as backup for Deepgram failures

## Implementation Plan

### 1. Add Deepgram Dependencies
```bash
npm install @deepgram/sdk
```

### 2. Environment Variables Needed
```env
# Deepgram Configuration
DEEPGRAM_API_KEY=your_deepgram_api_key
DEEPGRAM_PROJECT_ID=your_project_id

# Azure Speech (keep existing)
AZURE_SPEECH_KEY=your_azure_speech_key
AZURE_SPEECH_REGION=your_region
```

### 3. Speech Service Architecture
```typescript
// lib/speech-services.ts
interface SpeechProvider {
  transcribe: (audio: Blob) => Promise<string>;
  synthesize: (text: string) => Promise<AudioBuffer>;
  isRealTime: boolean;
}

class DeepgramProvider implements SpeechProvider {
  // Real-time transcription for live conversations
  async transcribe(audio: Blob): Promise<string> {
    // Deepgram real-time WebSocket implementation
  }
}

class AzureSpeechProvider implements SpeechProvider {
  // Batch processing and enterprise features
  async transcribe(audio: Blob): Promise<string> {
    // Azure Speech Services implementation
  }
}

// Smart routing based on use case
class HybridSpeechService {
  selectProvider(context: 'realtime' | 'batch' | 'enterprise'): SpeechProvider {
    switch(context) {
      case 'realtime': return new DeepgramProvider();
      case 'batch': 
      case 'enterprise': return new AzureSpeechProvider();
    }
  }
}
```

### 4. Integration Points

#### A. Console Voice Chat (Real-time)
```typescript
// Use Deepgram for live conversations
const speechService = new HybridSpeechService();
const provider = speechService.selectProvider('realtime');
```

#### B. Agent Training (Batch)
```typescript
// Use Azure for training custom models
const provider = speechService.selectProvider('enterprise');
```

#### C. CRM Voice Notes (Batch)
```typescript
// Process recorded calls with Azure
const provider = speechService.selectProvider('batch');
```

## Benefits of Hybrid Approach

### Deepgram Advantages:
- ✅ **150ms latency** for real-time conversations
- ✅ **98% accuracy** on business terminology  
- ✅ **WebSocket streaming** for live transcription
- ✅ **Cost-effective** for high volume
- ✅ **Easy custom vocabulary** for business terms

### Azure Speech Advantages:
- ✅ **Enterprise compliance** (SOC 2, HIPAA)
- ✅ **Custom neural models** for specialized domains
- ✅ **Document processing** integration
- ✅ **Cognitive services** ecosystem
- ✅ **Existing infrastructure** already in place

## Implementation Priority

### Phase 1: Add Deepgram for Real-time (1-2 days)
1. Install Deepgram SDK
2. Create speech service abstraction
3. Implement real-time transcription in Console
4. Add WebSocket streaming for live conversations

### Phase 2: Smart Routing (2-3 days)
1. Implement hybrid speech service
2. Route based on use case (real-time vs batch)
3. Add fallback mechanisms
4. Performance monitoring and switching

### Phase 3: Advanced Features (3-5 days)
1. Custom vocabulary for business terms
2. Speaker diarization (who said what)
3. Sentiment analysis integration
4. Real-time conversation analytics

## Cost Analysis

### Current Azure Only:
- **Cost**: ~$1.00 per hour of audio
- **Latency**: 300-500ms
- **Use case**: Good for enterprise batch processing

### With Deepgram:
- **Real-time cost**: ~$0.40 per hour of audio (60% savings)
- **Latency**: 150-200ms (50% faster)
- **Use case**: Perfect for live conversations

### Recommended Split:
- **80% Deepgram**: Real-time conversations, voice commands
- **20% Azure**: Training, compliance, batch processing
- **Estimated savings**: 40-50% on speech processing costs

## Technical Integration

### 1. Voice Component Updates
```typescript
// components/VoiceInterface.tsx
const VoiceInterface = ({ mode }: { mode: 'realtime' | 'batch' }) => {
  const speechService = useSpeechService(mode);
  // Implementation with provider switching
};
```

### 2. Console Integration
```typescript
// pages/Console.tsx - Update existing voice toggle
const toggleVoice = async () => {
  const provider = speechService.selectProvider('realtime'); // Deepgram
  await provider.startRealTimeTranscription();
};
```

### 3. Agent Creation
```typescript
// pages/CreateAgent.tsx - Speech provider selection
const speechProviders = [
  { id: 'deepgram', name: 'Deepgram (Real-time)', best: 'Live conversations' },
  { id: 'azure', name: 'Azure Speech (Enterprise)', best: 'Compliance & training' },
  { id: 'hybrid', name: 'Hybrid (Recommended)', best: 'Best of both' }
];
```

## Next Steps

1. **Immediate**: Add Deepgram SDK to package.json
2. **Day 1**: Implement basic Deepgram real-time transcription
3. **Day 2**: Create hybrid speech service abstraction  
4. **Day 3**: Update Console page with Deepgram integration
5. **Day 4**: Add smart routing based on use case
6. **Day 5**: Testing and optimization

Would you like me to start implementing the Deepgram integration?
