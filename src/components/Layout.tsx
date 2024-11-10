import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, PlusSquare, User, LogOut, 
  Trophy, Calendar, Settings, Bell,
  PlayCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDemo } from '../contexts/DemoContext';

export function Layout() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const { isDemo } = useDemo();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-secondary-light border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Trophy size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-display font-bold text-white">
                PARLAY<span className="text-primary">MOJO</span>
              </h1>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link
                to="/build-parlay"
                className={`nav-link ${pathname === '/build-parlay' ? 'active' : ''}`}
              >
                <PlusSquare size={20} />
                <span>Build Parlay</span>
              </Link>
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-6">
            {/* Demo Mode Indicator */}
            {isDemo && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-full border border-green-600/20">
                <PlayCircle size={16} />
                <span className="text-sm font-medium">Demo Mode</span>
              </div>
            )}

            {/* Notifications */}
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className="hidden lg:block w-64 space-y-1">
            <div className="card mb-6 diagonal-split">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Win Rate</p>
                  <p className="text-2xl font-display font-bold text-primary">67%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Monthly Progress</span>
                    <span className="text-white">24/30</span>
                  </div>
                  <div className="stat-progress">
                    <div className="stat-progress-bar" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/build-parlay"
              className={`nav-link ${pathname === '/build-parlay' ? 'active' : ''}`}
            >
              <PlusSquare size={20} />
              <span>Build Parlay</span>
            </Link>
            <Link
              to="/profile"
              className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>

            {/* Quick Stats */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-medium text-gray-400 px-4">Quick Stats</h3>
              <div className="space-y-2">
                <div className="px-4 py-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Total Wins</span>
                    <span className="text-sm font-medium text-white">142</span>
                  </div>
                  <div className="stat-progress mt-1">
                    <div className="stat-progress-bar" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Success Rate</span>
                    <span className="text-sm font-medium text-white">67%</span>
                  </div>
                  <div className="stat-progress mt-1">
                    <div className="stat-progress-bar" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
