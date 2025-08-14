import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppLayout } from '@/components/AppLayout';
import {
  CheckCircle,
  AlertCircle,
  User,
  Crown,
  Mail,
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react';

export default function TestAuth() {
  const [authData, setAuthData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authStatus = {
        isAuthenticated: localStorage.getItem('demo_authenticated') === 'true',
        userPlan: localStorage.getItem('user_plan'),
        userEmail: localStorage.getItem('user_email'),
        userName: localStorage.getItem('user_name'),
        authMethod: localStorage.getItem('auth_method'),
        timestamp: new Date().toISOString()
      };
      
      setAuthData(authStatus);
      setIsLoaded(true);
      
      console.log('Auth Status:', authStatus);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('demo_authenticated');
    localStorage.removeItem('user_plan');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    localStorage.removeItem('auth_method');
    
    console.log('Logged out, redirecting to sign in');
    window.location.href = '/signin';
  };

  const testPages = [
    { name: 'Dashboard', path: '/dashboard', description: 'Main AI dashboard' },
    { name: 'Console', path: '/console', description: 'Agent console interface' },
    { name: 'Workstation', path: '/workstation', description: 'Enterprise command center' },
    { name: 'Voice Demo', path: '/voice-demo', description: 'Deepgram voice features' },
    { name: 'War Room', path: '/workspace/notes', description: 'Dual AI chat system' }
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-charcoal-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-charcoal-900 text-white p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold saintvision-gradient-text mb-2">
              Authentication Test Page
            </h1>
            <p className="text-white/70">
              Check your authentication status and test access to different pages
            </p>
          </div>

          {/* Authentication Status */}
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                {authData?.isAuthenticated ? (
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                )}
                Authentication Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Status:</span>
                    <Badge className={authData?.isAuthenticated ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                      {authData?.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                    </Badge>
                  </div>
                  
                  {authData?.userEmail && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Email:</span>
                      <span className="text-white font-medium">{authData.userEmail}</span>
                    </div>
                  )}
                  
                  {authData?.userName && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Name:</span>
                      <span className="text-white font-medium">{authData.userName}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {authData?.userPlan && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Plan:</span>
                      <Badge className="bg-gold-500/20 text-gold-300">
                        {authData.userPlan}
                      </Badge>
                    </div>
                  )}
                  
                  {authData?.authMethod && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Method:</span>
                      <span className="text-white/80">{authData.authMethod}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Checked:</span>
                    <span className="text-white/60 text-sm">
                      {new Date(authData?.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                {authData?.isAuthenticated ? (
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-500/50 text-red-300 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => window.location.href = '/signin'}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Go to Sign In
                  </Button>
                )}
                
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-white/20 text-white/70"
                >
                  Refresh Status
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Pages */}
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle>Test Application Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testPages.map((page) => (
                  <div
                    key={page.path}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{page.name}</h4>
                      <ExternalLink className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-sm text-white/60 mb-3">{page.description}</p>
                    <Button
                      onClick={() => window.location.href = page.path}
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                      disabled={!authData?.isAuthenticated}
                    >
                      {authData?.isAuthenticated ? 'Visit Page' : 'Login Required'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Debug Information */}
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/30 p-4 rounded-lg">
                <pre className="text-xs text-white/70 overflow-x-auto">
                  {JSON.stringify(authData, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          {!authData?.isAuthenticated && (
            <Card className="glass-morphism border-blue-500/30">
              <CardContent className="p-6 text-center">
                <Crown className="w-12 h-12 mx-auto mb-4 text-gold-400" />
                <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                <p className="text-white/70 mb-4">
                  Use the demo access to explore all SaintVision AI features
                </p>
                <Button
                  onClick={() => window.location.href = '/signin'}
                  className="bg-gold-500 hover:bg-gold-600 text-charcoal-900"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In / Demo Access
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
