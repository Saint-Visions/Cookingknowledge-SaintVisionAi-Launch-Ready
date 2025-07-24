import React, { useState, useEffect } from "react";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Crown,
  Zap,
  Users,
  BarChart3,
  Target,
  Rocket,
  Shield,
  Database,
  Brain,
  MessageSquare,
  TrendingUp,
  Activity,
  Settings,
  Globe,
  Building,
  Sparkles,
} from "lucide-react";

export default function WorkspaceWarroomEnterprise() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const breadcrumbs = [
    { label: "Workspaces", href: "/workspace" },
    { label: "Enterprise Warroom" },
  ];

  const headerActions = (
    <div className="flex items-center space-x-3">
      <Badge className="bg-purple-100 text-purple-800">
        <Crown className="w-3 h-3 mr-1" />
        Enterprise
      </Badge>
      <Button className="bg-gold-500 hover:bg-gold-600 text-white">
        <Rocket className="w-4 h-4 mr-2" />
        Deploy Changes
      </Button>
    </div>
  );

  const enterpriseStats = [
    {
      label: "Active Campaigns",
      value: "47",
      change: "+12 this week",
      icon: Target,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Lead Generation",
      value: "2,847",
      change: "+23% conversion",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Revenue Pipeline",
      value: "$284K",
      change: "+$47K this month",
      icon: TrendingUp,
      color: "text-gold-600",
      bg: "bg-yellow-50",
    },
    {
      label: "AI Automation",
      value: "94.2%",
      change: "Efficiency score",
      icon: Brain,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const warroomFeatures = [
    {
      title: "GHL CRM Integration",
      description: "Full GoHighLevel automation with real-time sync",
      icon: Database,
      status: "active",
      actions: ["Sync Now", "Configure"],
    },
    {
      title: "AI Lead Qualification",
      description: "Automated lead scoring and routing",
      icon: Brain,
      status: "active",
      actions: ["Train Model", "View Results"],
    },
    {
      title: "Campaign Management",
      description: "Multi-channel campaign orchestration",
      icon: Target,
      status: "active",
      actions: ["Create Campaign", "Analytics"],
    },
    {
      title: "Revenue Intelligence",
      description: "Predictive analytics and forecasting",
      icon: BarChart3,
      status: "active",
      actions: ["Generate Report", "Configure KPIs"],
    },
  ];

  const handleGHLSync = async () => {
    try {
      const response = await fetch('/api/ghl-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync_all' })
      });
      
      if (response.ok) {
        console.log('GHL sync initiated');
      }
    } catch (error) {
      console.error('GHL sync failed:', error);
    }
  };

  const handleCampaignDeploy = async () => {
    try {
      const response = await fetch('/api/ghl-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deploy_campaign' })
      });
      
      if (response.ok) {
        console.log('Campaign deployment initiated');
      }
    } catch (error) {
      console.error('Campaign deployment failed:', error);
    }
  };

  return (
    <WorkspaceLayout
      pageTitle="Enterprise Warroom"
      pageDescription="Command center for enterprise AI automation and revenue operations"
      breadcrumbs={breadcrumbs}
      headerActions={headerActions}
      className="bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-gold-500 rounded-2xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enterprise Warroom</h1>
              <p className="text-lg text-gray-600">
                Mission control for your AI-powered revenue operations
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {enterpriseStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Command Center</TabsTrigger>
            <TabsTrigger value="automation">AI Automation</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Intelligence</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Warroom Features */}
            <div className="grid md:grid-cols-2 gap-6">
              {warroomFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-2 hover:border-gold-200 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gold-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {feature.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        {feature.actions.map((action, actionIndex) => (
                          <Button 
                            key={actionIndex} 
                            variant="outline" 
                            size="sm"
                            onClick={action === "Sync Now" ? handleGHLSync : undefined}
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Deploy Actions
                </CardTitle>
                <CardDescription>One-click deployment for enterprise operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    className="h-16 flex-col bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleGHLSync}
                  >
                    <Database className="w-6 h-6 mb-1" />
                    <span>Sync GHL Data</span>
                  </Button>
                  <Button 
                    className="h-16 flex-col bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleCampaignDeploy}
                  >
                    <Rocket className="w-6 h-6 mb-1" />
                    <span>Deploy Campaign</span>
                  </Button>
                  <Button className="h-16 flex-col bg-purple-500 hover:bg-purple-600 text-white">
                    <Brain className="w-6 h-6 mb-1" />
                    <span>Train AI Models</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Automation Pipeline
                </CardTitle>
                <CardDescription>Automated workflows and AI decision engines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Advanced AI Automation
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Configure and monitor your enterprise AI automation workflows
                  </p>
                  <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                    Configure Automation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Campaign Command Center
                </CardTitle>
                <CardDescription>Multi-channel campaign management and optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Enterprise Campaigns
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Launch and manage multi-channel marketing campaigns
                  </p>
                  <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                    Create Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Revenue Intelligence
                </CardTitle>
                <CardDescription>Predictive analytics and business intelligence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Deep insights into your revenue operations and performance
                  </p>
                  <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceLayout>
  );
}
