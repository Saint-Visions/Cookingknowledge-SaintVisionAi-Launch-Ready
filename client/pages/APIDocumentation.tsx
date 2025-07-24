import React from "react";
import { DocumentationLayout, CodeBlock, APIEndpoint, ParameterTable } from "@/components/DocumentationLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Key, Shield, Zap } from "lucide-react";

export default function APIDocumentation() {
  const breadcrumbs = [
    { label: "API", href: "/docs/api" },
  ];

  return (
    <DocumentationLayout
      title="API Documentation"
      description="Comprehensive guide to the SaintVisionAI API. Build powerful AI applications with our REST API."
      breadcrumbs={breadcrumbs}
    >
      {/* Overview Section */}
      <section id="overview" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
        
        <div className="bg-gradient-to-r from-gold-50 to-yellow-50 border border-gold-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Zap className="w-6 h-6 text-gold-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gold-900 mb-2">SaintVisionAI REST API</h3>
              <p className="text-gold-800 mb-4">
                Our API enables you to integrate SaintVisionAI's powerful AI capabilities into your applications. 
                Access our GPT-4o powered agents, training systems, and enterprise features.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Badge className="bg-green-100 text-green-800">REST API</Badge>
                <Badge className="bg-blue-100 text-blue-800">JSON Responses</Badge>
                <Badge className="bg-purple-100 text-purple-800">Rate Limited</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <Key className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication</h3>
            <p className="text-gray-600 text-sm">
              Secure API access with bearer tokens and API keys.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <Shield className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rate Limits</h3>
            <p className="text-gray-600 text-sm">
              Fair usage policies with generous limits for all plans.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <ExternalLink className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SDKs</h3>
            <p className="text-gray-600 text-sm">
              Official SDKs for JavaScript, Python, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Base URL */}
      <section id="base-url" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Base URL</h2>
        <p className="text-gray-600 mb-4">
          All API requests should be made to the following base URL:
        </p>
        
        <CodeBlock title="Base URL" language="text">
          https://api.saintvisionai.com/v1
        </CodeBlock>
      </section>

      {/* Authentication */}
      <section id="authentication" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Authentication</h2>
        
        <p className="text-gray-600 mb-6">
          The SaintVisionAI API uses API keys for authentication. You can get your API key from your 
          dashboard settings. Include your API key in the Authorization header of all requests.
        </p>

        <CodeBlock title="Authentication Header" language="bash">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.saintvisionai.com/v1/agents`}
        </CodeBlock>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 text-sm">
            <strong>Important:</strong> Keep your API keys secure. Never expose them in client-side code 
            or public repositories.
          </p>
        </div>
      </section>

      {/* Agents API */}
      <section id="agents-api" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Agents API</h2>
        
        <p className="text-gray-600 mb-8">
          Create, manage, and interact with AI agents. Agents are the core of SaintVisionAI's AI system.
        </p>

        {/* List Agents */}
        <APIEndpoint
          method="GET"
          path="/agents"
          description="Retrieve a list of all your AI agents"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Response</h4>
          <CodeBlock language="json">
{`{
  "agents": [
    {
      "id": "agent_123",
      "name": "Customer Support Agent",
      "description": "Handles customer inquiries",
      "model": "gpt-4o",
      "status": "active",
      "created_at": "2025-01-15T10:30:00Z",
      "updated_at": "2025-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "per_page": 20
}`}
          </CodeBlock>
        </APIEndpoint>

        {/* Create Agent */}
        <APIEndpoint
          method="POST"
          path="/agents"
          description="Create a new AI agent"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h4>
          <ParameterTable
            parameters={[
              {
                name: "name",
                type: "string",
                required: true,
                description: "The name of the agent",
                example: "Customer Support Agent"
              },
              {
                name: "description",
                type: "string",
                description: "A description of the agent's purpose",
                example: "Handles customer inquiries and support tickets"
              },
              {
                name: "model",
                type: "string",
                description: "The AI model to use",
                example: "gpt-4o"
              },
              {
                name: "system_prompt",
                type: "string",
                description: "The system prompt for the agent",
                example: "You are a helpful customer support agent..."
              },
              {
                name: "temperature",
                type: "number",
                description: "Model temperature (0.0 to 1.0)",
                example: "0.7"
              }
            ]}
          />

          <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Request Example</h4>
          <CodeBlock language="bash">
{`curl -X POST https://api.saintvisionai.com/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Customer Support Agent",
    "description": "Handles customer inquiries",
    "model": "gpt-4o",
    "system_prompt": "You are a helpful customer support agent...",
    "temperature": 0.7
  }'`}
          </CodeBlock>

          <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Response</h4>
          <CodeBlock language="json">
{`{
  "id": "agent_123",
  "name": "Customer Support Agent",
  "description": "Handles customer inquiries",
  "model": "gpt-4o",
  "system_prompt": "You are a helpful customer support agent...",
  "temperature": 0.7,
  "status": "active",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}`}
          </CodeBlock>
        </APIEndpoint>
      </section>

      {/* Chat API */}
      <section id="chat-api" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Chat API</h2>
        
        <p className="text-gray-600 mb-8">
          Send messages to your AI agents and receive responses. Supports both single messages and conversations.
        </p>

        <APIEndpoint
          method="POST"
          path="/agents/{agent_id}/chat"
          description="Send a message to an AI agent"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h4>
          <ParameterTable
            parameters={[
              {
                name: "message",
                type: "string",
                required: true,
                description: "The message to send to the agent",
                example: "How can I reset my password?"
              },
              {
                name: "conversation_id",
                type: "string",
                description: "ID of an existing conversation to continue",
                example: "conv_456"
              },
              {
                name: "context",
                type: "object",
                description: "Additional context for the conversation",
                example: '{"user_id": "user_789", "source": "website"}'
              }
            ]}
          />

          <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Request Example</h4>
          <CodeBlock language="bash">
{`curl -X POST https://api.saintvisionai.com/v1/agents/agent_123/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "How can I reset my password?",
    "context": {
      "user_id": "user_789",
      "source": "website"
    }
  }'`}
          </CodeBlock>

          <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Response</h4>
          <CodeBlock language="json">
{`{
  "id": "msg_456",
  "conversation_id": "conv_789",
  "agent_id": "agent_123",
  "message": "How can I reset my password?",
  "response": "To reset your password, please visit the login page and click 'Forgot Password'. You'll receive an email with reset instructions within a few minutes.",
  "created_at": "2025-01-15T10:35:00Z",
  "tokens_used": 45
}`}
          </CodeBlock>
        </APIEndpoint>
      </section>

      {/* Rate Limits */}
      <section id="rate-limits" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Limits</h2>
        
        <p className="text-gray-600 mb-6">
          Rate limits are enforced per API key and vary by plan:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                  Plan
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                  Requests per minute
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                  Requests per day
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
                  Tokens per month
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2 font-medium">Free</td>
                <td className="border border-gray-200 px-4 py-2">10</td>
                <td className="border border-gray-200 px-4 py-2">100</td>
                <td className="border border-gray-200 px-4 py-2">10,000</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 font-medium">Unlimited</td>
                <td className="border border-gray-200 px-4 py-2">60</td>
                <td className="border border-gray-200 px-4 py-2">1,000</td>
                <td className="border border-gray-200 px-4 py-2">Unlimited</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 font-medium">Pro</td>
                <td className="border border-gray-200 px-4 py-2">120</td>
                <td className="border border-gray-200 px-4 py-2">5,000</td>
                <td className="border border-gray-200 px-4 py-2">Unlimited</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 font-medium">Enterprise</td>
                <td className="border border-gray-200 px-4 py-2">300</td>
                <td className="border border-gray-200 px-4 py-2">20,000</td>
                <td className="border border-gray-200 px-4 py-2">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Rate limits reset every minute/day/month. If you exceed your limits, 
            you'll receive a 429 Too Many Requests response.
          </p>
        </div>
      </section>

      {/* Error Codes */}
      <section id="error-codes" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Codes</h2>
        
        <p className="text-gray-600 mb-6">
          The API uses standard HTTP status codes to indicate success or failure:
        </p>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-green-100 text-green-800">200</Badge>
              <span className="font-medium">OK</span>
            </div>
            <p className="text-sm text-gray-600">Request succeeded</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-red-100 text-red-800">400</Badge>
              <span className="font-medium">Bad Request</span>
            </div>
            <p className="text-sm text-gray-600">Invalid request parameters</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-red-100 text-red-800">401</Badge>
              <span className="font-medium">Unauthorized</span>
            </div>
            <p className="text-sm text-gray-600">Invalid or missing API key</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-red-100 text-red-800">429</Badge>
              <span className="font-medium">Too Many Requests</span>
            </div>
            <p className="text-sm text-gray-600">Rate limit exceeded</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-red-100 text-red-800">500</Badge>
              <span className="font-medium">Internal Server Error</span>
            </div>
            <p className="text-sm text-gray-600">Something went wrong on our end</p>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section id="sdks" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">SDKs & Libraries</h2>
        
        <p className="text-gray-600 mb-6">
          Official SDKs and libraries to make integration easier:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">JavaScript/Node.js</h3>
            <p className="text-gray-600 text-sm mb-4">
              Official JavaScript SDK for browser and Node.js applications.
            </p>
            <CodeBlock language="bash" showCopy={false}>
              npm install @saintvisionai/sdk
            </CodeBlock>
            <Button variant="outline" size="sm" className="mt-2">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Python</h3>
            <p className="text-gray-600 text-sm mb-4">
              Official Python SDK for backend applications and AI workflows.
            </p>
            <CodeBlock language="bash" showCopy={false}>
              pip install saintvisionai
            </CodeBlock>
            <Button variant="outline" size="sm" className="mt-2">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>
    </DocumentationLayout>
  );
}
