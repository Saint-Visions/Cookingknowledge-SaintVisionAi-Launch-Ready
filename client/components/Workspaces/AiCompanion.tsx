import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Sparkles,
  Heart,
  Zap,
  TrendingUp,
  Lightbulb,
  Target,
  Clock,
  Star,
  Settings,
  MessageSquare,
  BarChart3,
  Activity,
  CheckCircle,
  ArrowRight,
  Plus,
  Smile,
  Coffee,
  Focus,
  Rocket,
} from "lucide-react";
import { CompanionAPI, DataUtils } from "@/utils/fetchData";

interface CompanionData {
  companion: {
    name: string;
    personality: string;
    mood: 'helpful' | 'focused' | 'creative' | 'analytical';
    availableTools: string[];
    learningProgress: number;
    interactions: number;
  };
  suggestions: Array<{
    type: 'task' | 'insight' | 'reminder' | 'tip';
    title: string;
    description: string;
    actionable: boolean;
  }>;
}

export function AiCompanion() {
  const [companionData, setCompanionData] = useState<CompanionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string>('helpful');

  useEffect(() => {
    fetchCompanionData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchCompanionData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchCompanionData = async () => {
    try {
      const response = await CompanionAPI.getCompanionStatus();
      if (response.status === 'success') {
        setCompanionData(response.data);
        setSelectedMood(response.data.companion.mood);
      } else {
        // Fallback data for development
        setCompanionData({
          companion: {
            name: "SaintSal",
            personality: "Helpful, insightful, and focused on your success",
            mood: 'helpful',
            availableTools: ['Chat', 'Analysis', 'Planning', 'Research', 'Code'],
            learningProgress: 78,
            interactions: 1247,
          },
          suggestions: [
            {
              type: 'task',
              title: 'Complete morning review',
              description: 'Review your priorities and schedule for today',
              actionable: true,
            },
            {
              type: 'insight',
              title: 'Productivity peak time',
              description: 'Your most productive hours are typically 9-11 AM',
              actionable: false,
            },
            {
              type: 'reminder',
              title: 'Team meeting in 30 minutes',
              description: 'Weekly sync with the marketing team',
              actionable: true,
            },
            {
              type: 'tip',
              title: 'Use the Pomodoro technique',
              description: 'Try 25-minute focused work sessions for better concentration',
              actionable: true,
            },
          ],
        });
      }
    } catch (error) {
      console.error('Failed to fetch companion data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'helpful':
        return Heart;
      case 'focused':
        return Target;
      case 'creative':
        return Lightbulb;
      case 'analytical':
        return BarChart3;
      default:
        return Brain;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'helpful':
        return 'text-pink-600 bg-pink-50';
      case 'focused':
        return 'text-blue-600 bg-blue-50';
      case 'creative':
        return 'text-purple-600 bg-purple-50';
      case 'analytical':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'task':
        return CheckCircle;
      case 'insight':
        return Lightbulb;
      case 'reminder':
        return Clock;
      case 'tip':
        return Star;
      default:
        return Sparkles;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'task':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'insight':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'reminder':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'tip':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleMoodChange = async (mood: string) => {
    setSelectedMood(mood);
    // In real implementation, update companion mood via API
    try {
      await CompanionAPI.trainCompanion({
        preferences: { mood },
        feedback: [],
      });
      fetchCompanionData();
    } catch (error) {
      console.error('Failed to update mood:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Companion Status */}
      <Card className="border-2 hover:border-gold-200 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-gold-200">
                  <AvatarImage src="https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d" />
                  <AvatarFallback className="bg-gradient-to-br from-gold-400 to-gold-600 text-white text-lg font-bold">
                    SS
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {companionData?.companion.name || 'SaintSal AI'}
                </h2>
                <p className="text-gray-600 mb-2">
                  {companionData?.companion.personality}
                </p>
                <div className="flex items-center space-x-3">
                  <Badge className={getMoodColor(companionData?.companion.mood || 'helpful')}>
                    {React.createElement(getMoodIcon(companionData?.companion.mood || 'helpful'), {
                      className: "w-3 h-3 mr-1"
                    })}
                    {companionData?.companion.mood || 'helpful'}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {DataUtils.formatNumber(companionData?.companion.interactions || 0)} interactions
                  </span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {/* Learning Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Learning Progress</span>
                <span className="text-sm text-gray-500">
                  {companionData?.companion.learningProgress || 0}%
                </span>
              </div>
              <Progress 
                value={companionData?.companion.learningProgress || 0} 
                className="h-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your companion gets smarter with every interaction
              </p>
            </div>

            {/* Available Tools */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Available Tools</h4>
              <div className="flex flex-wrap gap-2">
                {(companionData?.companion.availableTools || []).map((tool, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Smile className="w-5 h-5 mr-2 text-gold-600" />
            Companion Mood
          </CardTitle>
          <CardDescription>
            Adjust your AI companion's personality for different tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { mood: 'helpful', icon: Heart, label: 'Helpful', desc: 'Supportive & encouraging' },
              { mood: 'focused', icon: Target, label: 'Focused', desc: 'Direct & task-oriented' },
              { mood: 'creative', icon: Lightbulb, label: 'Creative', desc: 'Innovative & imaginative' },
              { mood: 'analytical', icon: BarChart3, label: 'Analytical', desc: 'Data-driven & logical' },
            ].map(({ mood, icon: Icon, label, desc }) => (
              <button
                key={mood}
                onClick={() => handleMoodChange(mood)}
                className={`p-4 rounded-xl border-2 transition-all hover:shadow-sm ${
                  selectedMood === mood
                    ? 'border-gold-500 bg-gold-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                  selectedMood === mood ? 'text-gold-600' : 'text-gray-400'
                }`} />
                <p className={`font-medium text-sm ${
                  selectedMood === mood ? 'text-gold-900' : 'text-gray-700'
                }`}>
                  {label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            AI Suggestions
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(companionData?.suggestions || []).map((suggestion, index) => {
              const Icon = getSuggestionIcon(suggestion.type);
              const colorClass = getSuggestionColor(suggestion.type);
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${colorClass} hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Icon className="w-5 h-5 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {suggestion.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {suggestion.description}
                        </p>
                        <Badge variant="outline" className="text-xs capitalize">
                          {suggestion.type}
                        </Badge>
                      </div>
                    </div>
                    
                    {suggestion.actionable && (
                      <Button size="sm" variant="outline">
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Get More Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks with your AI companion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-16 flex-col">
              <MessageSquare className="w-5 h-5 mb-1" />
              <span className="text-sm">Start Chat</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <TrendingUp className="w-5 h-5 mb-1" />
              <span className="text-sm">Get Insights</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Target className="w-5 h-5 mb-1" />
              <span className="text-sm">Plan Day</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Activity className="w-5 h-5 mb-1" />
              <span className="text-sm">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
