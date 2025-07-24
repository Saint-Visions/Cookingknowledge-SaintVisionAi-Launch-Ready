import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Database,
  Server,
  Globe,
  Shield,
  Cpu,
  Cloud,
  Zap,
  Code,
  Layers,
  GitBranch,
  Monitor,
  Smartphone,
  Brain,
  Eye,
  Mic,
  Lock,
  Rocket,
  Settings,
  BarChart3,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Copy,
  CheckCircle,
} from "lucide-react";

const SystemArchitecture = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const CodeBlock = ({ code, id, title }: { code: string; id: string; title?: string }) => (
    <div className="relative">
      {title && <p className="text-sm font-medium mb-2">{title}</p>}
      <pre className="bg-charcoal-900 text-charcoal-100 p-4 rounded-lg text-sm overflow-x-auto">
        <code>{code}</code>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-6 w-6 p-0"
          onClick={() => copyToClipboard(code, id)}
        >
          {copiedCode === id ? (
            <CheckCircle className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Layers className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold saintvision-gradient-text">
                System Architecture
              </h1>
              <p className="text-muted-foreground text-lg">
                Comprehensive overview of SaintVision AI platform architecture
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="saintvision-glow-soft">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="saintvision-glow-soft">
              <Shield className="h-3 w-3 mr-1" />
              Enterprise Security
            </Badge>
            <Badge variant="secondary" className="saintvision-glow-soft">
              <Zap className="h-3 w-3 mr-1" />
              High Performance
            </Badge>
            <Badge variant="secondary" className="saintvision-glow-soft">
              <Cloud className="h-3 w-3 mr-1" />
              Cloud Native
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-7 lg:w-max">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="ai-systems">AI Systems</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* System Overview */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  High-Level Architecture
                </CardTitle>
                <CardDescription>
                  SaintVision AI is a comprehensive full-stack platform featuring dual AI systems, 
                  enterprise CRM integration, and advanced business automation capabilities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="glass-morphism">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-primary" />
                        Frontend Layer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">React 18</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Vite</Badge>
                        <Badge variant="outline">TailwindCSS</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        SPA with React Router, comprehensive UI library, Builder.io CMS integration
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="glass-morphism">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Server className="h-4 w-4 text-primary" />
                        Backend Layer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Express</Badge>
                        <Badge variant="outline">Node.js</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">RESTful APIs</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Integrated with Vite dev server, shared types, comprehensive API layer
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="glass-morphism">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-4 w-4 text-primary" />
                        AI Layer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">OpenAI GPT-4o</Badge>
                        <Badge variant="outline">Azure AI</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">HACP™</Badge>
                        <Badge variant="outline">Dual AI</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Patented HACP™ protocol, dual AI routing, advanced training systems
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Technologies</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "React 18", icon: Code, color: "text-blue-500" },
                      { name: "TypeScript", icon: Cpu, color: "text-blue-600" },
                      { name: "Express", icon: Server, color: "text-green-500" },
                      { name: "Supabase", icon: Database, color: "text-emerald-500" },
                      { name: "Stripe", icon: BarChart3, color: "text-purple-500" },
                      { name: "Builder.io", icon: Layers, color: "text-orange-500" },
                      { name: "OpenAI", icon: Brain, color: "text-primary" },
                      { name: "Azure AI", icon: Cloud, color: "text-cyan-500" },
                    ].map((tech) => (
                      <div key={tech.name} className="flex items-center gap-2 p-3 rounded-lg border">
                        <tech.icon className={`h-4 w-4 ${tech.color}`} />
                        <span className="font-medium">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Project Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  id="project-structure"
                  code={`project/
├── client/                   # React SPA frontend
│   ├── components/          # UI components
│   │   ├── ui/             # Reusable UI library (Radix + TailwindCSS)
│   │   ├── builder/        # Builder.io CMS components  
│   │   └── *.tsx           # Feature components
│   ├── pages/              # Route components
│   ├── lib/                # Utilities and integrations
│   ├── hooks/              # Custom React hooks
│   └── App.tsx             # App entry with SPA routing
│
├── api/                     # Backend API endpoints
│   ├── chat.ts             # AI chat system with HACP™
│   ├── ai-training.ts      # AI model training
│   ├── agents/             # Agent management
│   └── *.ts                # Various API endpoints
│
├── shared/                  # Shared types and utilities
└── builder-registry.ts     # Builder.io component registry`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Frontend Architecture */}
          <TabsContent value="frontend" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Frontend Architecture
                </CardTitle>
                <CardDescription>
                  Modern React SPA with comprehensive UI system and Builder.io CMS integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Core Technologies</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">React 18</span>
                        <Badge>Latest</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">React Router 6</span>
                        <Badge>SPA Mode</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">TypeScript</span>
                        <Badge>Strict</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">Vite</span>
                        <Badge>Build Tool</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">UI System</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">TailwindCSS 3</span>
                        <Badge variant="secondary">Styling</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">Radix UI</span>
                        <Badge variant="secondary">Components</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">Lucide React</span>
                        <Badge variant="secondary">Icons</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">Framer Motion</span>
                        <Badge variant="secondary">Animations</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Routing System</h3>
                  <CodeBlock
                    id="routing-example"
                    title="Example Route Configuration"
                    code={`import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/console/:agentSlug" element={<Console />} />
      <Route path="/builder/*" element={<BuilderPageHandler />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">State Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">React Query</h4>
                      <p className="text-sm text-muted-foreground">
                        Server state management, caching, and synchronization
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">React Hooks</h4>
                      <p className="text-sm text-muted-foreground">
                        Local state with useState, useEffect, custom hooks
                      </p>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Builder.io CMS Integration</CardTitle>
                <CardDescription>
                  Dynamic content management with custom component registry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  id="builder-integration"
                  title="Builder.io Component Registration"
                  code={`import { builder } from '@builder.io/react';
import { customComponents } from '../../builder-registry';

export const initializeBuilder = () => {
  builder.init(BUILDER_API_KEY);
  
  // Register custom components
  customComponents.forEach((component) => {
    builder.registerComponent(component.component, component);
  });
  
  builder.canTrack = true; // Enable analytics
  return builder;
};`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backend Architecture */}
          <TabsContent value="backend" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Backend Architecture
                </CardTitle>
                <CardDescription>
                  Express.js server with comprehensive API layer and third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Core Services</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Chat API", endpoint: "/api/chat", desc: "AI conversation handling" },
                        { name: "AI Training", endpoint: "/api/ai-training", desc: "Model training management" },
                        { name: "Agent Management", endpoint: "/api/agents/*", desc: "AI agent lifecycle" },
                        { name: "CRM Integration", endpoint: "/api/crm-actions", desc: "GoHighLevel automation" },
                        { name: "Payment Processing", endpoint: "/api/payment-webhook", desc: "Stripe integration" },
                        { name: "Client Provisioning", endpoint: "/api/client-provisioning", desc: "User onboarding" },
                      ].map((service) => (
                        <Collapsible key={service.name}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 border rounded-lg hover:bg-muted/50">
                            <div className="text-left">
                              <div className="font-medium">{service.name}</div>
                              <div className="text-sm text-muted-foreground">{service.endpoint}</div>
                            </div>
                            <ChevronDown className="h-4 w-4" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-3 border-x border-b rounded-b-lg bg-muted/20">
                            <p className="text-sm">{service.desc}</p>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">API Structure</h3>
                    <CodeBlock
                      id="api-structure"
                      code={`api/
├── chat.ts              # AI chat with HACP™
├── ai-training.ts       # Model training
├── agents/
│   └── by-slug/
│       └── [slug].ts    # Dynamic agent routes  
├── crm-actions.ts       # CRM automation
├── payment-webhook.ts   # Stripe webhooks
├── ghl-webhook.ts       # GoHighLevel webhooks
└── subscription.ts      # Subscription management`}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Express Server Configuration</h3>
                  <CodeBlock
                    id="express-config"
                    title="Vite + Express Integration"
                    code={`// Vite configuration for SPA-only mode
export default defineConfig({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist/spa",
    chunkSizeWarningLimit: 1500,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
    },
  },
});`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database & Storage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-4 w-4 text-emerald-500" />
                      <h4 className="font-medium">Supabase</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      PostgreSQL database with real-time subscriptions
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• User authentication & authorization</div>
                      <div>• Agent configurations & conversations</div>
                      <div>• CRM data synchronization</div>
                      <div>• Training data & model metadata</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Cloud className="h-4 w-4 text-blue-500" />
                      <h4 className="font-medium">Builder.io</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Headless CMS for dynamic content management
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Landing page content</div>
                      <div>• Marketing materials</div>
                      <div>• Dynamic component library</div>
                      <div>• A/B testing capabilities</div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Systems */}
          <TabsContent value="ai-systems" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Systems Architecture
                </CardTitle>
                <CardDescription>
                  Advanced dual AI system with patented HACP™ protocol and comprehensive training capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">HACP™ Protocol</span>
                    <Badge variant="outline" className="text-xs">US Patent 10,290,222</Badge>
                  </div>
                  <p className="text-sm">
                    Hierarchical Agent Control Protocol - Advanced AI routing and escalation system 
                    that intelligently determines the best AI engine for each task and manages escalations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-morphism">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-500" />
                        OpenAI GPT-4o
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Primary Engine</Badge>
                          <Badge variant="outline">Conversational</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Advanced natural language reasoning and creative capabilities
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Creative content generation
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Complex reasoning tasks
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Conversational AI
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-morphism">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Cloud className="h-4 w-4 text-cyan-500" />
                        Azure Cognitive
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Secondary Engine</Badge>
                          <Badge variant="outline">Specialized</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Enhanced document processing, OCR, and cognitive analysis
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          Document analysis
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          OCR & vision tasks
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          Speech recognition
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">HACP™ Routing Logic</h3>
                  <CodeBlock
                    id="hacp-routing"
                    title="AI Engine Selection Algorithm"
                    code={`async function determineAIRouting(message: string, agent: any) {
  const messageAnalysis = {
    hasDocuments: /document|pdf|file|analyze|review/i.test(message),
    isCreative: /create|write|story|poem|creative/i.test(message),
    isAnalytical: /analyze|calculate|data|statistics/i.test(message),
    needsCognitive: /ocr|speech|image|vision/i.test(message),
  };

  // Route based on agent skillset and message type
  if (agent.skillset === "legal" && messageAnalysis.hasDocuments) {
    return {
      primary: "azure-cognitive",
      useSecondary: true,
      reason: "Document processing requires Azure Cognitive Services",
    };
  }

  if (messageAnalysis.isCreative) {
    return {
      primary: "gpt-4o",
      useSecondary: false,
      reason: "Creative tasks favor GPT-4o",
    };
  }

  return {
    primary: "gpt-4o",
    useSecondary: true,
    reason: "Default HACP™ routing with dual validation",
  };
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">AI Training System</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: "CRM Logic Training",
                        icon: BarChart3,
                        desc: "Train models on GoHighLevel workflows and business processes",
                        models: ["GPT-4", "Custom"],
                      },
                      {
                        name: "Conversation Training", 
                        icon: Mic,
                        desc: "Enhance natural language understanding and response quality",
                        models: ["GPT-4", "Azure Language"],
                      },
                      {
                        name: "Voice Recognition",
                        icon: Mic,
                        desc: "Custom speech-to-text models for business terminology",
                        models: ["Azure Speech", "Custom"],
                      },
                      {
                        name: "Visual Analysis",
                        icon: Eye,
                        desc: "Document processing, OCR, and image analysis capabilities",
                        models: ["Azure Vision", "Custom"],
                      },
                    ].map((training) => (
                      <Card key={training.name} className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <training.icon className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">{training.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{training.desc}</p>
                        <div className="flex gap-1">
                          {training.models.map((model) => (
                            <Badge key={model} variant="outline" className="text-xs">
                              {model}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Escalation System</CardTitle>
                <CardDescription>
                  Intelligent escalation to Supersal™ for complex queries and issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  id="escalation-triggers"
                  title="Escalation Trigger Detection"
                  code={`async function checkForEscalation(message: string, agent: any) {
  const escalationTriggers = [
    // User frustration indicators
    /(?:frustrated|angry|upset|disappointed)/i,
    
    // Explicit escalation requests  
    /(?:speak to|talk to|escalate|supervisor|manager)/i,
    
    // Capability requests beyond agent scope
    /(?:can't do|unable to|not working|broken)/i,
    
    // Complex requests that might exceed capabilities
    /(?:complex|complicated|advanced|detailed analysis)/i,
  ];

  for (const trigger of escalationTriggers) {
    if (trigger.test(message)) {
      return { shouldEscalate: true, reason: "user_frustration" };
    }
  }

  return { shouldEscalate: false };
}`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Third-Party Integrations
                </CardTitle>
                <CardDescription>
                  Comprehensive integration ecosystem for business automation and AI capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="h-5 w-5 text-purple-500" />
                      <h3 className="font-semibold">Stripe</h3>
                      <Badge variant="secondary">Payments</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete payment processing with subscription management
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Multiple pricing tiers ($97-$997)</div>
                      <div>• Webhook-based automation</div>
                      <div>• Subscription lifecycle management</div>
                      <div>• Payment failure handling</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-5 w-5 text-emerald-500" />
                      <h3 className="font-semibold">Supabase</h3>
                      <Badge variant="secondary">Database</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      PostgreSQL with real-time capabilities and authentication
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Real-time subscriptions</div>
                      <div>• Row-level security</div>
                      <div>• Built-in authentication</div>
                      <div>• Edge functions</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="h-5 w-5 text-orange-500" />
                      <h3 className="font-semibold">GoHighLevel</h3>
                      <Badge variant="secondary">CRM</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      CRM automation and lead management integration
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Contact management</div>
                      <div>• Pipeline automation</div>
                      <div>• Webhook-based updates</div>
                      <div>• Custom field mapping</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">OpenAI</h3>
                      <Badge variant="secondary">AI</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      GPT-4o integration with fine-tuning capabilities
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• GPT-4o chat completions</div>
                      <div>• Fine-tuning support</div>
                      <div>• Custom model training</div>
                      <div>• Usage analytics</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Cloud className="h-5 w-5 text-cyan-500" />
                      <h3 className="font-semibold">Azure AI</h3>
                      <Badge variant="secondary">Cognitive</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Cognitive services for specialized AI tasks
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Speech-to-text services</div>
                      <div>• Computer vision OCR</div>
                      <div>• Language understanding</div>
                      <div>• Custom model deployment</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">Builder.io</h3>
                      <Badge variant="secondary">CMS</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Headless CMS with visual editing capabilities
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Visual page builder</div>
                      <div>• Custom component registry</div>
                      <div>• A/B testing</div>
                      <div>• Content analytics</div>
                    </div>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Integration Configuration</h3>
                  <CodeBlock
                    id="integration-config"
                    title="Environment Variables"
                    code={`# AI Services
VITE_BUILDER_API_KEY=your_builder_key
OPENAI_API_KEY=your_openai_key
AZURE_OPENAI_API_KEY=your_azure_key
AZURE_OPENAI_ENDPOINT=your_azure_endpoint

# Database & Auth
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# Payment Processing
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# CRM Integration
GHL_API_KEY=your_ghl_key
GHL_WEBHOOK_SECRET=your_webhook_secret`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Integration Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Stripe Webhook Handler</h4>
                  <CodeBlock
                    id="stripe-webhook"
                    code={`export default async function handler(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, secret);

  switch (event.type) {
    case 'customer.subscription.created':
      await updateUserSubscription(event.data.object);
      break;
    case 'payment_intent.succeeded':
      await processSuccessfulPayment(event.data.object);
      break;
  }
  
  res.json({ received: true });
}`}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">GoHighLevel CRM Actions</h4>
                  <CodeBlock
                    id="ghl-integration"
                    code={`async function createContact(contactData: ContactData) {
  const response = await fetch(\`\${GHL_API_BASE}/contacts\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${GHL_API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      tags: ['Premium Interest', 'SaintVision Lead'],
    }),
  });
  
  return response.json();
}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deployment */}
          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Deployment Architecture
                </CardTitle>
                <CardDescription>
                  Multi-platform deployment with Azure, Netlify, and Vercel support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Cloud className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">Azure</h3>
                      <Badge variant="secondary">Primary</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Static Web Apps with Azure Functions integration
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Global CDN distribution</div>
                      <div>• Serverless function support</div>
                      <div>• Custom domain management</div>
                      <div>• Integrated CI/CD pipeline</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Netlify</h3>
                      <Badge variant="outline">Alternative</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Edge-optimized static site hosting
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Edge function support</div>
                      <div>• Form handling</div>
                      <div>• Split testing</div>
                      <div>• Deploy previews</div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-black" />
                      <h3 className="font-semibold">Vercel</h3>
                      <Badge variant="outline">Alternative</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Optimized for React applications
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• React-optimized builds</div>
                      <div>• Serverless functions</div>
                      <div>• Analytics integration</div>
                      <div>• Automatic HTTPS</div>
                    </div>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Build Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Package.json Scripts</h4>
                      <CodeBlock
                        id="build-scripts"
                        code={`{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:client": "vite build",
    "preview": "vite preview",
    "start": "serve dist/spa -s -l 8080",
    "builder:sync": "builder sync --model page"
  }
}`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Azure Configuration</h4>
                      <CodeBlock
                        id="azure-config"
                        code={`{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"]
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html"
    }
  }
}`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">CI/CD Pipeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-medium">Code Push</h4>
                        <p className="text-sm text-muted-foreground">Developer pushes to main branch</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-medium">Build Trigger</h4>
                        <p className="text-sm text-muted-foreground">Azure/Netlify/Vercel detects changes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-medium">Build Process</h4>
                        <p className="text-sm text-muted-foreground">npm install, TypeScript compilation, Vite build</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <div>
                        <h4 className="font-medium">Deploy</h4>
                        <p className="text-sm text-muted-foreground">Static assets deployed to global CDN</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Optimizations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Build Optimizations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Code splitting and lazy loading
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Tree shaking for smaller bundles
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Minification and compression
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Asset optimization
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Runtime Optimizations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        React Query caching
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Component memoization
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Virtual scrolling for large lists
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Service worker caching
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Architecture
                </CardTitle>
                <CardDescription>
                  Enterprise-grade security with multi-layered protection and compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                    <div className="flex items-center gap-2 mb-3">
                      <Lock className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold">Authentication</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>• Supabase Auth with JWT tokens</div>
                      <div>• Multi-factor authentication support</div>
                      <div>• OAuth integrations (Google, GitHub)</div>
                      <div>• Session management & refresh tokens</div>
                      <div>• Role-based access control (RBAC)</div>
                    </div>
                  </Card>

                  <Card className="p-4 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Data Protection</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>• Row-level security (RLS) in Supabase</div>
                      <div>• Encrypted data at rest and in transit</div>
                      <div>• API key rotation and management</div>
                      <div>• Sensitive data tokenization</div>
                      <div>• GDPR compliance measures</div>
                    </div>
                  </Card>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">API Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Input Validation</h4>
                      <CodeBlock
                        id="input-validation"
                        code={`import { z } from 'zod';

const ChatRequestSchema = z.object({
  agentId: z.string().uuid(),
  conversationId: z.string().uuid(),
  message: z.string().min(1).max(5000),
  mode: z.enum(['client', 'admin']),
});

// Validate request
const validatedRequest = ChatRequestSchema.parse(req.body);`}
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Rate Limiting</h4>
                      <CodeBlock
                        id="rate-limiting"
                        code={`// Rate limiting configuration
const rateLimiter = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
};

app.use('/api/', rateLimiter);`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Infrastructure Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Cloud className="h-4 w-4 text-cyan-500" />
                        <h4 className="font-medium">Network Security</h4>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>• HTTPS/TLS 1.3 encryption</div>
                        <div>• DNS over HTTPS (DoH)</div>
                        <div>• DDoS protection</div>
                        <div>• Web Application Firewall</div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Server className="h-4 w-4 text-green-500" />
                        <h4 className="font-medium">Server Security</h4>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>• Container isolation</div>
                        <div>• Secret management</div>
                        <div>• Regular security updates</div>
                        <div>• Vulnerability scanning</div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-4 w-4 text-purple-500" />
                        <h4 className="font-medium">Monitoring</h4>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>• Real-time intrusion detection</div>
                        <div>• Audit logging</div>
                        <div>• Anomaly detection</div>
                        <div>• Security incident response</div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Compliance & Standards</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "GDPR", desc: "Data Privacy" },
                      { name: "SOC 2", desc: "Security Controls" },
                      { name: "ISO 27001", desc: "Information Security" },
                      { name: "CCPA", desc: "California Privacy" },
                    ].map((standard) => (
                      <Card key={standard.name} className="p-3 text-center">
                        <div className="font-medium text-sm">{standard.name}</div>
                        <div className="text-xs text-muted-foreground">{standard.desc}</div>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Development Security</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Environment variable management
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Dependency vulnerability scanning
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Code security analysis (ESLint security rules)
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Git secret scanning
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Secure coding practices
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Runtime Security</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Content Security Policy (CSP)
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Cross-site scripting (XSS) protection
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        CSRF token validation
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        SQL injection prevention
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Regular security audits
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 p-6 bg-card rounded-lg border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold saintvision-gradient-text">SaintVision AI Platform</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive AI-powered business automation platform with enterprise security
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="saintvision-glow-soft">
                Version 2.0
              </Badge>
              <Badge variant="outline" className="saintvision-glow-soft">
                HACP™ Enabled
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.builder.io/c/docs/generate-code" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Builder.io Docs
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
