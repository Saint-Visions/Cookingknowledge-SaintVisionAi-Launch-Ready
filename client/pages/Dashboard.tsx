import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import DualAIChat from "@/components/DualAIChat";
import { useUserPlan } from "@/hooks/use-plan-protection";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Crown,
  Brain,
  Zap,
  Settings,
  Mic,
  Send,
  Plus,
  History,
  Star,
  Shield,
  Sparkles,
  ArrowUpRight,
  Globe,
  BarChart3,
  Users,
  Lock,
} from "lucide-react";

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { userPlan, isLoading } = useUserPlan();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Determine brand colors based on user plan
  const getBrandColors = () => {
    if (userPlan && ["enterprise", "white_label", "crm"].includes(userPlan)) {
      return {
        primary: "blue-500",
        primaryLight: "blue-400", 
        accent: "emerald-400",
        gradient: "from-blue-500/20 to-blue-600/20",
        text: "text-blue-300",
        hover: "hover:text-blue-300",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
      };
    }
    return {
      primary: "gold-500",
      primaryLight: "gold-400",
      accent: "gold-300", 
      gradient: "from-gold-500/20 to-gold-600/20",
      text: "text-gold-300",
      hover: "hover:text-gold-300",
      bg: "bg-gold-500/10",
      border: "border-gold-500/30",
    };
  };

  const brandColors = getBrandColors();

  return (
    <AppLayout>
      {/* Top Navigation Bar */}
      <nav className="h-20 border-b border-white/10 glass-morphism z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div
            className={`flex items-center space-x-4 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2Fdc36ab3d288a4806bc52f5b6be2d1ad4?format=webp&width=800"
              alt="SaintSal Logo"
              className="w-12 h-12 object-contain mr-1"
            />
            <div>
              <h1 className="text-2xl font-bold saintvision-gradient-text font-dialien">
                SaintVisionAI™ Dashboard
              </h1>
              <p className="text-sm text-white/60">
                Dual AI Intelligence System • HACP™ Technology Active
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              War Room Active
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className={`text-white/70 ${brandColors.hover}`}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Dual AI Chat */}
      <div className="flex-1 flex overflow-hidden">
        <DualAIChat />
      </div>
    </AppLayout>
  );
}
