import React, { useState } from "react";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Users,
  Target,
  BarChart3,
  MessageSquare,
  Settings,
  Zap,
  Crown,
  Building,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Globe,
} from "lucide-react";
import { AiCompanion } from "@/components/Workspaces/AiCompanion";
import { GHLStats } from "@/components/Workspaces/GHLStats";
import { ProjectBoard } from "@/components/Workspaces/ProjectBoard";

export default function WorkspaceContent() {
  const [activeTab, setActiveTab] = useState("companion");

  const breadcrumbs = [
    { label: "Workspaces", href: "/workspace" },
    { label: "Workspace Content" },
  ];

  const headerActions = (
    <div className="flex items-center space-x-3">
      <Badge className="bg-blue-100 text-blue-800">
        <Brain className="w-3 h-3 mr-1" />
        All Tools
      </Badge>
      <Button className="bg-gold-500 hover:bg-gold-600 text-white">
        <Settings className="w-4 h-4 mr-2" />
        Configure
      </Button>
    </div>
  );

  const workspaceOptions = [
    {
      id: "chat",
      title: "AI Chat Workspace",
      description: "Natural conversations with AI - simple, intuitive interface",
      href: "/workspace-chat",
      icon: MessageSquare,
      color: "text-blue-600",
      bg: "bg-blue-50",
      features: ["Natural chat interface", "AI tool integration", "Free & unlimited tiers", "Mobile responsive"],
    },
    {
      id: "enterprise",
      title: "Enterprise Warroom",
      description: "Command center with GHL integration and enterprise features",
      href: "/workspace-warroom-enterprise",
      icon: Crown,
      color: "text-purple-600",
      bg: "bg-purple-50",
      features: ["GHL CRM integration", "Campaign management", "Revenue analytics", "Enterprise controls"],
    },
    {
      id: "team",
      title: "Team Workspace",
      description: "Collaborative workspace for team management and productivity",
      href: "/workspace",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
      features: ["Team collaboration", "Usage analytics", "Member management", "Project oversight"],
    },
  ];

  const quickActions = [
    {
      title: "Start AI Chat",
      description: "Begin a natural conversation with AI",
      href: "/workspace-chat",
      icon: MessageSquare,
      color: "bg-blue-500",
    },
    {
      title: "Enterprise Command",
      description: "Access enterprise warroom features",
      href: "/workspace-warroom-enterprise",
      icon: Crown,
      color: "bg-purple-500",
    },
    {
      title: "Team Management",
      description: "Manage your team workspace",
      href: "/workspace",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "SaintVision Group",
      description: "Visit parent company portal",
      href: "/saintvisiongroup",
      icon: Building,
      color: "bg-gold-500",
    },
    {
      title: "SVT Institute",
      description: "AI research and development",
      href: "/saintvision-institute",
      icon: Brain,
      color: "bg-indigo-500",
    },
    {
      title: "API Documentation",
      description: "Developer resources and guides",
      href: "/docs/api",
      icon: Globe,
      color: "bg-gray-500",
    },
  ];

  return (
    <WorkspaceLayout
      pageTitle="Workspace Content"
      pageDescription="Comprehensive workspace with AI Companion, GHL Stats, and Project Management"
      breadcrumbs={breadcrumbs}
      headerActions={headerActions}
      className="bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Workspace Options Overview */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Workspace Experience
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SaintVisionAI offers multiple workspace environments tailored for different productivity needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {workspaceOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card key={option.id} className="border-2 hover:border-gold-200 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className={`w-12 h-12 ${option.bg} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${option.color}`} />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" asChild>
                      <a href={option.href}>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Enter Workspace
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions Grid */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Zap className="w-5 h-5 mr-2 text-gold-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Fast access to all SaintVisionAI features and portals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-16 flex-col justify-center hover:shadow-md transition-shadow"
                      asChild
                    >
                      <a href={action.href}>
                        <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">{action.title}</span>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Workspace Components */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="companion">AI Companion</TabsTrigger>
            <TabsTrigger value="ghl-stats">GHL Statistics</TabsTrigger>
            <TabsTrigger value="projects">Project Board</TabsTrigger>
          </TabsList>

          <TabsContent value="companion">
            <AiCompanion />
          </TabsContent>

          <TabsContent value="ghl-stats">
            <GHLStats />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectBoard />
          </TabsContent>
        </Tabs>

        {/* Connectivity Footer */}
        <Card className="mt-12 bg-gradient-to-r from-gold-50 to-yellow-50 border-gold-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Complete Workspace Ecosystem
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              All your productivity tools are interconnected for seamless workflow. From AI conversations 
              to enterprise analytics, everything works together to amplify your success.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-blue-100 text-blue-800">AI Integration</Badge>
              <Badge className="bg-green-100 text-green-800">Team Collaboration</Badge>
              <Badge className="bg-purple-100 text-purple-800">Enterprise Features</Badge>
              <Badge className="bg-gold-100 text-gold-800">Seamless Connectivity</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </WorkspaceLayout>
  );
}
