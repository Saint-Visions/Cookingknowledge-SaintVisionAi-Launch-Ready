import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Users,
  Crown,
  Settings,
  UserPlus,
  Shield,
  Zap,
  BarChart3,
  MessageSquare,
  Brain,
  Globe,
  Calendar,
  Target,
  TrendingUp,
  Activity,
  DollarSign,
  Plus,
  MoreVertical,
  Search,
  Filter,
  Download,
  Star,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
  PlayCircle,
  FileText,
  Users2,
  PieChart,
} from "lucide-react";

export default function Workspace() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [workspaceName] = useState("Acme Corp Workspace");
  const [activeTab, setActiveTab] = useState("overview");
  const [userPlan, setUserPlan] = useState("enterprise");
  const [hasCRMAccess, setHasCRMAccess] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Determine if we should show PartnerTech branding
  const isPartnerTechWorkspace = userPlan !== "free" && hasCRMAccess;

  const getBrandConfig = () => {
    if (isPartnerTechWorkspace) {
      return {
        name: "PartnerTech.ai",
        logo: "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fpartnertech-logo",
        tagline: "CRM + Automation Suite",
        primaryColor: "#3B82F6",
        accentColor: "#10B981",
      };
    }
    return {
      name: "SaintVision AI",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4",
      tagline: "AI Platform",
      primaryColor: "#FFD700",
      accentColor: "#4F46E5",
    };
  };

  const brandConfig = getBrandConfig();

  const workspaceStats = [
    {
      label: "Team Members",
      value: "24",
      change: "+3 this month",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "AI Conversations",
      value: "12,847",
      change: "+2,341 this week",
      icon: MessageSquare,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Monthly Usage",
      value: "89%",
      change: "Under limit",
      icon: BarChart3,
      color: "text-gold-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Success Rate",
      value: "94.2%",
      change: "+1.2% vs last month",
      icon: Target,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      email: "sarah@acmecorp.com",
      role: "Admin",
      status: "active",
      lastActive: "2 hours ago",
      usage: "347 chats",
      avatar: "",
    },
    {
      name: "Mike Chen",
      email: "mike@acmecorp.com",
      role: "Member",
      status: "active",
      lastActive: "1 day ago",
      usage: "156 chats",
      avatar: "",
    },
    {
      name: "Lisa Rodriguez",
      email: "lisa@acmecorp.com",
      role: "Member",
      status: "inactive",
      lastActive: "3 days ago",
      usage: "89 chats",
      avatar: "",
    },
    {
      name: "David Park",
      email: "david@acmecorp.com",
      role: "Viewer",
      status: "active",
      lastActive: "5 hours ago",
      usage: "234 chats",
      avatar: "",
    },
  ];

  const recentActivity = [
    {
      user: "Sarah J.",
      action: "Created new AI project",
      time: "2 hours ago",
      type: "create",
      icon: Plus,
    },
    {
      user: "Mike C.",
      action: "Upgraded workspace plan",
      time: "1 day ago",
      type: "upgrade",
      icon: ArrowUpRight,
    },
    {
      user: "Lisa R.",
      action: "Exported chat history",
      time: "2 days ago",
      type: "export",
      icon: Download,
    },
    {
      user: "David P.",
      action: "Joined workspace",
      time: "3 days ago",
      type: "join",
      icon: UserPlus,
    },
  ];

  const breadcrumbs = [
    { label: "Workspace" },
  ];

  const headerActions = (
    <div className="flex items-center space-x-3">
      <Badge className={`${isPartnerTechWorkspace ? "bg-blue-100 text-blue-800" : "bg-gold-100 text-gold-800"}`}>
        <Crown className="w-3 h-3 mr-1" />
        {isPartnerTechWorkspace ? "CRM Pro" : "Enterprise"}
      </Badge>
      <Button className={`${isPartnerTechWorkspace ? "bg-blue-500 hover:bg-blue-600" : "bg-gold-500 hover:bg-gold-600"} text-white`}>
        <UserPlus className="w-4 h-4 mr-2" />
        Invite Team
      </Button>
    </div>
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "Member":
        return "bg-gold-100 text-gold-800 border-gold-200";
      case "Viewer":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <WorkspaceLayout
      pageTitle="Team Workspace"
      pageDescription={`Manage your team's ${isPartnerTechWorkspace ? "CRM automation and AI agents with PartnerTech.ai's" : "SaintSal™ AI workspace with"} collaborative features, usage analytics, and enterprise controls.`}
      breadcrumbs={breadcrumbs}
      headerActions={headerActions}
      className="bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-16 h-16 ${isPartnerTechWorkspace ? "bg-gradient-to-br from-blue-500 to-emerald-500" : "bg-gradient-to-br from-gold-400 to-gold-600"} rounded-2xl flex items-center justify-center`}>
              <Users2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{workspaceName}</h1>
              <p className="text-lg text-gray-600">
                {isPartnerTechWorkspace ? "PartnerTech.ai CRM Workspace" : "SaintVisionAI Team Workspace"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {workspaceStats.map((stat, index) => {
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

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Team Members Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Team Members</CardTitle>
                        <CardDescription>Manage your team and their access</CardDescription>
                      </div>
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => {
                          // Open invite modal or navigate to invite page
                          window.open(`mailto:?subject=Join our workspace&body=You're invited to join our SaintVisionAI workspace!`, '_blank');
                        }}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamMembers.slice(0, 4).map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gold-500 text-white font-bold">
                                {member.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{member.name}</p>
                              <p className="text-sm text-gray-600">{member.email}</p>
                              <p className="text-xs text-gray-500">Last active: {member.lastActive}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getRoleColor(member.role)}>
                              {member.role}
                            </Badge>
                            <Badge className={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                    <CardDescription>Common workspace tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-16 flex-col"
                        onClick={() => navigate('/workspace-chat')}
                      >
                        <PlayCircle className="w-6 h-6 mb-1" />
                        <span>Start AI Session</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 flex-col"
                        onClick={() => {
                          // Create new project logic
                          const projectName = prompt('Enter project name:');
                          if (projectName) {
                            console.log('Creating project:', projectName);
                            // Add project creation logic here
                          }
                        }}
                      >
                        <FileText className="w-6 h-6 mb-1" />
                        <span>Create Project</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 flex-col"
                        onClick={() => {
                          // Export workspace data
                          const data = {
                            workspace: workspaceName,
                            members: teamMembers.length,
                            exportedAt: new Date().toISOString()
                          };
                          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'workspace-data.json';
                          a.click();
                        }}
                      >
                        <Download className="w-6 h-6 mb-1" />
                        <span>Export Data</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 flex-col"
                        onClick={() => setActiveTab('settings')}
                      >
                        <Settings className="w-6 h-6 mb-1" />
                        <span>Workspace Settings</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                              <Icon className="w-4 h-4 text-gold-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                              <p className="text-sm text-gray-600">{activity.action}</p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Plan Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <Badge className="bg-green-100 text-green-800 mb-2">
                        Enterprise
                      </Badge>
                      <p className="text-2xl font-bold text-gray-900">$497/month</p>
                      <p className="text-sm text-gray-600">Up to 50 team members</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Team Members ({teamMembers.length})</CardTitle>
                    <CardDescription>Manage your team and their permissions</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="Search members..." className="pl-10 w-64" />
                    </div>
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gold-500 text-white font-bold">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-xs text-gray-500">Last active: {member.lastActive} • {member.usage}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(member.role)}>
                          {member.role}
                        </Badge>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Usage Analytics
                  </CardTitle>
                  <CardDescription>Detailed breakdown of workspace usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <p className="text-3xl font-bold text-blue-600 mb-2">12,847</p>
                      <p className="text-sm text-blue-800">Total Conversations</p>
                      <p className="text-xs text-blue-600 mt-1">+23% from last month</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <p className="text-3xl font-bold text-green-600 mb-2">2.4M</p>
                      <p className="text-sm text-green-800">Tokens Used</p>
                      <p className="text-xs text-green-600 mt-1">89% of quota</p>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <p className="text-3xl font-bold text-purple-600 mb-2">94.2%</p>
                      <p className="text-sm text-purple-800">Success Rate</p>
                      <p className="text-xs text-purple-600 mt-1">+1.2% improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Workspace Settings</CardTitle>
                <CardDescription>Configure your workspace preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace Name
                  </label>
                  <Input value={workspaceName} className="max-w-md" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default AI Model
                  </label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 max-w-md">
                    <option>GPT-4o</option>
                    <option>GPT-4</option>
                    <option>Claude-3</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Enable notifications</h3>
                    <p className="text-sm text-gray-500">Get notified about workspace activity</p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>

                <div className="pt-4">
                  <Button
                    className="bg-gold-500 hover:bg-gold-600 text-white"
                    onClick={() => {
                      // Save workspace settings
                      console.log('Saving workspace settings...');
                      // Add save logic here - could integrate with backend
                      alert('Workspace settings saved successfully!');
                    }}
                  >
                    Save Changes
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
