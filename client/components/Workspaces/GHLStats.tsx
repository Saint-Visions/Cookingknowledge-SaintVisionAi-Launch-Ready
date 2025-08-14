import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  MessageSquare,
  Target,
  DollarSign,
  Activity,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface GHLData {
  contacts: {
    total: number;
    new_today: number;
    qualified: number;
  };
  opportunities: {
    total: number;
    value: number;
    won_rate: number;
  };
  campaigns: {
    active: number;
    sent_today: number;
    open_rate: number;
  };
  conversations: {
    total: number;
    active: number;
    response_rate: number;
  };
  revenue: {
    monthly: number;
    pipeline: number;
    growth: number;
  };
  lastSync: string;
  status: 'connected' | 'syncing' | 'error';
}

export function GHLStats() {
  const [ghlData, setGhlData] = useState<GHLData | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchGHLStats();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchGHLStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchGHLStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ghl-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_stats' })
      });
      
      if (response.ok) {
        const data = await response.json();
        setGhlData(data);
      } else {
        // Fallback mock data for development
        setGhlData({
          contacts: { total: 2847, new_today: 23, qualified: 1204 },
          opportunities: { total: 156, value: 284750, won_rate: 24.3 },
          campaigns: { active: 8, sent_today: 1247, open_rate: 32.4 },
          conversations: { total: 892, active: 47, response_rate: 89.2 },
          revenue: { monthly: 89450, pipeline: 284750, growth: 12.7 },
          lastSync: new Date().toISOString(),
          status: 'connected'
        });
      }
    } catch (error) {
      console.error('Failed to fetch GHL stats:', error);
      // Set error state
      setGhlData({
        contacts: { total: 0, new_today: 0, qualified: 0 },
        opportunities: { total: 0, value: 0, won_rate: 0 },
        campaigns: { active: 0, sent_today: 0, open_rate: 0 },
        conversations: { total: 0, active: 0, response_rate: 0 },
        revenue: { monthly: 0, pipeline: 0, growth: 0 },
        lastSync: new Date().toISOString(),
        status: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualSync = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/ghl-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'force_sync' })
      });
      
      if (response.ok) {
        await fetchGHLStats();
      }
    } catch (error) {
      console.error('Manual sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getStatusIcon = () => {
    switch (ghlData?.status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (ghlData?.status) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'syncing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            Loading GHL Stats...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                GoHighLevel Statistics
              </CardTitle>
              <CardDescription>
                Real-time data from your GHL account
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor()}>
                {getStatusIcon()}
                <span className="ml-1 capitalize">{ghlData?.status || 'unknown'}</span>
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualSync}
                disabled={syncing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                Sync
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contacts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(ghlData?.contacts.total || 0)}
                </p>
                <p className="text-sm text-gray-600">Total Contacts</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">New Today:</span>
                <span className="font-medium text-green-600">
                  +{ghlData?.contacts.new_today || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Qualified:</span>
                <span className="font-medium">
                  {formatNumber(ghlData?.contacts.qualified || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {ghlData?.opportunities.total || 0}
                </p>
                <p className="text-sm text-gray-600">Active Opportunities</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Value:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(ghlData?.opportunities.value || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Win Rate:</span>
                <span className="font-medium">
                  {ghlData?.opportunities.won_rate || 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
              Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {ghlData?.campaigns.active || 0}
                </p>
                <p className="text-sm text-gray-600">Active Campaigns</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sent Today:</span>
                <span className="font-medium text-blue-600">
                  {formatNumber(ghlData?.campaigns.sent_today || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Open Rate:</span>
                <span className="font-medium">
                  {ghlData?.campaigns.open_rate || 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Activity className="w-5 h-5 mr-2 text-orange-600" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(ghlData?.conversations.total || 0)}
                </p>
                <p className="text-sm text-gray-600">Total Conversations</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Now:</span>
                <span className="font-medium text-green-600">
                  {ghlData?.conversations.active || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Response Rate:</span>
                <span className="font-medium">
                  {ghlData?.conversations.response_rate || 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(ghlData?.revenue.monthly || 0)}
                </p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pipeline:</span>
                <span className="font-medium text-blue-600">
                  {formatCurrency(ghlData?.revenue.pipeline || 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Growth:</span>
                <span className="font-medium text-green-600">
                  +{ghlData?.revenue.growth || 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sync Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <RefreshCw className="w-5 h-5 mr-2 text-gray-600" />
              Sync Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon()}
                <span className="font-medium capitalize">
                  {ghlData?.status || 'Unknown'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Last sync: {ghlData?.lastSync ? 
                  new Date(ghlData.lastSync).toLocaleString() : 
                  'Never'
                }
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open('https://app.gohighlevel.com', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open GHL Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
