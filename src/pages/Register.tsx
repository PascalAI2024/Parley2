import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Trophy, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await register(email, password, username);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const features = [
    'AI-Powered Betting Insights',
    'Real-time Odds Updates',
    'Expert Community Access',
    'Performance Analytics',
    'Customized Alerts',
    'Premium Support',
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Feature Showcase */}
      <div className="hidden lg:flex flex-1 relative bg-secondary-dark">
        <div className="absolute inset-0 bg-primary/5 ball-texture"></div>
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <div className="max-w-md">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Trophy size={28} className="text-white" />
                </div>
                <h1 className="text-2xl font-display font-bold text-white">
                  PARLAY<span className="text-primary">MOJO</span>
                </h1>
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Join the Winning Team
              </h2>
              <p className="text-gray-400 text-lg">
                Get access to professional betting tools and join a community of successful bettors.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-300 bg-secondary-light/50 rounded-lg p-4"
                >
                  <CheckCircle size={20} className="text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <div className="stats-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Average Win Rate</p>
                    <p className="text-3xl font-display font-bold text-white">67%</p>
                  </div>
                  <div className="h-16 w-px bg-white/10"></div>
                  <div>
                    <p className="text-sm text-gray-400">Active Members</p>
                    <p className="text-3xl font-display font-bold text-white">10k+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-white">
              Create Your Account
            </h2>
            <p className="mt-2 text-gray-400">
              Start your journey to better betting
            </p>
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
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input pl-10"
                      placeholder="Choose a username"
                    />
                  </div>
                </div>

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
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input pl-10"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 bg-secondary-dark border-white/10 rounded text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:text-primary-light">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:text-primary-light">
                    Privacy Policy
                  </a>
                </label>
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
                    Create account
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-light">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
