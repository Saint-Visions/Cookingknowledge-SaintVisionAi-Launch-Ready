import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Crown,
  ArrowRight,
  Brain,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Zap,
  Globe,
  Shield,
  Sparkles,
} from "lucide-react";

export default function DirectAccess() {
  const pages = [
    {
      title: "Dashboard - Dual AI Chat",
      description: "Main dual AI system with HACP™ technology",
      href: "/dashboard",
      icon: Brain,
      category: "Core AI",
      color: "blue",
    },
    {
      title: "CRM War Room",
      description: "GoHighLevel CRM integration",
      href: "/crm",
      icon: Globe,
      category: "Business",
      color: "purple",
    },
    {
      title: "PartnerTech.ai",
      description: "Business intelligence hub",
      href: "/partnertech",
      icon: BarChart3,
      category: "Business",
      color: "emerald",
    },
    {
      title: "AI Console",
      description: "Advanced AI tools and console",
      href: "/console",
      icon: Zap,
      category: "Core AI",
      color: "gold",
    },
    {
      title: "Create Agent",
      description: "Build SuperSal™ AI agents",
      href: "/create-agent",
      icon: Sparkles,
      category: "Core AI",
      color: "pink",
    },
    {
      title: "AI Training Hub",
      description: "Train AI models",
      href: "/ai-training",
      icon: Shield,
      category: "Core AI",
      color: "indigo",
    },
    {
      title: "Admin Clients",
      description: "Client management portal",
      href: "/admin/clients",
      icon: Users,
      category: "Admin",
      color: "teal",
    },
    {
      title: "Client Onboarding",
      description: "Provision new clients",
      href: "/admin/onboarding",
      icon: Crown,
      category: "Admin",
      color: "orange",
    },
    {
      title: "Settings",
      description: "Account and system settings",
      href: "/settings",
      icon: Settings,
      category: "System",
      color: "gray",
    },
    {
      title: "Workspace Notes",
      description: "Sticky notes and workspace",
      href: "/workspace/notes",
      icon: MessageSquare,
      category: "Tools",
      color: "cyan",
    },
    {
      title: "Image Generator",
      description: "AI-powered image creation",
      href: "/workspace/image-gen",
      icon: Sparkles,
      category: "Tools",
      color: "violet",
    },
    {
      title: "Help & Support",
      description: "Documentation and support",
      href: "/help",
      icon: MessageSquare,
      category: "Support",
      color: "green",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30",
      purple: "bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30",
      emerald: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30",
      gold: "bg-gold-500/20 border-gold-500/30 text-gold-300 hover:bg-gold-500/30",
      pink: "bg-pink-500/20 border-pink-500/30 text-pink-300 hover:bg-pink-500/30",
      indigo: "bg-indigo-500/20 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30",
      teal: "bg-teal-500/20 border-teal-500/30 text-teal-300 hover:bg-teal-500/30",
      orange: "bg-orange-500/20 border-orange-500/30 text-orange-300 hover:bg-orange-500/30",
      gray: "bg-gray-500/20 border-gray-500/30 text-gray-300 hover:bg-gray-500/30",
      cyan: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30",
      violet: "bg-violet-500/20 border-violet-500/30 text-violet-300 hover:bg-violet-500/30",
      green: "bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30",
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const categories = Array.from(new Set(pages.map(p => p.category)));

  return (
    <div className="min-h-screen bg-charcoal-900 text-white">
      {/* Background */}
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      
      {/* Global Header */}
      <header className="relative z-50 border-b border-white/10 glass-morphism">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg saintvision-glow">
                <img
                  src="https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/svt-sick-transparent-square-fa5568"
                  alt="SaintVisionAI Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold saintvision-gradient-text font-dialien">
                  SaintVisionAI™
                </h1>
                <p className="text-gold-300 text-sm font-dropline">
                  Direct Access Portal
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                <span className="text-green-300 text-sm font-semibold">Demo Mode</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-40 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="saintvision-gradient-text">Explore All Features</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Access all pages and functionality without authentication. Choose any feature below to start exploring.
          </p>
        </div>

        {/* Pages Grid by Category */}
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-gold-300 mb-6 font-dialien">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages
                .filter(page => page.category === category)
                .map(page => {
                  const Icon = page.icon;
                  return (
                    <Card
                      key={page.href}
                      className={`glass-morphism border transition-all duration-300 hover:scale-105 cursor-pointer ${getColorClasses(page.color)}`}
                      onClick={() => window.location.href = page.href}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(page.color)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">
                              {page.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/70 mb-4">{page.description}</p>
                        <Button
                          variant="ghost" 
                          size="sm"
                          className="w-full justify-between text-white/70 hover:text-white"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}

        {/* Quick Access Section */}
        <div className="mt-16 text-center">
          <div className="glass-morphism p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Quick Start Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => window.location.href = "/dashboard"}
                className="bg-blue-500 hover:bg-blue-600 text-white h-16 text-lg"
              >
                <Brain className="w-6 h-6 mr-2" />
                Start with Dual AI Chat
              </Button>
              <Button
                onClick={() => window.location.href = "/crm"}
                className="bg-purple-500 hover:bg-purple-600 text-white h-16 text-lg"
              >
                <Globe className="w-6 h-6 mr-2" />
                Explore CRM War Room
              </Button>
              <Button
                onClick={() => window.location.href = "/partnertech"}
                className="bg-emerald-500 hover:bg-emerald-600 text-white h-16 text-lg"
              >
                <BarChart3 className="w-6 h-6 mr-2" />
                View Business Tools
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
