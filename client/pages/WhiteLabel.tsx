import React, { useState } from "react";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Palette,
  Settings,
  Key,
  Users,
  DollarSign,
  Crown,
  Building,
  Sparkles,
  Code,
  ExternalLink,
  Check,
  Zap,
} from "lucide-react";

export default function WhiteLabel() {
  const [customDomain, setCustomDomain] = useState("");
  const [brandName, setBrandName] = useState("");

  const breadcrumbs = [
    { label: "White Label" },
  ];

  const headerActions = (
    <div className="flex items-center space-x-2">
      <Badge className="bg-gold-500 text-white">
        <Crown className="w-3 h-3 mr-1" />
        Empire Mode
      </Badge>
      <Button className="bg-gold-500 hover:bg-gold-600 text-white">
        Get Started
      </Button>
    </div>
  );

  const features = [
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Complete brand customization with your colors, logo, and styling",
      included: ["Custom color schemes", "Logo replacement", "Font customization", "UI themes"],
    },
    {
      icon: Globe,
      title: "Custom Domains",
      description: "Use your own domain with SSL certificates and CDN",
      included: ["Custom domain setup", "SSL certificates", "CDN optimization", "DNS management"],
    },
    {
      icon: Key,
      title: "API Management",
      description: "Full control over API access and client management",
      included: ["API key management", "Rate limiting", "Usage analytics", "Client provisioning"],
    },
    {
      icon: Users,
      title: "Multi-Tenant",
      description: "Manage multiple clients under your brand",
      included: ["Client isolation", "Tenant management", "User permissions", "Data segregation"],
    },
    {
      icon: DollarSign,
      title: "Revenue Sharing",
      description: "Monetize your white-label platform",
      included: ["Commission tracking", "Payment processing", "Billing management", "Revenue analytics"],
    },
    {
      icon: Code,
      title: "Developer Access",
      description: "Full source code and customization capabilities",
      included: ["Source code access", "Custom features", "API extensions", "Technical support"],
    },
  ];

  const plans = [
    {
      name: "White Label Elite",
      price: "$497/month",
      description: "Your own branded SaintVisionAI empire",
      features: [
        "Complete white-label branding",
        "Custom domain & SSL",
        "Up to 100 client accounts",
        "Revenue sharing program",
        "Basic customization",
        "Email support",
      ],
      cta: "Start Elite",
      popular: false,
    },
    {
      name: "Enterprise White Label",
      price: "$1,497/month",
      description: "Full enterprise solution with unlimited scale",
      features: [
        "Everything in Elite",
        "Unlimited client accounts",
        "Full source code access",
        "Custom feature development",
        "24/7 dedicated support",
        "White-glove onboarding",
        "SLA guarantees",
      ],
      cta: "Go Enterprise",
      popular: true,
    },
    {
      name: "Custom Solution",
      price: "Contact Us",
      description: "Tailored solution for your specific needs",
      features: [
        "Everything in Enterprise",
        "Custom development",
        "Dedicated team",
        "Hardware requirements",
        "On-premise deployment",
        "Custom contracts",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <WorkspaceLayout
      pageTitle="White Label Solutions"
      pageDescription="Build your own AI platform empire with SaintVisionAI's white-label solutions"
      breadcrumbs={breadcrumbs}
      headerActions={headerActions}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Build Your AI Empire
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Launch your own branded AI platform with SaintVisionAI's white-label solutions. 
            Complete customization, revenue sharing, and enterprise-grade infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white">
              <Crown className="w-5 h-5 mr-2" />
              Start Your Empire
            </Button>
            <Button variant="outline" size="lg">
              <ExternalLink className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything You Need to Scale
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-gold-200 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.included.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Configuration Demo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Easy Configuration
          </h2>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="branding" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="domain">Domain</TabsTrigger>
                <TabsTrigger value="api">API Setup</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
              </TabsList>

              <TabsContent value="branding" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      Brand Customization
                    </CardTitle>
                    <CardDescription>
                      Customize your platform's appearance and branding
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform Name
                      </label>
                      <Input
                        placeholder="Your AI Platform"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-blue-500 rounded border"></div>
                          <Input value="#3B82F6" className="flex-1" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Accent Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-green-500 rounded border"></div>
                          <Input value="#10B981" className="flex-1" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo Upload
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <Building className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600">Drop your logo here or click to upload</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="domain" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Custom Domain Setup
                    </CardTitle>
                    <CardDescription>
                      Connect your own domain with SSL certificates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Domain
                      </label>
                      <Input
                        placeholder="ai.yourcompany.com"
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        We'll provide DNS instructions after setup
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">DNS Configuration</h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <code>CNAME</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <code>ai</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Value:</span>
                          <code>custom.saintvisionai.com</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-700">SSL Certificate will be automatically provisioned</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Key className="w-5 h-5 mr-2" />
                      API Configuration
                    </CardTitle>
                    <CardDescription>
                      Set up API access for your clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Rate Limit (per minute)
                        </label>
                        <Input type="number" value="60" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Token Limit (per month)
                        </label>
                        <Input value="100,000" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Allowed Models
                      </label>
                      <div className="space-y-2">
                        {["GPT-4o", "GPT-4", "GPT-3.5-turbo", "Claude-3"].map((model) => (
                          <label key={model} className="flex items-center">
                            <input type="checkbox" defaultChecked className="mr-2" />
                            <span className="text-sm">{model}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Sample API Endpoint</h4>
                      <code className="text-sm text-gray-700">
                        https://ai.yourcompany.com/api/v1/chat
                      </code>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clients" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Client Management
                    </CardTitle>
                    <CardDescription>
                      Manage your client accounts and billing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-600">Active Clients</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">$0</div>
                        <div className="text-sm text-gray-600">Monthly Revenue</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">0</div>
                        <div className="text-sm text-gray-600">API Calls</div>
                      </div>
                    </div>

                    <div>
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                        <Users className="w-4 h-4 mr-2" />
                        Add First Client
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Choose Your Empire Plan
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={cn(
                  "relative border-2 transition-all duration-200",
                  plan.popular
                    ? "border-gold-500 shadow-lg scale-105"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gold-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900 mt-2">
                    {plan.price}
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular
                        ? "bg-gold-500 hover:bg-gold-600 text-white"
                        : "border-gray-300 hover:bg-gray-50"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gold-50 to-yellow-50 border border-gold-200 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Your AI Empire?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join successful entrepreneurs who've launched their own AI platforms with SaintVisionAI. 
            Get started today with white-glove onboarding and dedicated support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white">
              <Crown className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
