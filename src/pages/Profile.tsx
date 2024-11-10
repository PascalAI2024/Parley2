import { useState } from 'react';
import { 
  User, Mail, Settings, TrendingUp, DollarSign,
  Trophy, BarChart3, Bell, Shield, Key, ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const bettingHistory = [
  {
    id: 1,
    date: '2024-02-20',
    type: 'NBA Parlay',
    result: 'Won',
    wager: 50,
    payout: 275,
    details: 'Lakers -3.5, Warriors ML, Celtics vs Bucks Over 228.5',
    accuracy: 92,
  },
  {
    id: 2,
    date: '2024-02-19',
    type: 'NBA Parlay',
    result: 'Lost',
    wager: 25,
    payout: 0,
    details: 'Nets +6.5, Suns ML',
    accuracy: 45,
  },
  {
    id: 3,
    date: '2024-02-18',
    type: 'NBA Parlay',
    result: 'Won',
    wager: 100,
    payout: 280,
    details: 'Nuggets -3.5, Heat vs Bulls Under 215.5',
    accuracy: 88,
  },
];

const stats = [
  {
    label: 'Total Wagered',
    value: '$1,250',
    icon: DollarSign,
    color: 'text-blue-500',
    change: '+12% vs last month',
  },
  {
    label: 'Total Won',
    value: '$2,100',
    icon: TrendingUp,
    color: 'text-green-500',
    change: '+18% vs last month',
  },
  {
    label: 'Win Rate',
    value: '67%',
    icon: Trophy,
    color: 'text-primary',
    change: '+5% vs last month',
  },
  {
    label: 'AI Accuracy',
    value: '89%',
    icon: BarChart3,
    color: 'text-purple-500',
    change: '+3% vs last month',
  },
];

const performanceData = [
  { month: 'Sep', winRate: 55 },
  { month: 'Oct', winRate: 62 },
  { month: 'Nov', winRate: 58 },
  { month: 'Dec', winRate: 65 },
  { month: 'Jan', winRate: 70 },
  { month: 'Feb', winRate: 67 },
];

export function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    notifications: true,
    darkMode: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold text-white">Profile</h1>
        <button className="btn-primary">
          <Shield size={18} />
          <span>Upgrade to Pro</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="stats-card">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-secondary-light ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-sm text-green-500">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display font-bold text-white">Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-primary hover:text-primary-light transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={!isEditing}
                      className="input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="input pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-white">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive updates about your bets</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-white">Dark Mode</p>
                      <p className="text-sm text-gray-400">Toggle dark mode theme</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.darkMode}
                      onChange={(e) => setFormData({ ...formData, darkMode: e.target.checked })}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Performance Chart */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display font-bold text-white">Performance History</h2>
              <select className="bg-secondary-light text-white border-0 rounded-lg p-2 text-sm">
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {performanceData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-primary/20 rounded-t-lg transition-all duration-500"
                    style={{ height: `${data.winRate}%` }}
                  >
                    <div 
                      className="w-full bg-primary rounded-t-lg transition-all duration-500"
                      style={{ height: `${data.winRate * 0.7}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-display font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Key size={20} className="text-gray-400" />
                  <span className="text-white">Change Password</span>
                </div>
                <ArrowRight size={18} className="text-gray-500 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="w-full p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-gray-400" />
                  <span className="text-white">Security Settings</span>
                </div>
                <ArrowRight size={18} className="text-gray-500 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="w-full p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-gray-400" />
                  <span className="text-white">Notification Settings</span>
                </div>
                <ArrowRight size={18} className="text-gray-500 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-display font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {bettingHistory.map((bet) => (
                <div key={bet.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    bet.result === 'Won' ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    <Trophy size={20} className={
                      bet.result === 'Won' ? 'text-green-500' : 'text-red-500'
                    } />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{bet.type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        bet.result === 'Won'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {bet.result}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{bet.details}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-400">AI Accuracy: {bet.accuracy}%</span>
                      <span className="text-sm text-gray-400">${bet.payout}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
