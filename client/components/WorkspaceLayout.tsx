import React, { createContext, useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Footer } from "./Footer";
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
  Menu,
  X,
  Settings,
  Search,
  Bell,
  ChevronRight,
  BookOpen,
  Globe,
  Key,
  Code,
  Layers,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Context for workspace state
interface WorkspaceContextType {
  currentPage: string;
  pageTitle: string;
  pageDescription?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  headerActions?: React.ReactNode;
  showSearch?: boolean;
  showNotifications?: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceLayout");
  }
  return context;
};

// Navigation configuration
const navigationSections = [
  {
    title: "Core",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
        description: "Your command center",
        isActive: (pathname: string) => pathname === "/dashboard",
      },
      {
        id: "workspace",
        title: "Workspace",
        href: "/workspace",
        icon: Brain,
        description: "Main productivity hub",
        isActive: (pathname: string) => pathname === "/workspace",
        badge: "warroom",
      },
      {
        id: "console",
        title: "AI Console",
        href: "/console",
        icon: Zap,
        description: "AI tools & agents",
        isActive: (pathname: string) => pathname.startsWith("/console"),
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        id: "partnertech",
        title: "PartnerTech CRM",
        href: "/partnertech",
        icon: Building2,
        description: "Business automation",
        isActive: (pathname: string) => pathname === "/partnertech",
      },
      {
        id: "crm",
        title: "CRM & Sales",
        href: "/crm",
        icon: MonitorSpeaker,
        description: "Customer management",
        isActive: (pathname: string) => pathname === "/crm",
      },
      {
        id: "clients",
        title: "Client Portal",
        href: "/admin/clients",
        icon: Users,
        description: "Client management",
        isActive: (pathname: string) => pathname.includes("/admin/clients"),
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        id: "notes",
        title: "Notes & Ideas",
        href: "/workspace/notes",
        icon: StickyNote,
        description: "Capture thoughts",
        isActive: (pathname: string) => pathname.includes("/workspace/notes"),
      },
      {
        id: "image-gen",
        title: "Image Generator",
        href: "/workspace/image-gen",
        icon: ImageIcon,
        description: "AI image creation",
        isActive: (pathname: string) => pathname.includes("/workspace/image-gen"),
      },
      {
        id: "research",
        title: "SVT Institute",
        href: "/research",
        icon: GraduationCap,
        description: "R&D center",
        isActive: (pathname: string) => pathname.includes("/research"),
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        id: "api-docs",
        title: "API Documentation",
        href: "/docs/api",
        icon: Code,
        description: "Developer resources",
        isActive: (pathname: string) => pathname.startsWith("/docs/api"),
      },
      {
        id: "integrations",
        title: "Integrations",
        href: "/docs/integrations",
        icon: Layers,
        description: "Connect your tools",
        isActive: (pathname: string) => pathname.startsWith("/docs/integrations"),
      },
      {
        id: "white-label",
        title: "White Label",
        href: "/white-label",
        icon: Globe,
        description: "Brand customization",
        isActive: (pathname: string) => pathname === "/white-label",
      },
      {
        id: "about",
        title: "About",
        href: "/about",
        icon: BookOpen,
        description: "Learn more",
        isActive: (pathname: string) => pathname === "/about",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        id: "settings",
        title: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Account preferences",
        isActive: (pathname: string) => pathname === "/settings",
      },
      {
        id: "upgrade",
        title: "Upgrade",
        href: "/upgrade",
        icon: TrendingUp,
        description: "Unlock more features",
        isActive: (pathname: string) => pathname === "/upgrade",
        badge: "pro",
      },
      {
        id: "help",
        title: "Help & Support",
        href: "/help",
        icon: HelpCircle,
        description: "Get assistance",
        isActive: (pathname: string) => pathname === "/help",
      },
    ],
  },
];

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageDescription?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  headerActions?: React.ReactNode;
  showSearch?: boolean;
  showNotifications?: boolean;
  className?: string;
}

export function WorkspaceLayout({
  children,
  pageTitle,
  pageDescription,
  breadcrumbs = [],
  headerActions,
  showSearch = true,
  showNotifications = true,
  className,
}: WorkspaceLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const contextValue: WorkspaceContextType = {
    currentPage: location.pathname,
    pageTitle,
    pageDescription,
    breadcrumbs,
    headerActions,
    showSearch,
    showNotifications,
  };

  return (
    <WorkspaceContext.Provider value={contextValue}>
      <div className="min-h-screen bg-white">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full flex-col bg-gray-50 border-r border-gray-200">
            {/* Logo Header */}
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">SaintVisionAI</h1>
                  <p className="text-xs text-gray-600">Cookin' Knowledge</p>
                </div>
              </div>
              {/* Mobile close button */}
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-8 p-4 overflow-y-auto">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => {
                      const isActive = item.isActive(location.pathname);
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.id}
                          to={item.href}
                          className={cn(
                            "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                          )}
                        >
                          <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-white" : "text-gray-400")} />
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant={item.badge === "warroom" ? "default" : "secondary"}
                              className={cn(
                                "text-xs",
                                item.badge === "warroom" && "bg-gold-500 text-white",
                                item.badge === "pro" && "bg-green-500 text-white",
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* User Profile */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-white border border-gray-200">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">U</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">User Account</p>
                  <p className="text-xs text-gray-500 truncate">Pro Plan</p>
                </div>
                <Button variant="ghost" size="sm" className="p-1">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-72">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex h-16 items-center justify-between px-6">
              {/* Left side */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>

                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                      {breadcrumbs.map((crumb, index) => (
                        <li key={index} className="flex items-center">
                          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
                          {crumb.href ? (
                            <Link
                              to={crumb.href}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              {crumb.label}
                            </Link>
                          ) : (
                            <span className="text-sm font-medium text-gray-900">{crumb.label}</span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                {/* Page Title */}
                <div className="hidden md:block">
                  <h1 className="text-lg font-semibold text-gray-900">{pageTitle}</h1>
                  {pageDescription && (
                    <p className="text-sm text-gray-600">{pageDescription}</p>
                  )}
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                {showSearch && (
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
                    />
                  </div>
                )}

                {/* Notifications */}
                {showNotifications && (
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                )}

                {/* Header Actions */}
                {headerActions}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className={cn("min-h-screen bg-white", className)}>
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
}

// Higher-order component for easy page wrapping
export function withWorkspaceLayout<T extends object>(
  Component: React.ComponentType<T>,
  layoutProps: Omit<WorkspaceLayoutProps, "children">
) {
  return function WrappedComponent(props: T) {
    return (
      <WorkspaceLayout {...layoutProps}>
        <Component {...props} />
      </WorkspaceLayout>
    );
  };
}
