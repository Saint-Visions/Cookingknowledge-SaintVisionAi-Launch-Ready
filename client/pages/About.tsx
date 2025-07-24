import React from "react";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Brain,
  Users,
  Trophy,
  Zap,
  Shield,
  Globe,
  Building,
  Heart,
  Target,
  Rocket,
  Star,
  ExternalLink,
  Mail,
} from "lucide-react";

export default function About() {
  const breadcrumbs = [
    { label: "About" },
  ];

  const headerActions = (
    <Button variant="outline">
      <Mail className="w-4 h-4 mr-2" />
      Contact Us
    </Button>
  );

  const milestones = [
    {
      year: "2023",
      title: "Founded",
      description: "SaintVisionAI founded with mission to democratize AI",
      icon: Rocket,
    },
    {
      year: "2024",
      title: "HACP™ Patent",
      description: "Revolutionary Hierarchical Adaptive Cognitive Processing patent filed",
      icon: Brain,
    },
    {
      year: "2024",
      title: "10,000+ Users",
      description: "Reached 10,000+ active users across 50+ countries",
      icon: Users,
    },
    {
      year: "2025",
      title: "Enterprise Launch",
      description: "White-label and enterprise solutions launched",
      icon: Building,
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Human-Centered AI",
      description: "We believe AI should enhance human capability, not replace it. Our technology empowers people to achieve more.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Enterprise-grade security with AES-256 encryption, SOC 2 compliance, and GDPR adherence.",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Constantly pushing boundaries with our HACP™ technology and next-generation AI capabilities.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Making advanced AI accessible to businesses and individuals worldwide, regardless of size or budget.",
    },
  ];

  const team = [
    {
      name: "SaintSal",
      role: "Founder & CEO",
      description: "Visionary entrepreneur with 20+ years in technology and business automation",
      avatar: "https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d",
    },
    {
      name: "AI Engineering Team",
      role: "Technical Excellence",
      description: "World-class engineers from top tech companies building the future of AI",
      avatar: null,
    },
    {
      name: "Research Division",
      role: "SVT Institute",
      description: "Cutting-edge research in cognitive AI and machine learning",
      avatar: null,
    },
  ];

  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Countries", value: "50+", icon: Globe },
    { label: "AI Conversations", value: "1M+", icon: Brain },
    { label: "Enterprise Clients", value: "100+", icon: Building },
  ];

  return (
    <WorkspaceLayout
      pageTitle="About SaintVisionAI"
      pageDescription="Learn about our mission to democratize AI and empower businesses worldwide"
      breadcrumbs={breadcrumbs}
      headerActions={headerActions}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cookin' Knowledge Since Day One
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            SaintVisionAI is revolutionizing how businesses and individuals interact with AI. 
            Our mission is to make advanced artificial intelligence accessible, intuitive, and powerful for everyone.
          </p>

          <div className="flex justify-center">
            <Badge className="bg-gold-100 text-gold-800 text-sm px-4 py-2">
              Powered by HACP™ Technology
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-gold-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-gold-50 to-yellow-50 border border-gold-200 rounded-2xl p-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To democratize artificial intelligence by creating intuitive, powerful, and accessible AI solutions 
                that empower businesses and individuals to achieve their full potential.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge className="bg-blue-100 text-blue-800">Accessible AI</Badge>
                <Badge className="bg-green-100 text-green-800">Human-Centered</Badge>
                <Badge className="bg-purple-100 text-purple-800">Enterprise-Ready</Badge>
                <Badge className="bg-gold-100 text-gold-800">Innovation-Driven</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-2 hover:border-gold-200 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className="bg-gray-100 text-gray-800">{milestone.year}</Badge>
                        <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">HACP™ Technology</h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Our revolutionary Hierarchical Adaptive Cognitive Processing (HACP™) protocol enables 
                AI systems to learn 10-20x faster than traditional methods. This patent-pending technology 
                is the foundation of SaintVisionAI's superior performance.
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white rounded-lg p-6">
                  <Target className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Adaptive Learning</h3>
                  <p className="text-sm text-gray-600">
                    Continuously adapts to user patterns and preferences for personalized AI experiences.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <Zap className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Faster Processing</h3>
                  <p className="text-sm text-gray-600">
                    10-20x faster learning and response times compared to traditional AI systems.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <Shield className="w-8 h-8 text-purple-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Enhanced Security</h3>
                  <p className="text-sm text-gray-600">
                    Built-in security protocols protect data while maintaining AI performance.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More About HACP™
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-gold-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-gold-50 to-yellow-50 border border-gold-200 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the AI Revolution</h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to experience the future of AI? Join thousands of businesses and individuals 
            who've already transformed their work with SaintVisionAI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white">
              <Rocket className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
