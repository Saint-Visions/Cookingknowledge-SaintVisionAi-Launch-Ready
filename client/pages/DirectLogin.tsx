import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Zap, Building2, Brain } from "lucide-react";

export default function DirectLogin() {
  const handleDirectAccess = (page: string) => {
    // Set auth state
    localStorage.setItem('demo_authenticated', 'true');
    localStorage.setItem('user_plan', 'enterprise');
    localStorage.setItem('user_email', 'demo@saintvision.ai');
    
    // Redirect to page
    window.location.href = page;
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold saintvision-gradient-text mb-4">
            Direct Access - Testing Mode
          </h1>
          <p className="text-white/70 text-lg">
            Click any button below to access different parts of the application directly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-morphism border-blue-500/30 hover:border-blue-500/50 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-blue-300">
                <Brain className="w-5 h-5 mr-2" />
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/60 text-sm mb-4">AI Dashboard with dual AI system</p>
              <Button 
                onClick={() => handleDirectAccess("/dashboard")}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Access Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-gold-500/30 hover:border-gold-500/50 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-gold-300">
                <Crown className="w-5 h-5 mr-2" />
                Workstation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/60 text-sm mb-4">Enterprise Command Center</p>
              <Button 
                onClick={() => handleDirectAccess("/workstation")}
                className="w-full bg-gold-500 hover:bg-gold-600 text-charcoal-900"
              >
                Access Workstation
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-purple-500/30 hover:border-purple-500/50 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-purple-300">
                <Zap className="w-5 h-5 mr-2" />
                War Room
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/60 text-sm mb-4">Dual AI Chat System</p>
              <Button 
                onClick={() => handleDirectAccess("/workspace/notes")}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                Access War Room
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-emerald-500/30 hover:border-emerald-500/50 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-emerald-300">
                <Building2 className="w-5 h-5 mr-2" />
                Business
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/60 text-sm mb-4">PartnerTech.ai CRM</p>
              <Button 
                onClick={() => handleDirectAccess("/partnertech")}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                Access CRM
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="glass-morphism p-6 rounded-lg inline-block">
            <h3 className="text-xl font-semibold mb-2">Authentication Status</h3>
            <p className="text-white/60 mb-4">All links above will automatically authenticate you as an enterprise user</p>
            <Button 
              onClick={() => handleDirectAccess("/signin")}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Go to Normal Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
