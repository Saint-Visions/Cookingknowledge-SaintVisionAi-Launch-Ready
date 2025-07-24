import React, { useState, useEffect } from 'react';
import { SaintVisionHero } from '@/components/builder/SaintVisionHero';
import { SaintVisionNavigation } from '@/components/builder/SaintVisionNavigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Shield,
  Zap,
  Globe,
  Users,
  Crown,
  Target,
  Lock,
  ArrowRight,
  Sparkles,
  Database,
  MessageSquare,
  BarChart3,
  Building,
  Code,
  Rocket,
  Star,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

export default function SaintVisionHomepage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Navigation */}
      <SaintVisionNavigation
        logoImage="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d"
        logoText="SaintVisionAI™"
        tagline="Cookin' Knowledge"
        links={[
          { text: 'Workspace', url: '/workspace' },
          { text: 'Pricing', url: '/pricing' },
          { text: 'Why Us', url: '/why' },
          { text: 'Help', url: '/help' },
        ]}
        ctaButton1Text="Sign In"
        ctaButton1Link="/signin"
        ctaButton2Text="Start Cookin'"
        ctaButton2Link="/dashboard"
      />

      {/* Hero Section - Clean without logo blocking */}
      <SaintVisionHero
        title="SaintSal™"
        subtitle="Cookin' Knowledge."
        description="AI doesn't just answer. It adapts. It empowers. It becomes your enterprise companion."
        ctaText="Start Cookin' Knowledge"
        ctaLink="/workspace"
        secondaryCtaText="Try CRM Tools"
        secondaryCtaLink="/partnertech"
        backgroundImage="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F317f7c64793d47ab90d506bd066bedbb?format=webp&width=800"
        badgeText="Enterprise Ready"
      />

      {/* What Separates Us Section */}
      <section className="relative bg-charcoal-900 py-24 overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Separates Us
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Revolutionary technology meets intuitive design. We don't just build AI - we craft experiences that amplify human potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-morphism p-8 rounded-2xl hover:saintvision-glow transition-all duration-300"
                 style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">HACP™ Technology</h3>
              <p className="text-white/80 mb-4">
                Our patent-pending Hierarchical Adaptive Cognitive Processing enables 10-20x faster AI learning.
                This isn't just another chatbot - it's cognitive evolution.
              </p>
              <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30">
                Patent Pending
              </Badge>
            </div>

            <div className="glass-morphism p-8 rounded-2xl hover:saintvision-glow transition-all duration-300"
                 style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Native Integration</h3>
              <p className="text-white/80 mb-4">
                Seamlessly integrates with your existing workflow. No complex setup, no learning curve.
                Just natural, powerful AI that feels like it belongs.
              </p>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Plug & Play
              </Badge>
            </div>

            <div className="glass-morphism p-8 rounded-2xl hover:saintvision-glow transition-all duration-300"
                 style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
              <p className="text-white/80 mb-4">
                Bank-level encryption, SOC 2 compliance, and GDPR adherence. Your data stays yours,
                with the security standards that enterprises demand.
              </p>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                SOC 2 Certified
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Technology Section */}
      <section className="relative bg-charcoal-800 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 to-charcoal-800"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30 mb-4 text-sm px-4 py-2">
              ENTERPRISE READY
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Elite Technology
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto">
              Dual AI systems powered by GPT-4o and Azure OpenAI handle your business operations
              while you focus on what matters - growing your empire.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Dual AI Architecture</h3>
                  <p className="text-white/70">
                    GPT-4o for lightning-fast responses, Azure OpenAI for enterprise-grade processing.
                    Best of both worlds, seamlessly integrated.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Cognitive Memory</h3>
                  <p className="text-white/70">
                    Your AI learns and remembers. Every interaction makes it smarter, more personalized,
                    more valuable to your specific needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Adaptive Intelligence</h3>
                  <p className="text-white/70">
                    HACP™ technology enables real-time adaptation to your business patterns,
                    industry requirements, and personal preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-morphism p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">94.2% Success Rate</h3>
                <p className="text-white/80 mb-6">
                  Proven results across 1000+ enterprise deployments
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-gold-300">10-20x</p>
                    <p className="text-sm text-white/60">Faster Learning</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-300">99.9%</p>
                    <p className="text-sm text-white/60">Uptime SLA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PartnerTech Section - 6 Boxes */}
      <section className="relative bg-charcoal-900 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              PartnerTech.ai Integration
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Complete CRM automation suite that transforms how you manage customers,
              campaigns, and revenue operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Contact Management",
                description: "Smart contact segmentation with AI-powered lead scoring and automatic nurture sequences.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: MessageSquare,
                title: "Campaign Automation",
                description: "Multi-channel campaigns across SMS, email, and voice with intelligent timing optimization.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: BarChart3,
                title: "Revenue Analytics",
                description: "Real-time pipeline tracking with predictive forecasting and performance insights.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Target,
                title: "Lead Qualification",
                description: "Automated lead scoring and routing based on behavior, engagement, and conversion probability.",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Rocket,
                title: "Sales Acceleration",
                description: "AI-powered sales assistance with conversation intelligence and deal optimization.",
                color: "from-red-500 to-red-600"
              },
              {
                icon: Crown,
                title: "Enterprise Controls",
                description: "Advanced permissions, audit trails, and compliance features for enterprise deployments.",
                color: "from-gold-500 to-gold-600"
              }
            ].map((feature, index) => (
              <div key={index} className="glass-morphism p-6 rounded-2xl hover:saintvision-glow transition-all duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="lg" asChild>
              <a href="/partnertech">
                <ArrowRight className="w-5 h-5 mr-2" />
                Explore PartnerTech
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Security & Safety Section */}
      <section className="relative bg-charcoal-800 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-4 text-sm px-4 py-2">
              ENTERPRISE SECURITY
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Security & Safety First
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Your data security is our priority. We implement multiple layers of protection
              to ensure your information stays safe and compliant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "AES-256 Encryption",
                description: "Military-grade encryption for all data in transit and at rest"
              },
              {
                icon: Lock,
                title: "SOC 2 Compliance",
                description: "Independently audited security controls and procedures"
              },
              {
                icon: CheckCircle,
                title: "GDPR Compliant",
                description: "Full compliance with EU data protection regulations"
              },
              {
                icon: Globe,
                title: "Global Infrastructure",
                description: "Distributed architecture with 99.9% uptime guarantee"
              }
            ].map((item, index) => (
              <div key={index} className="text-center glass-morphism p-6 rounded-2xl">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech in Use - SaintVision Group Companies */}
      <section className="relative bg-charcoal-900 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technology in Action
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Powering innovation across the SaintVision Group ecosystem and partner companies worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-morphism p-8 rounded-2xl text-center hover:saintvision-glow transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">SaintVision Group LLC</h3>
              <p className="text-white/80 mb-4">
                Parent company leveraging AI for strategic decision-making and portfolio optimization across multiple ventures.
              </p>
              <Button variant="outline" className="border-gold-500/30 text-gold-300 hover:bg-gold-500/10" asChild>
                <a href="/saintvisiongroup">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Learn More
                </a>
              </Button>
            </div>

            <div className="glass-morphism p-8 rounded-2xl text-center hover:saintvision-glow transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">then.ai</h3>
              <p className="text-white/80 mb-4">
                Advanced AI development platform for custom AI solutions and enterprise implementations.
              </p>
              <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                <Globe className="w-4 h-4 mr-2" />
                Visit Platform
              </Button>
            </div>

            <div className="glass-morphism p-8 rounded-2xl text-center hover:saintvision-glow transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">ebytech.ai</h3>
              <p className="text-white/80 mb-4">
                E-commerce AI optimization platform driving conversion and revenue growth for online businesses.
              </p>
              <Button variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10">
                <Target className="w-4 h-4 mr-2" />
                Explore Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Movement - Pro Plan Highlight */}
      <section className="relative bg-gradient-to-br from-charcoal-800 to-charcoal-900 py-24">
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-gold-500/20 text-gold-300 border-gold-500/30 mb-4 text-lg px-6 py-3">
              THE MOVEMENT
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Where Magic Unlocks
            </h2>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto mb-8">
              Join thousands who've discovered what happens when AI doesn't just assist - it amplifies.
              This is where possibilities become reality.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-morphism p-12 rounded-3xl text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl flex items-center justify-center">
                  <Crown className="w-12 h-12 text-white" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">Pro Plan - $97/month</h3>
              <p className="text-xl text-gold-300 mb-8">🔥 WHERE ALL THE MAGIC UNLOCKS!</p>

              <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                {[
                  "Dual AI system (GPT-4o + Azure)",
                  "Voice & SMS integration",
                  "Full CRM access (GHL)",
                  "PartnerTech integration",
                  "Priority support",
                  "Custom AI memory",
                  "API access",
                  "🔥 ALL MAGIC UNLOCKED"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Star className="w-5 h-5 text-gold-400 mr-3" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white text-xl px-12 py-4" asChild>
                <a href="/pricing">
                  <Crown className="w-6 h-6 mr-2" />
                  Unlock Magic 🔥
                </a>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-white/60 mb-4">Join the movement. Experience the difference.</p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold-300">1000+</p>
                  <p className="text-sm text-white/60">Enterprise Users</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-300">94.2%</p>
                  <p className="text-sm text-white/60">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-300">10-20x</p>
                  <p className="text-sm text-white/60">Faster Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
