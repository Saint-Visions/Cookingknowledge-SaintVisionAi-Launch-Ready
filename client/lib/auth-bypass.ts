// Simple authentication bypass for demo/development
export const authenticateDemo = (method: string = 'demo') => {
  // Set authentication state in localStorage
  localStorage.setItem('demo_authenticated', 'true');
  localStorage.setItem('user_plan', 'enterprise');
  localStorage.setItem('user_email', `${method}@saintvision.ai`);
  localStorage.setItem('user_name', `Demo User (${method})`);
  localStorage.setItem('auth_method', method);
  localStorage.setItem('auth_timestamp', new Date().toISOString());
  
  console.log(`🚀 Demo authentication successful: ${method}`);
  
  // Redirect to dashboard after short delay
  setTimeout(() => {
    window.location.href = '/dashboard';
  }, 100);
};

export const checkAuthentication = (): boolean => {
  return localStorage.getItem('demo_authenticated') === 'true';
};

export const logout = () => {
  localStorage.removeItem('demo_authenticated');
  localStorage.removeItem('user_plan');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
  localStorage.removeItem('auth_method');
  localStorage.removeItem('auth_timestamp');
  
  console.log('🔓 Logged out');
  window.location.href = '/signin';
};

export const getUserData = () => {
  if (!checkAuthentication()) return null;
  
  return {
    email: localStorage.getItem('user_email'),
    name: localStorage.getItem('user_name'),
    plan: localStorage.getItem('user_plan'),
    method: localStorage.getItem('auth_method'),
    timestamp: localStorage.getItem('auth_timestamp')
  };
};
