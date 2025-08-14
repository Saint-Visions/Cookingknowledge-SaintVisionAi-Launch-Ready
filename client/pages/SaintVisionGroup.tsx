import React, { useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  ArrowRight,
  Building2,
  Globe,
  Crown,
  Users,
  Sparkles,
} from "lucide-react";

export default function SaintVisionGroup() {
  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      window.open("https://saintvisiongroup.com", "_blank");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = () => {
    window.open("https://saintvisiongroup.com", "_blank");
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen bg-charcoal-900 text-white">
        <div className="text-center max-w-2xl p-8">
          <div className="w-24 h-24 bg-gradient-to-r from-gold-500/20 to-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-500/30 saintvision-glow-soft">
            <Building2 className="w-12 h-12 text-gold-300" />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold saintvision-gradient-text mb-3">
              SaintVision Group
            </h1>
            <h2 className="text-2xl text-white/80 mb-6">
              Enterprise Technology Solutions
            </h2>

            <div className="flex items-center justify-center space-x-3 mb-6 flex-wrap gap-2">
              <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30">
                <Globe className="w-3 h-3 mr-1" />
                Global Enterprise
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Crown className="w-3 h-3 mr-1" />
                Technology Leader
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <Users className="w-3 h-3 mr-1" />
                Enterprise Solutions
              </Badge>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-8 mb-8 border border-white/10 glass-morphism">
            <h3 className="text-xl font-semibold text-white mb-4">
              About SaintVision Group
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              SaintVision Group is the parent company behind our innovative AI technology solutions. 
              From SaintVisionAI to the SaintVision Institute of AI Research & Development, we're 
              building the future of enterprise technology with faith-centered values and cutting-edge innovation.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-5 h-5 text-gold-300 mr-2" />
                  <span className="font-semibold text-white">SaintVisionAI</span>
                </div>
                <p className="text-white/60 text-sm">Enterprise AI Platform</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Building2 className="w-5 h-5 text-blue-300 mr-2" />
                  <span className="font-semibold text-white">SVT Institute</span>
                </div>
                <p className="text-white/60 text-sm">AI Research & Development</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-white/50 mb-6">
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
              <span>Auto-redirecting to saintvisiongroup.com in 3 seconds...</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleRedirect}
              className="w-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-charcoal-900 font-semibold saintvision-glow"
              size="lg"
            >
              <span>Visit SaintVision Group</span>
              <ArrowRight className="w-4 h-4 ml-2" />
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>

            <div className="flex space-x-4">
              <Button
                onClick={() => window.open("https://saintvisiontech.com", "_blank")}
                variant="outline"
                className="flex-1 border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
              >
                SVT Institute
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="flex-1 border-white/20 text-white/70 hover:bg-white/5"
              >
                Go Back
              </Button>
            </div>
          </div>

          <div className="mt-8 text-xs text-white/40">
            <p>SaintVision Group - Enterprise Technology Solutions</p>
            <p>Innovation • Values • Excellence</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
