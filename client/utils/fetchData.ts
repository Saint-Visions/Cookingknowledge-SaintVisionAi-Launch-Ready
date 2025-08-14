// SaintVisionAI Data Fetching Utilities
// Backend integration for workspace data management
// OpenAI-inspired architecture with Apple-level polish

interface APIResponse<T = any> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

// Base configuration
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  retries: 3,
};

// Cache management for performance
class DataCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }
}

const dataCache = new DataCache();

// Enhanced fetch with retry logic and error handling
async function enhancedFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<APIResponse<T>> {
  const {
    timeout = API_CONFIG.timeout,
    retries = API_CONFIG.retries,
    cache = false,
    ...fetchOptions
  } = options;

  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_CONFIG.baseUrl}${endpoint}`;

  // Check cache first
  if (cache && fetchOptions.method === 'GET') {
    const cached = dataCache.get(url);
    if (cached) return cached;
  }

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: APIResponse<T> = await response.json();

      // Cache successful GET requests
      if (cache && fetchOptions.method === 'GET') {
        dataCache.set(url, result);
      }

      return result;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on certain errors
      if (error.name === 'AbortError' || 
          (error as any).status === 401 || 
          (error as any).status === 403) {
        break;
      }

      // Exponential backoff
      if (attempt < retries) {
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }

  // Return error response
  return {
    data: null as T,
    status: 'error',
    message: lastError?.message || 'Network request failed',
    timestamp: new Date().toISOString(),
  };
}

// Chat API Functions
export const ChatAPI = {
  // Send message to AI
  async sendMessage(message: string, conversationId?: string) {
    return enhancedFetch<{
      response: string;
      conversationId: string;
      tokensUsed: number;
    }>('/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        conversationId,
        timestamp: new Date().toISOString(),
      }),
    });
  },

  // Get conversation history
  async getConversations(limit: number = 20) {
    return enhancedFetch<{
      conversations: Array<{
        id: string;
        title: string;
        lastMessage: string;
        updatedAt: string;
        messageCount: number;
      }>;
    }>(`/chat/conversations?limit=${limit}`, {
      method: 'GET',
      cache: true,
    });
  },

  // Delete conversation
  async deleteConversation(conversationId: string) {
    return enhancedFetch(`/chat/conversations/${conversationId}`, {
      method: 'DELETE',
    });
  },

  // Get AI models available
  async getAvailableModels() {
    return enhancedFetch<{
      models: Array<{
        id: string;
        name: string;
        description: string;
        tokensPerMinute: number;
        features: string[];
      }>;
    }>('/chat/models', {
      method: 'GET',
      cache: true,
    });
  },
};

// GHL Integration Functions
export const GHLAPI = {
  // Get comprehensive stats
  async getStats() {
    return enhancedFetch<{
      contacts: { total: number; new_today: number; qualified: number };
      opportunities: { total: number; value: number; won_rate: number };
      campaigns: { active: number; sent_today: number; open_rate: number };
      conversations: { total: number; active: number; response_rate: number };
      revenue: { monthly: number; pipeline: number; growth: number };
      lastSync: string;
      status: 'connected' | 'syncing' | 'error';
    }>('/ghl-webhook', {
      method: 'POST',
      body: JSON.stringify({ action: 'get_stats' }),
      cache: true,
    });
  },

  // Force sync with GHL
  async forceSync() {
    return enhancedFetch('/ghl-webhook', {
      method: 'POST',
      body: JSON.stringify({ action: 'force_sync' }),
    });
  },

  // Create contact
  async createContact(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    tags?: string[];
  }) {
    return enhancedFetch('/ghl-webhook', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create_contact',
        data: contactData,
      }),
    });
  },

  // Launch campaign
  async launchCampaign(campaignData: {
    name: string;
    type: string;
    audienceIds: string[];
    schedule?: string;
  }) {
    return enhancedFetch('/ghl-webhook', {
      method: 'POST',
      body: JSON.stringify({
        action: 'launch_campaign',
        data: campaignData,
      }),
    });
  },
};

// Project Management Functions
export const ProjectAPI = {
  // Get user projects
  async getProjects() {
    return enhancedFetch<{
      projects: Array<{
        id: string;
        name: string;
        description: string;
        status: 'active' | 'completed' | 'paused';
        progress: number;
        dueDate?: string;
        teamMembers: Array<{
          id: string;
          name: string;
          avatar: string;
          role: string;
        }>;
        tasks: {
          total: number;
          completed: number;
          inProgress: number;
        };
      }>;
    }>('/projects', {
      method: 'GET',
      cache: true,
    });
  },

  // Create new project
  async createProject(projectData: {
    name: string;
    description: string;
    dueDate?: string;
    teamMembers?: string[];
  }) {
    return enhancedFetch('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  // Update project
  async updateProject(projectId: string, updates: Partial<{
    name: string;
    description: string;
    status: string;
    progress: number;
  }>) {
    return enhancedFetch(`/projects/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },

  // Get project tasks
  async getProjectTasks(projectId: string) {
    return enhancedFetch<{
      tasks: Array<{
        id: string;
        title: string;
        description: string;
        status: 'todo' | 'in_progress' | 'review' | 'done';
        priority: 'low' | 'medium' | 'high' | 'urgent';
        assignee?: {
          id: string;
          name: string;
          avatar: string;
        };
        dueDate?: string;
        createdAt: string;
      }>;
    }>(`/projects/${projectId}/tasks`, {
      method: 'GET',
      cache: true,
    });
  },
};

// AI Companion Functions
export const CompanionAPI = {
  // Get companion status and personality
  async getCompanionStatus() {
    return enhancedFetch<{
      companion: {
        name: string;
        personality: string;
        mood: 'helpful' | 'focused' | 'creative' | 'analytical';
        availableTools: string[];
        learningProgress: number;
        interactions: number;
      };
      suggestions: Array<{
        type: 'task' | 'insight' | 'reminder' | 'tip';
        title: string;
        description: string;
        actionable: boolean;
      }>;
    }>('/companion/status', {
      method: 'GET',
      cache: true,
    });
  },

  // Train companion with user preferences
  async trainCompanion(trainingData: {
    preferences: Record<string, any>;
    feedback: Array<{
      interaction: string;
      rating: number;
      notes?: string;
    }>;
  }) {
    return enhancedFetch('/companion/train', {
      method: 'POST',
      body: JSON.stringify(trainingData),
    });
  },

  // Get AI insights
  async getInsights(type: 'productivity' | 'business' | 'personal' = 'productivity') {
    return enhancedFetch<{
      insights: Array<{
        id: string;
        type: string;
        title: string;
        description: string;
        impact: 'high' | 'medium' | 'low';
        actionItems: string[];
        data: any;
      }>;
    }>(`/companion/insights?type=${type}`, {
      method: 'GET',
      cache: true,
    });
  },
};

// User & Analytics Functions
export const UserAPI = {
  // Get user profile and preferences
  async getProfile() {
    return enhancedFetch<{
      user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        plan: 'free' | 'unlimited' | 'pro' | 'enterprise';
        preferences: Record<string, any>;
        usage: {
          tokensUsed: number;
          tokensLimit: number;
          apiCalls: number;
          storageUsed: number;
        };
      };
    }>('/user/profile', {
      method: 'GET',
      cache: true,
    });
  },

  // Update user preferences
  async updatePreferences(preferences: Record<string, any>) {
    return enhancedFetch('/user/preferences', {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
  },

  // Get usage analytics
  async getAnalytics(timeframe: '24h' | '7d' | '30d' | '90d' = '7d') {
    return enhancedFetch<{
      analytics: {
        chatSessions: number;
        tokensUsed: number;
        projectsCreated: number;
        tasksCompleted: number;
        productivityScore: number;
        trends: Array<{
          date: string;
          value: number;
          metric: string;
        }>;
      };
    }>(`/user/analytics?timeframe=${timeframe}`, {
      method: 'GET',
      cache: true,
    });
  },
};

// Utility functions for data processing
export const DataUtils = {
  // Format numbers for display
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  },

  // Format currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  // Format relative time
  formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  },

  // Debounce function for search and input
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Validate data schemas
  validateResponse<T>(data: any, schema: any): data is T {
    // Simple validation - in production use zod or similar
    return data && typeof data === 'object';
  },
};

// React hooks for easy component integration
export const useData = <T>(
  fetchFunction: () => Promise<APIResponse<T>>,
  dependencies: any[] = []
) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction();
      
      if (response.status === 'success') {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Export cache management
export const CacheManager = {
  clear: () => dataCache.clear(),
  get: (key: string) => dataCache.get(key),
  set: (key: string, data: any, ttl?: number) => dataCache.set(key, data, ttl),
};

// Type exports for TypeScript support
export type {
  APIResponse,
  FetchOptions,
};
