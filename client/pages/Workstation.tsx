import React from "react";
import { AppLayout } from "@/components/AppLayout";

export default function Workstation() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const quickActions = [
    {
      id: 1,
      title: "New Project",
      description: "Create new business project",
      icon: Plus,
      color: "bg-blue-500/20 border-blue-500/30 text-blue-300",
      action: () => console.log("New Project"),
    },
    {
      id: 2,
      title: "Book Meeting",
      description: "Schedule client meeting",
      icon: Calendar,
      color: "bg-green-500/20 border-green-500/30 text-green-300",
      action: () => console.log("Book Meeting"),
    },
    {
      id: 3,
      title: "AI Companion",
      description: "Launch AI Assistant",
      icon: Brain,
      color: "bg-purple-500/20 border-purple-500/30 text-purple-300",
      action: () => window.location.href = "/dashboard",
    },
    {
      id: 4,
      title: "Analytics",
      description: "View performance data",
      icon: BarChart3,
      color: "bg-gold-500/20 border-gold-500/30 text-gold-300",
      action: () => console.log("Analytics"),
    },
  ];

  const companions = [
    { icon: Brain, title: "My Companion", status: "online", color: "text-blue-400" },
  ];

  const businessTools = [
    { icon: Building2, title: "My Business", status: "active", color: "text-emerald-400" },
  ];

  const tools = [
    { icon: StickyNote, title: "Sticky Notes", status: "📝", color: "text-yellow-400" },
    { icon: Zap, title: "AI Tools", status: "⚡📱", color: "text-purple-400" },
    { icon: ImageIcon, title: "Image Generator", status: "📸", color: "text-pink-400" },
    { icon: Rocket, title: "SVG Launchpad", status: "🚀", color: "text-cyan-400" },
    { icon: MessageCircle, title: "Feedback & Help", status: "💬", color: "text-green-400" },
    { icon: MonitorSpeaker, title: "PartnerTech.ai CRM", status: "active", color: "text-blue-300" },
  ];

  const metrics = [
    { label: "Pipeline Value", value: "$5,500", change: "+12%", color: "text-green-400" },
    { label: "Active Projects", value: "12", change: "+3", color: "text-blue-400" },
    { label: "AI Sessions", value: "24.6k", change: "+18%", color: "text-purple-400" },
    { label: "Conversion Rate", value: "34.2%", change: "+5.2%", color: "text-gold-400" },
  ];

  const ghlQuickAccess = [
    { icon: Users, label: "Contacts", count: "1,247" },
    { icon: CalendarIcon, label: "Calendar", count: "8" },
    { icon: Activity, label: "Pipeline", count: "23" },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-charcoal-900 text-white overflow-hidden">
        {/* Header */}
        <div className="bg-charcoal-800 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center saintvision-glow">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold saintvision-gradient-text">
                  Enterprise Command Center
                </h1>
                <p className="text-white/70">
                  Central hub for all business operations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                All Systems Online
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="border-gold-500/30 text-gold-300 hover:bg-gold-500/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Quick Actions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
                <p className="text-white/60 text-sm">Execute common workflows instantly</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Card
                      key={action.id}
                      className={`glass-morphism border transition-all duration-300 hover:scale-105 cursor-pointer ${action.color}`}
                      onClick={action.action}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">{action.title}</h3>
                        <p className="text-xs text-white/60">{action.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Command Center Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* My Companions */}
              <Card className="glass-morphism border-white/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-blue-400" />
                      My Companions
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      Online
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {companions.map((companion, index) => {
                    const Icon = companion.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => window.location.href = "/dashboard"}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${companion.color}`} />
                          <span className="font-medium">{companion.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">{companion.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* My Business */}
              <Card className="glass-morphism border-white/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-emerald-400" />
                      My Business
                    </CardTitle>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {businessTools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => window.location.href = "/partnertech"}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${tool.color}`} />
                          <span className="font-medium">{tool.title}</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/40" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Tools Grid */}
              <Card className="glass-morphism border-white/10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-gold-400" />
                    Tools & Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tools.map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-4 h-4 ${tool.color}`} />
                            <span className="text-sm font-medium">{tool.title}</span>
                          </div>
                          <span className="text-xs">{tool.status}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enterprise Message */}
            <div className="glass-morphism p-6 rounded-lg border border-gold-500/30 saintvision-glow">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold saintvision-gradient-text mb-2">
                    Enterprise Command Center Active
                  </h3>
                  <p className="text-white/70 mb-4">
                    Welcome to your AI-powered business control room. Can analyze your pipeline, draft outreach sequences, and execute GHL workflows. What business task can I accomplish?
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button 
                      className="bg-gold-500 hover:bg-gold-600 text-charcoal-900"
                      onClick={() => window.location.href = "/workspace/notes"}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Open War Room
                    </Button>
                    <Button variant="outline" className="border-gold-500/30 text-gold-300">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-white/10 bg-charcoal-800 p-6 overflow-y-auto">
            {/* Pipeline Overview */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Pipeline Overview
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="glass-morphism p-4 rounded-lg">
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    <div className="text-xs text-white/60">{metric.label}</div>
                    <div className={`text-xs ${metric.color}`}>{metric.change}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* GHL Quick Access */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                GHL Quick Access
              </h3>
              <div className="space-y-3">
                {ghlQuickAccess.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => window.location.href = "/crm"}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-blue-300" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                        {item.count}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-400" />
                Recent Activity
              </h3>
              <div className="glass-morphism p-4 rounded-lg text-center">
                <Activity className="w-8 h-8 text-white/20 mx-auto mb-2" />
                <p className="text-sm text-white/60">No recent activity</p>
                <p className="text-xs text-white/40 mt-1">Activity will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
