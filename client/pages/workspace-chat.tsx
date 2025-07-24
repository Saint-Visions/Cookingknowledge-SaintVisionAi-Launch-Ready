import React, { useState, useEffect, useRef } from "react";
import { WorkspaceLayout } from "@/components/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Send,
  Mic,
  Plus,
  Brain,
  Sparkles,
  History,
  Settings,
  Zap,
  MessageSquare,
  Image,
  FileText,
  Code,
  Calculator,
  Search,
  MoreHorizontal,
  Trash2,
  Edit,
  Copy,
  Share,
  Heart,
  Star,
} from "lucide-react";
import { ChatAPI, DataUtils } from "@/utils/fetchData";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  tokensUsed?: number;
  tools?: string[];
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: string;
  messageCount: number;
}

export default function WorkspaceChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const breadcrumbs = [
    { label: "Workspaces", href: "/workspace" },
    { label: "AI Chat" },
  ];

  const headerActions = (
    <div className="flex items-center space-x-3">
      <Badge className="bg-blue-100 text-blue-800">
        <Brain className="w-3 h-3 mr-1" />
        {selectedModel}
      </Badge>
      <Button variant="outline" onClick={() => setShowHistory(!showHistory)}>
        <History className="w-4 h-4 mr-2" />
        History
      </Button>
    </div>
  );

  useEffect(() => {
    loadConversations();
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = async () => {
    try {
      const response = await ChatAPI.getConversations();
      if (response.status === 'success') {
        setConversations(response.data.conversations);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
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
      const response = await ChatAPI.sendMessage(currentMessage, activeConversation);

      if (response.status === 'success') {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.data.response,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          tokensUsed: response.data.tokensUsed,
        };

        setMessages(prev => [...prev, assistantMessage]);

        if (!activeConversation) {
          setActiveConversation(response.data.conversationId);
          loadConversations();
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewConversation = () => {
    setActiveConversation(null);
    setMessages([{
      id: 'welcome',
      content: "👋 Hello! I'm your SaintSal AI companion. What would you like to work on today?",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    }]);
    inputRef.current?.focus();
  };

  const loadConversation = (conversation: Conversation) => {
    setActiveConversation(conversation.id);
    // In a real app, load the conversation messages
    setMessages([]);
    setShowHistory(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const aiTools = [
    {
      id: 'image',
      name: 'Image Generation',
      icon: Image,
      description: 'Create images with AI',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      id: 'code',
      name: 'Code Assistant',
      icon: Code,
      description: 'Get coding help',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      id: 'calc',
      name: 'Calculator',
      icon: Calculator,
      description: 'Math calculations',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      id: 'search',
      name: 'Web Search',
      icon: Search,
      description: 'Search the web',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  const quickPrompts = [
    "Help me plan my day",
    "Explain this concept simply",
    "Write a professional email",
    "Generate creative ideas",
    "Analyze this data",
    "Improve this text",
  ];

  return (
    <WorkspaceLayout
      pageTitle="AI Chat"
      pageDescription="Natural conversations with AI - simple, intuitive, and powerful"
      breadcrumbs={breadcrumbs}
      headerActions={headerActions}
      className="bg-gray-50"
    >
      <div className="h-full flex">
        {/* Chat History Sidebar */}
        {showHistory && (
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Chat History</h3>
                <Button size="sm" onClick={startNewConversation}>
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => loadConversation(conversation)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      activeConversation === conversation.id ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                  >
                    <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
                      {conversation.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2 truncate">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{DataUtils.formatRelativeTime(conversation.updatedAt)}</span>
                      <span>{conversation.messageCount} messages</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">SaintSal AI</h2>
                  <p className="text-sm text-gray-600">Your AI companion is ready to help</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white"
                >
                  <option value="gpt-4o">GPT-4o (Fastest)</option>
                  <option value="gpt-4">GPT-4 (Best)</option>
                  <option value="claude-3">Claude 3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 px-6 py-4">
            {messages.length === 0 ? (
              /* Welcome Screen */
              <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to SaintSal AI Chat
                </h3>
                <p className="text-gray-600 mb-8 max-w-md">
                  Your natural AI companion for productive conversations. Ask anything, get insights, and accomplish more.
                </p>

                {/* AI Tools */}
                <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md">
                  {aiTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <div
                        key={tool.id}
                        className={`p-4 ${tool.bg} rounded-xl border border-gray-100 cursor-pointer hover:shadow-sm transition-shadow`}
                        onClick={() => {
                          setCurrentMessage(`Use ${tool.name.toLowerCase()}: `);
                          inputRef.current?.focus();
                        }}
                      >
                        <Icon className={`w-6 h-6 ${tool.color} mb-2`} />
                        <h4 className="font-medium text-gray-900 text-sm">{tool.name}</h4>
                        <p className="text-xs text-gray-600">{tool.description}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Prompts */}
                <div className="space-y-2 w-full max-w-lg">
                  <p className="text-sm font-medium text-gray-700 mb-3">Quick prompts to get started:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMessage(prompt)}
                        className="p-2 text-left text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Messages */
              <div className="space-y-4 max-w-3xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      {message.role === 'user' ? (
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
                          U
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                          AI
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className={`flex-1 max-w-none ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div
                        className={`inline-block p-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-50 text-gray-900 border border-gray-100'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        {message.tokensUsed && (
                          <p className="text-xs mt-2 opacity-70">
                            {message.tokensUsed} tokens used
                          </p>
                        )}
                      </div>

                      <div className={`flex items-center mt-2 space-x-2 text-xs text-gray-500 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{DataUtils.formatRelativeTime(message.timestamp)}</span>
                        <button className="hover:text-gray-700">
                          <Copy className="w-3 h-3" />
                        </button>
                        {message.role === 'assistant' && (
                          <>
                            <button className="hover:text-gray-700">
                              <Heart className="w-3 h-3" />
                            </button>
                            <button className="hover:text-gray-700">
                              <Share className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message SaintSal AI..."
                    className="pr-20 min-h-[44px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-8 w-8 text-gray-400 hover:text-gray-600"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>Free tier: Unlimited conversations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
