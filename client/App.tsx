import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all working pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Console from "./pages/Console";
import CreateAgent from "./pages/CreateAgent";
import AITraining from "./pages/AITraining";
import PartnerTech from "./pages/PartnerTech";
import Settings from "./pages/Settings";
import Upgrade from "./pages/Upgrade";
import ChromeInstall from "./pages/ChromeInstall";
import CRM from "./pages/CRM";
import AdminClients from "./pages/AdminClients";
import AdminLogs from "./pages/AdminLogs";
import ClientOnboarding from "./pages/ClientOnboarding";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Setup from "./pages/Setup";
import ReferralInvite from "./pages/ReferralInvite";
import Workspace from "./pages/Workspace";
import StickyNotes from "./pages/workspace/StickyNotes";
import ImageGenerator from "./pages/workspace/ImageGenerator";
import Help from "./pages/Help";
import ResearchRedirect from "./pages/ResearchRedirect";
import Why from "./pages/Why";
import SaintSalYou from "./pages/SaintSalYou";
import Hacp from "./pages/Hacp";
import SystemArchitecture from "./pages/SystemArchitecture";
import BrandLanding from "./pages/BrandLanding";
import BuilderPage from "./pages/BuilderPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import RouteScanner from "./routes/index";

// SaintVision Homepage
import SaintVisionHomepage from "./pages/SaintVisionHomepage";
import SaintVisionGroup from "./pages/SaintVisionGroup";

// Builder.io integration
import BuilderPageHandler from "./pages/BuilderPageHandler";
import { initializeBuilderComprehensive } from "./lib/builder-init";

// New workspace and documentation pages
import APIDocumentation from "./pages/APIDocumentation";
import WhiteLabel from "./pages/WhiteLabel";
import About from "./pages/About";
import WorkspaceChat from "./pages/workspace-chat";
import WorkspaceWarroomEnterprise from "./pages/workspace-warroom-enterprise";

// Initialize Builder.io with comprehensive settings
initializeBuilderComprehensive();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Core app routes */}
          <Route path="/" element={<Index />} />
          <Route path="/__routes" element={<RouteScanner />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/console" element={<Console />} />
          <Route path="/console/:agentSlug" element={<Console />} />
          <Route path="/create-agent" element={<CreateAgent />} />
          <Route path="/ai-training" element={<AITraining />} />
          <Route path="/partnertech" element={<PartnerTech />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/chrome-install" element={<ChromeInstall />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/admin/onboarding" element={<ClientOnboarding />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/referral/invite" element={<ReferralInvite />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/notes" element={<StickyNotes />} />
          <Route path="/workspace/image-gen" element={<ImageGenerator />} />
          <Route path="/help" element={<Help />} />
          <Route path="/research" element={<ResearchRedirect />} />
          <Route path="/why" element={<Why />} />
          <Route path="/saintsal-you" element={<SaintSalYou />} />
          <Route path="/hacp" element={<Hacp />} />
          <Route path="/system-architecture" element={<SystemArchitecture />} />
          <Route path="/brand-landing" element={<BrandLanding />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/builder-page" element={<BuilderPage />} />

          {/* SaintVision pages */}
          <Route path="/saintvision" element={<SaintVisionHomepage />} />
          <Route path="/saintvisiongroup" element={<SaintVisionGroup />} />

          {/* Business & Documentation Routes */}
          <Route path="/docs/api" element={<APIDocumentation />} />
          <Route path="/white-label" element={<WhiteLabel />} />
          <Route path="/about" element={<About />} />

          {/* New Workspace Routes */}
          <Route path="/workspace-chat" element={<WorkspaceChat />} />
          <Route path="/workspace-warroom-enterprise" element={<WorkspaceWarroomEnterprise />} />

          {/* Builder.io dynamic pages for content management */}
          <Route path="/builder/*" element={<BuilderPageHandler />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
