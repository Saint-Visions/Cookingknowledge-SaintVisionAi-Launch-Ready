import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Crown,
  Brain,
  Zap,
  Shield,
  MessageSquare,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  Send,
  Mic,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Building,
  Rocket,
  Star,
  CheckCircle,
  Clock,
  Activity,
  Target,
} from "lucide-react";
import { ChatAPI } from "@/utils/fetchData";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'supersal';
  timestamp: string;
  apiUsed?: 'openai' | 'azure';
  businessAction?: string;
}

interface SuperSalProps {
  isFullScreen?: boolean;
  onClose?: () => void;
}

export function SuperSal({ isFullScreen = false, onClose }: SuperSalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hey! I'm SuperSal, your 24/7 AI CEO and business navigator. I handle everything - from client relations to business operations. I'm powered by both OpenAI and Azure, so I've got the best of both worlds. What can I help you cook up today?",
      role: 'supersal',
      timestamp: new Date().toISOString(),
      apiUsed: 'openai',
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeAPI, setActiveAPI] = useState<'openai' | 'azure'>('openai');
  const [businessMode, setBusinessMode] = useState<'ceo' | 'support' | 'navigator'>('ceo');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      // SuperSal uses both APIs intelligently
      const response = await ChatAPI.sendMessage(
        `[SuperSal CEO Mode - ${businessMode.toUpperCase()}] ${currentMessage}`,
        undefined,
        { model: activeAPI === 'openai' ? 'gpt-4o' : 'azure-gpt-4' }
      );
      
      if (response.status === 'success') {
        const supersalResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: response.data.response,
          role: 'supersal',
          timestamp: new Date().toISOString(),
          apiUsed: activeAPI,
          businessAction: detectBusinessAction(currentMessage),
        };

        setMessages(prev => [...prev, supersalResponse]);
      }
    } catch (error) {
      console.error('SuperSal communication error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting to my AI systems right now. But don't worry - I'm always here working behind the scenes to keep your business running smoothly! Try again in a moment.",
        role: 'supersal',
        timestamp: new Date().toISOString(),
        apiUsed: activeAPI,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const detectBusinessAction = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('client') || lowerMessage.includes('customer')) return 'client_management';
    if (lowerMessage.includes('sale') || lowerMessage.includes('revenue')) return 'sales_analysis';
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) return 'support_ticket';
    if (lowerMessage.includes('report') || lowerMessage.includes('analytics')) return 'business_intelligence';
    return 'general_ceo';
  };

  const businessModes = [
    { id: 'ceo', label: 'CEO Mode', icon: Crown, description: 'Strategic business decisions' },
    { id: 'support', label: 'Support Mode', icon: MessageSquare, description: '24/7 client assistance' },
    { id: 'navigator', label: 'Navigator Mode', icon: Target, description: 'Business guidance' },
  ];

  const quickActions = [
    { label: 'Business Report', icon: BarChart3, action: 'Generate a comprehensive business report' },
    { label: 'Client Status', icon: Users, action: 'Check all client statuses and follow-ups needed' },
    { label: 'Revenue Analysis', icon: TrendingUp, action: 'Show me current revenue trends and opportunities' },
    { label: 'System Health', icon: Activity, action: 'Check all business systems and automations' },
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={`border-2 border-gold-500/30 bg-charcoal-900 text-white ${isFullScreen ? 'h-full' : 'h-[600px]'}`}>
      <CardHeader className="border-b border-gold-500/30 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-gold-500">
                <AvatarImage src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d" />
                <AvatarFallback className="bg-gradient-to-br from-gold-400 to-gold-600 text-charcoal-900 font-bold">
                  SS
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-charcoal-900 animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-gold-300">SuperSal</h3>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  24/7 Online
                </Badge>
              </div>
              <p className="text-sm text-white/70">AI CEO • Business Navigator • Your GOTTA GUY™</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={`${activeAPI === 'openai' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
              {activeAPI === 'openai' ? 'OpenAI' : 'Azure'} Powered
            </Badge>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            )}
          </div>
        </div>

        {/* Business Mode Selector */}
        <div className="flex space-x-2 mt-4">
          {businessModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Button
                key={mode.id}
                variant={businessMode === mode.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setBusinessMode(mode.id as any)}
                className={`${businessMode === mode.id ? 'bg-gold-500 text-charcoal-900' : 'text-white/70 hover:text-gold-300'}`}
              >
                <Icon className="w-4 h-4 mr-1" />
                {mode.label}
              </Button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-gold-500 text-charcoal-900'
                    : 'bg-charcoal-800 border border-gold-500/30'
                } rounded-lg p-3`}>
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                    {message.apiUsed && (
                      <span className="flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        {message.apiUsed.toUpperCase()}
                      </span>
                    )}
                  </div>
                  {message.businessAction && (
                    <Badge className="mt-2 text-xs bg-blue-500/20 text-blue-300">
                      {message.businessAction.replace('_', ' ')}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-charcoal-800 border border-gold-500/30 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gold-500/30">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentMessage(action.action)}
                  className="text-left text-xs p-2 h-auto text-white/70 hover:text-gold-300 hover:bg-gold-500/10"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask SuperSal anything about your business..."
              className="flex-1 bg-charcoal-800 border-gold-500/30 text-white placeholder:text-white/50 focus:border-gold-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="bg-gold-500 hover:bg-gold-600 text-charcoal-900"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* API Selector */}
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1 text-xs">
              <button
                onClick={() => setActiveAPI('openai')}
                className={`px-2 py-1 rounded ${activeAPI === 'openai' ? 'bg-blue-500/20 text-blue-300' : 'text-white/50'}`}
              >
                OpenAI
              </button>
              <button
                onClick={() => setActiveAPI('azure')}
                className={`px-2 py-1 rounded ${activeAPI === 'azure' ? 'bg-purple-500/20 text-purple-300' : 'text-white/50'}`}
              >
                Azure
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SuperSal;
