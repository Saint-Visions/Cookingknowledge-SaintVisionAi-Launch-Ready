// GitHub API integration for SaintVisionAI workspace management
// Handles repository management, deployment tracking, and development metrics

interface GitHubConfig {
  token?: string;
  owner: string;
  repo: string;
  baseUrl: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}

interface GitHubDeployment {
  id: number;
  sha: string;
  ref: string;
  environment: string;
  description: string;
  created_at: string;
  updated_at: string;
  statuses_url: string;
}

interface GitHubWorkflow {
  id: number;
  name: string;
  status: 'queued' | 'in_progress' | 'completed';
  conclusion: 'success' | 'failure' | 'neutral' | 'cancelled' | 'timed_out' | null;
  created_at: string;
  updated_at: string;
  html_url: string;
}

class GitHubAPI {
  private config: GitHubConfig;
  private headers: HeadersInit;

  constructor(config: GitHubConfig) {
    this.config = config;
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...(config.token && { 'Authorization': `token ${config.token}` })
    };
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.config.baseUrl}/repos/${this.config.owner}/${this.config.repo}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  }

  // Get recent commits
  async getRecentCommits(limit: number = 10): Promise<GitHubCommit[]> {
    return this.request<GitHubCommit[]>(`/commits?per_page=${limit}`);
  }

  // Get repository information
  async getRepositoryInfo() {
    return this.request('/');
  }

  // Get deployments
  async getDeployments(environment?: string): Promise<GitHubDeployment[]> {
    const params = environment ? `?environment=${environment}` : '';
    return this.request<GitHubDeployment[]>(`/deployments${params}`);
  }

  // Get workflow runs
  async getWorkflowRuns(limit: number = 10): Promise<{ workflow_runs: GitHubWorkflow[] }> {
    return this.request<{ workflow_runs: GitHubWorkflow[] }>(`/actions/runs?per_page=${limit}`);
  }

  // Trigger a workflow dispatch
  async triggerWorkflow(workflowId: string, ref: string = 'main', inputs?: Record<string, any>) {
    return this.request(`/actions/workflows/${workflowId}/dispatches`, {
      method: 'POST',
      body: JSON.stringify({
        ref,
        inputs: inputs || {}
      })
    });
  }

  // Create a deployment
  async createDeployment(options: {
    ref: string;
    environment: string;
    description?: string;
    auto_merge?: boolean;
    required_contexts?: string[];
  }) {
    return this.request('/deployments', {
      method: 'POST',
      body: JSON.stringify({
        ref: options.ref,
        environment: options.environment,
        description: options.description || `Deploy ${options.ref} to ${options.environment}`,
        auto_merge: options.auto_merge ?? true,
        required_contexts: options.required_contexts || []
      })
    });
  }

  // Get repository stats
  async getRepositoryStats() {
    try {
      const [repo, commits, deployments, workflows] = await Promise.all([
        this.getRepositoryInfo(),
        this.getRecentCommits(5),
        this.getDeployments(),
        this.getWorkflowRuns(5)
      ]);

      return {
        repository: {
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          open_issues: repo.open_issues_count,
          updated_at: repo.updated_at,
          html_url: repo.html_url
        },
        commits: commits.map(commit => ({
          sha: commit.sha.substring(0, 7),
          message: commit.commit.message.split('\n')[0],
          author: commit.author?.login || commit.commit.author.name,
          date: commit.commit.author.date,
          url: commit.html_url
        })),
        deployments: deployments.slice(0, 5).map(deployment => ({
          id: deployment.id,
          environment: deployment.environment,
          ref: deployment.ref,
          description: deployment.description,
          created_at: deployment.created_at
        })),
        workflows: workflows.workflow_runs.map(workflow => ({
          id: workflow.id,
          name: workflow.name,
          status: workflow.status,
          conclusion: workflow.conclusion,
          created_at: workflow.created_at,
          url: workflow.html_url
        }))
      };
    } catch (error) {
      console.error('Failed to get repository stats:', error);
      return null;
    }
  }
}

// Default configuration for SaintVisionAI repository
const defaultConfig: GitHubConfig = {
  owner: 'Saint-Visions',
  repo: 'Cookingknowledge-SaintVisionAi-Launch-Ready',
  baseUrl: 'https://api.github.com',
  token: import.meta.env.VITE_GITHUB_TOKEN
};

// Export singleton instance
export const githubAPI = new GitHubAPI(defaultConfig);

// Export types for external use
export type {
  GitHubCommit,
  GitHubDeployment,
  GitHubWorkflow,
  GitHubConfig
};

// Utility functions for workspace integration
export const GitHubUtils = {
  // Format commit message for display
  formatCommitMessage: (message: string, maxLength: number = 60): string => {
    const firstLine = message.split('\n')[0];
    return firstLine.length > maxLength 
      ? firstLine.substring(0, maxLength) + '...' 
      : firstLine;
  },

  // Get status color for workflow status
  getWorkflowStatusColor: (status: string, conclusion?: string | null): string => {
    if (status === 'in_progress') return 'text-blue-600';
    if (status === 'queued') return 'text-yellow-600';
    if (conclusion === 'success') return 'text-green-600';
    if (conclusion === 'failure') return 'text-red-600';
    return 'text-gray-600';
  },

  // Format relative time
  formatRelativeTime: (dateString: string): string => {
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

  // Get deployment environment badge color
  getEnvironmentBadgeColor: (environment: string): string => {
    switch (environment.toLowerCase()) {
      case 'production':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'staging':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'development':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
};

// Hook for React components
export const useGitHubData = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const stats = await githubAPI.getRepositoryStats();
        setData(stats);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
