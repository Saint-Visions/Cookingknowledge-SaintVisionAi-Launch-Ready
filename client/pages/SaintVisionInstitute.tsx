import React from "react";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Brain,
  Lightbulb,
  Rocket,
  Users,
  BookOpen,
  Award,
  Globe,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Code,
  Database,
  Zap,
} from "lucide-react";

export default function SaintVisionInstitute() {
  const breadcrumbs = [
    { label: "SaintVision Institute" },
  ];

  const headerActions = (
    <div className="flex items-center space-x-3">
      <Badge className="bg-purple-100 text-purple-800">
        <GraduationCap className="w-3 h-3 mr-1" />
        R&D Division
      </Badge>
      <Button 
        onClick={() => window.open("https://saintvisiontech.com", "_blank")}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Visit Research Portal
      </Button>
    </div>
  );

  const researchAreas = [
    {
      title: "Hierarchical Adaptive Cognitive Processing (HACP™)",
      description: "Revolutionary AI learning protocol that enables 10-20x faster learning",
      icon: Brain,
      color: "text-purple-600",
      bg: "bg-purple-50",
      status: "Patent Pending",
      progress: 85,
    },
    {
      title: "Multimodal AI Interfaces",
      description: "Advanced voice, text, and visual AI interaction systems",
      icon: Zap,
      color: "text-blue-600",
      bg: "bg-blue-50",
      status: "Active Research",
      progress: 70,
    },
    {
      title: "Enterprise AI Integration",
      description: "Seamless AI integration patterns for enterprise workflows",
      icon: Database,
      color: "text-green-600",
      bg: "bg-green-50",
      status: "Production Ready",
      progress: 95,
    },
    {
      title: "Cognitive AI Security",
      description: "Advanced security protocols for AI-human interactions",
      icon: Sparkles,
      color: "text-gold-600",
      bg: "bg-yellow-50",
      status: "Research Phase",
      progress: 45,
    },
  ];

  const publications = [
    {
      title: "HACP™: A New Paradigm in AI Learning Efficiency",
      authors: "Dr. Sarah Chen, Research Team",
      journal: "Journal of AI Innovation",
      year: "2024",
      type: "Research Paper",
    },
    {
      title: "Enterprise AI: Bridging Human-Machine Collaboration",
      authors: "SaintVision Research Division",
      journal: "Enterprise Technology Review",
      year: "2024",
      type: "White Paper",
    },
    {
      title: "Cognitive Security in AI Systems",
      authors: "Dr. Michael Torres, Security Research Team",
      journal: "AI Security Quarterly",
      year: "2024",
      type: "Technical Report",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Director of AI Research",
      specialization: "Cognitive Computing",
      background: "Former Stanford AI Lab",
    },
    {
      name: "Dr. Michael Torres",
      role: "Lead Security Researcher",
      specialization: "AI Security & Ethics",
      background: "Former MIT CSAIL",
    },
    {
      name: "Dr. Lisa Wang",
      role: "Senior Research Scientist",
      specialization: "Machine Learning",
      background: "Former Google DeepMind",
    },
    {
      name: "Dr. James Rodriguez",
      role: "Applied AI Research Lead",
      specialization: "Enterprise Integration",
      background: "Former Microsoft Research",
    },
  ];

  const partnerships = [
    {
      name: "Stanford University",
      type: "Research Partnership",
      focus: "Advanced AI Algorithms",
      icon: GraduationCap,
    },
    {
      name: "MIT Computer Science",
      type: "Collaboration",
      focus: "AI Security Research",
      icon: Brain,
    },
    {
      name: "Enterprise Partners",
      type: "Applied Research",
      focus: "Real-world Implementation",
      icon: Building,
    },
  ];

  return (
    <WorkspaceLayout
      pageTitle="SaintVision Institute of AI"
      pageDescription="Advanced AI research and development driving the future of cognitive computing"
      breadcrumbs={breadcrumbs}
      headerActions={headerActions}
      className="bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            SaintVision Institute of AI
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Leading breakthrough research in artificial intelligence, cognitive computing, and enterprise 
            AI solutions. Our mission is to push the boundaries of what's possible with AI technology.
          </p>

          <div className="flex justify-center space-x-4">
            <Badge className="bg-purple-100 text-purple-800 text-sm px-4 py-2">
              Research & Development
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 text-sm px-4 py-2">
              Patent Holders
            </Badge>
            <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2">
              Industry Partners
            </Badge>
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Active Research Areas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index} className="border-2 hover:border-purple-200 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 ${area.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${area.color}`} />
                      </div>
                      <Badge 
                        className={
                          area.status === "Patent Pending" ? "bg-gold-100 text-gold-800" :
                          area.status === "Production Ready" ? "bg-green-100 text-green-800" :
                          area.status === "Active Research" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {area.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                    <CardDescription>{area.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">Research Progress</span>
                        <span className="text-gray-500">{area.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${area.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* HACP™ Spotlight */}
        <div className="mb-16">
          <Card className="border-2 border-gold-200 bg-gradient-to-r from-gold-50 to-yellow-50">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">
                    HACP™ Technology Breakthrough
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Hierarchical Adaptive Cognitive Processing Protocol
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Revolutionary Innovation</h4>
                  <p className="text-gray-700 mb-4">
                    Our breakthrough HACP™ protocol enables AI systems to learn and adapt 10-20x faster 
                    than traditional methods. This patented technology is the foundation of SaintVisionAI's 
                    superior performance and adaptive capabilities.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Target className="w-4 h-4 text-green-600 mr-2" />
                      <span>10-20x faster learning efficiency</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Brain className="w-4 h-4 text-purple-600 mr-2" />
                      <span>Adaptive cognitive processing</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Sparkles className="w-4 h-4 text-gold-600 mr-2" />
                      <span>Patent-pending technology</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Real-World Impact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">10-20x</p>
                      <p className="text-sm text-gray-600">Learning Speed</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-2xl font-bold text-green-600">95%</p>
                      <p className="text-sm text-gray-600">Accuracy Rate</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">1000+</p>
                      <p className="text-sm text-gray-600">Enterprise Users</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-2xl font-bold text-gold-600">3</p>
                      <p className="text-sm text-gray-600">Patents Filed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Research Team</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-purple-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-gray-700">{member.specialization}</p>
                    <p className="text-gray-600">{member.background}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Recent Publications</h2>
          
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{pub.title}</h4>
                      <p className="text-gray-600 mb-2">{pub.authors}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                        <Badge variant="outline" className="text-xs">
                          {pub.type}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Research Partnerships</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {partnerships.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      {partner.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{partner.focus}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Collaborate with Our Research Team
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading researchers and institutions in advancing the future of artificial intelligence. 
            Explore partnership opportunities and cutting-edge research initiatives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-purple-500 hover:bg-purple-600 text-white"
              onClick={() => window.open("https://saintvisiontech.com", "_blank")}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Visit Research Portal
            </Button>
            <Button variant="outline" size="lg">
              <Users className="w-5 h-5 mr-2" />
              Partnership Inquiries
            </Button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
