import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Brain,
  Building2,
  StickyNote,
  Zap,
  ImageIcon,
  Rocket,
  MessageCircle,
  Users,
  GraduationCap,
  TrendingUp,
  User,
  LogOut,
  MonitorSpeaker,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "main-dashboard",
    title: "Main Dashboard",
    href: "/dashboard",
    icon: Home,
    category: "core",
    isActive: (pathname: string) => pathname === "/dashboard",
  },
  {
    id: "my-companion",
    title: "My Companion",
    href: "/dashboard",
    icon: Brain,
    emoji: "🧠",
    category: "ai",
    isActive: (pathname: string) => pathname === "/dashboard",
  },
  {
    id: "my-business",
    title: "My Business",
    href: "/partnertech",
    icon: Building2,
    emoji: "💼",
    category: "business",
    isActive: (pathname: string) => pathname === "/partnertech",
  },
  {
    id: "sticky-notes",
    title: "Sticky Notes",
    href: "/workspace/notes",
    icon: StickyNote,
    emoji: "📝",
    category: "productivity",
    isActive: (pathname: string) => pathname.includes("/workspace/notes"),
  },
  {
    id: "ai-tools",
    title: "Ai Tools",
    href: "/console",
    icon: Zap,
    emoji: "⚡📱",
    category: "ai",
    isActive: (pathname: string) => pathname === "/console",
  },
  {
    id: "image-generator",
    title: "Image Generator",
    href: "/workspace/image-gen",
    icon: ImageIcon,
    emoji: "📸",
    category: "creative",
    isActive: (pathname: string) => pathname.includes("image-gen"),
  },
  {
    id: "svg-launchpad",
    title: "SVG Launchpad",
    href: "/workspace/svg",
    icon: Rocket,
    emoji: "🚀",
    category: "creative",
    isActive: (pathname: string) => pathname.includes("svg"),
  },
  {
    id: "feedback-help",
    title: "Feedback & Help",
    href: "/help",
    icon: HelpCircle,
    emoji: "💬",
    category: "support",
    isActive: (pathname: string) => pathname === "/help",
  },
  {
    id: "partnertech-crm",
    title: "PartnerTech.ai CRM",
    href: "/crm",
    icon: MonitorSpeaker,
    category: "business",
    isActive: (pathname: string) => pathname === "/crm",
  },
  {
    id: "client-portal",
    title: "Client Portal",
    href: "/admin/clients",
    icon: Users,
    emoji: "🌸",
    category: "admin",
    isActive: (pathname: string) => pathname.includes("clients"),
  },
  {
    id: "svt-institute",
    title: "SVT Institute of AI (R + D)",
    href: "/research",
    icon: GraduationCap,
    emoji: "🏛️",
    category: "research",
    isActive: (pathname: string) => pathname.includes("research"),
  },
  {
    id: "upgrade-tier",
    title: "Upgrade Tier",
    href: "/upgrade",
    icon: TrendingUp,
    emoji: "⚡",
    category: "account",
    isActive: (pathname: string) => pathname === "/upgrade",
  },
  {
    id: "my-account",
    title: "My Account",
    href: "/settings",
    icon: User,
    emoji: "👋",
    category: "account",
    isActive: (pathname: string) => pathname === "/settings",
  },
];

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSaintVisionGroupRedirect = () => {
    // Navigate to our internal SaintVision Group page which will then redirect
    window.location.href = "/saintvisiongroup";
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full w-80 bg-white border-r border-gray-200 transition-all duration-300 relative overflow-hidden",
        "bg-gradient-to-b from-gray-50 to-white",
        className,
      )}
    >
      {/* Header with Logo */}
      <div className="p-6 border-b border-gray-100">
        <div
          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleSaintVisionGroupRedirect}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">SV</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">SaintVisionAI™</h1>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {navigationItems.map((item, index) => {
            const isActive = item.isActive(location.pathname);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200",
                  "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  isActive
                    ? "bg-gray-900 text-white shadow-lg"
                    : "text-gray-700 hover:text-gray-900",
                  `transform transition-all duration-300 delay-${Math.min(index * 50, 500)}`
                )}
                style={{
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isLoaded ? 1 : 0,
                }}
              >
                <div className="flex items-center flex-1">
                  <Icon
                    className={cn(
                      "w-5 h-5 mr-3 transition-colors",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                    )}
                  />
                  <span className="flex-1 font-medium">{item.title}</span>
                  {item.emoji && (
                    <span className="ml-2 text-sm opacity-70">{item.emoji}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100">
        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50 mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-sm">AP</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin Portal</p>
          </div>
        </div>

        {/* Logout */}
        <Link to="/signin">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-2xl"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span>Logout</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
