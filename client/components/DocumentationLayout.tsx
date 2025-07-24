import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { WorkspaceLayout } from "./WorkspaceLayout";
import {
  Code,
  Layers,
  Globe,
  BookOpen,
  Key,
  Database,
  Webhook,
  Zap,
  Settings,
  Shield,
  Users,
  CreditCard,
  FileText,
  ExternalLink,
  ChevronRight,
  Search,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Documentation navigation structure
const docSections = [
  {
    title: "Getting Started",
    items: [
      {
        id: "quickstart",
        title: "Quick Start",
        href: "/docs/quickstart",
        icon: Zap,
        description: "Get up and running in 5 minutes",
      },
      {
        id: "authentication",
        title: "Authentication",
        href: "/docs/auth",
        icon: Key,
        description: "API keys and security",
      },
      {
        id: "rate-limits",
        title: "Rate Limits",
        href: "/docs/rate-limits",
        icon: Shield,
        description: "Usage limits and quotas",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        id: "agents",
        title: "Agents API",
        href: "/docs/api/agents",
        icon: Users,
        description: "Create and manage AI agents",
      },
      {
        id: "chat",
        title: "Chat API",
        href: "/docs/api/chat",
        icon: Database,
        description: "Real-time conversations",
      },
      {
        id: "training",
        title: "Training API",
        href: "/docs/api/training",
        icon: BookOpen,
        description: "AI model training endpoints",
      },
      {
        id: "webhooks",
        title: "Webhooks",
        href: "/docs/api/webhooks",
        icon: Webhook,
        description: "Real-time notifications",
      },
    ],
  },
  {
    title: "Integrations",
    items: [
      {
        id: "ghl",
        title: "GoHighLevel",
        href: "/docs/integrations/ghl",
        icon: Layers,
        description: "CRM integration",
      },
      {
        id: "stripe",
        title: "Stripe",
        href: "/docs/integrations/stripe",
        icon: CreditCard,
        description: "Payment processing",
      },
      {
        id: "supabase",
        title: "Supabase",
        href: "/docs/integrations/supabase",
        icon: Database,
        description: "Database and auth",
      },
    ],
  },
  {
    title: "White Label",
    items: [
      {
        id: "branding",
        title: "Custom Branding",
        href: "/docs/white-label/branding",
        icon: Globe,
        description: "Customize the platform",
      },
      {
        id: "domains",
        title: "Custom Domains",
        href: "/docs/white-label/domains",
        icon: Globe,
        description: "Use your own domain",
      },
      {
        id: "api-keys",
        title: "API Management",
        href: "/docs/white-label/api",
        icon: Key,
        description: "Manage client API access",
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        id: "enterprise",
        title: "Enterprise",
        href: "/docs/enterprise",
        icon: Building,
        description: "Enterprise solutions",
      },
      {
        id: "sla",
        title: "SLA & Support",
        href: "/docs/sla",
        icon: Shield,
        description: "Service level agreements",
      },
      {
        id: "compliance",
        title: "Compliance",
        href: "/docs/compliance",
        icon: FileText,
        description: "GDPR, SOC2, security",
      },
    ],
  },
];

interface DocumentationLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  showTableOfContents?: boolean;
  className?: string;
}

export function DocumentationLayout({
  children,
  title,
  description,
  breadcrumbs = [],
  showTableOfContents = true,
  className,
}: DocumentationLayoutProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [tocItems, setTocItems] = useState<Array<{ id: string; title: string; level: number }>>([]);

  // Extract table of contents from rendered content
  useEffect(() => {
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4');
      const items = Array.from(headings).map((heading) => ({
        id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
        title: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      }));
      setTocItems(items);
    }, 100);

    return () => clearTimeout(timer);
  }, [children]);

  const fullBreadcrumbs = [
    { label: "Docs", href: "/docs" },
    ...breadcrumbs,
    { label: title },
  ];

  return (
    <WorkspaceLayout
      pageTitle="Documentation"
      pageDescription="Developer resources and guides"
      breadcrumbs={fullBreadcrumbs}
      showSearch={false}
      className="bg-gray-50"
    >
      <div className="flex">
        {/* Documentation Sidebar */}
        <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
              {docSections.map((section) => (
                <div key={section.title}>
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items
                      .filter((item) =>
                        searchQuery === "" ||
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.id}
                            to={item.href}
                            className={cn(
                              "group flex items-start px-3 py-2 text-sm rounded-lg transition-colors",
                              isActive
                                ? "bg-gold-50 text-gold-900 border-l-2 border-gold-500"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                            )}
                          >
                            <Icon className={cn("w-4 h-4 mr-3 mt-0.5 flex-shrink-0", isActive ? "text-gold-600" : "text-gray-400")} />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-72 w-full">
          <div className="flex">
            {/* Article Content */}
            <div className="flex-1 min-w-0">
              <div className="max-w-4xl mx-auto">
                {/* Article Header */}
                <div className="px-6 py-8 border-b border-gray-200 bg-white">
                  <div className="max-w-3xl">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                    {description && (
                      <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
                    )}
                  </div>
                </div>

                {/* Article Body */}
                <div className="px-6 py-8 bg-white">
                  <div className="max-w-3xl prose prose-gray prose-lg">
                    {children}
                  </div>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            {showTableOfContents && tocItems.length > 0 && (
              <div className="hidden xl:block xl:w-64 xl:flex-shrink-0">
                <div className="sticky top-24 p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">On this page</h3>
                  <nav className="space-y-2">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                          "block text-sm text-gray-600 hover:text-gray-900 transition-colors",
                          item.level > 2 && "pl-4",
                          item.level > 3 && "pl-8",
                        )}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

// Code block component for API examples
export function CodeBlock({
  children,
  language = "javascript",
  title,
  showCopy = true,
}: {
  children: string;
  language?: string;
  title?: string;
  showCopy?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden my-6">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          {showCopy && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-6 px-2"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          )}
        </div>
      )}
      <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
}

// API endpoint component
export function APIEndpoint({
  method,
  path,
  description,
  children,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const methodColors = {
    GET: "bg-green-100 text-green-800 border-green-200",
    POST: "bg-blue-100 text-blue-800 border-blue-200",
    PUT: "bg-yellow-100 text-yellow-800 border-yellow-200",
    DELETE: "bg-red-100 text-red-800 border-red-200",
    PATCH: "bg-purple-100 text-purple-800 border-purple-200",
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 my-6">
      <div className="flex items-center space-x-3 mb-4">
        <Badge className={`${methodColors[method]} font-mono text-xs`}>
          {method}
        </Badge>
        <code className="text-lg font-mono text-gray-900">{path}</code>
      </div>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}

// Parameter table component
export function ParameterTable({
  parameters,
}: {
  parameters: Array<{
    name: string;
    type: string;
    required?: boolean;
    description: string;
    example?: string;
  }>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
              Parameter
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
              Type
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param) => (
            <tr key={param.name}>
              <td className="border border-gray-200 px-4 py-2">
                <code className="text-sm font-mono text-gray-900">{param.name}</code>
                {param.required && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    required
                  </Badge>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <code className="text-sm font-mono text-blue-600">{param.type}</code>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                {param.description}
                {param.example && (
                  <div className="mt-1">
                    <span className="text-xs text-gray-500">Example: </span>
                    <code className="text-xs font-mono text-gray-600">{param.example}</code>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
