import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Trophy, ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDemo } from '../contexts/DemoContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const { setIsDemo } = useDemo();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsDemo(false);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleDemoLogin = async () => {
    try {
      setIsDemo(true);
      await login('demo@example.com', 'demo123');
      navigate('/');
    } catch (err) {
      setError('Demo login failed. Please try again.');
      setIsDemo(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <Trophy size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-display font-bold text-white">
                PARLAY<span className="text-primary">MOJO</span>
              </h1>
            </div>
            <h2 className="text-3xl font-display font-bold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-400">
              Sign in to continue your winning streak
            </p>
          </div>

          {/* Demo Mode Button */}
          <div className="relative">
            <div className="absolute -inset-1">
              <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-green-500 via-primary to-purple-500"></div>
            </div>
            <button
              onClick={handleDemoLogin}
              className="relative w-full py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 group"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400/20 to-transparent"></div>
              </div>
              <div className="relative flex items-center justify-center gap-3">
                <PlayCircle size={24} className="text-green-200" />
                <div className="flex flex-col items-start">
                  <span className="text-lg font-display font-bold text-white">Try Demo Mode</span>
                  <span className="text-xs text-green-200">No signup required - Explore all features</span>
                </div>
                <Sparkles size={20} className="text-green-200 animate-pulse" />
              </div>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-secondary text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="card ball-texture">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input pl-10"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input pl-10"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-secondary-dark border-white/10 rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary-light">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-animated w-full group"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary-light">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Feature Showcase */}
      <div className="hidden lg:flex flex-1 relative bg-secondary-dark">
        <div className="absolute inset-0 bg-primary/5 ball-texture"></div>
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <div className="max-w-md">
            <div className="stats-card mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-1">
                    67% Win Rate
                  </h3>
                  <p className="text-gray-400">
                    Join thousands of successful bettors
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                  <Trophy size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-1">
                    AI-Powered Insights
                  </h4>
                  <p className="text-gray-400">
                    Get real-time predictions and analysis to make informed betting decisions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                  <Trophy size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-1">
                    Expert Community
                  </h4>
                  <p className="text-gray-400">
                    Connect with professional bettors and share winning strategies
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                  <Trophy size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-white mb-1">
                    Live Updates
                  </h4>
                  <p className="text-gray-400">
                    Stay informed with real-time odds and game statistics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
