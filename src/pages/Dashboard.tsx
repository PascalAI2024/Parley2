import { 
  TrendingUp, Clock, CheckCircle, Trophy,
  Activity 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - replace with real data later
const recentParlays = [
  {
    id: 1,
    date: '2024-02-20',
    status: 'Won',
    odds: '+450',
    amount: 50,
    payout: 275,
    details: 'Lakers ML, Warriors -4.5, Celtics vs Bucks Over 228.5',
  },
  {
    id: 2,
    date: '2024-02-19',
    status: 'Lost',
    odds: '+320',
    amount: 25,
    payout: 0,
    details: 'Nets +6.5, Suns ML',
  },
  {
    id: 3,
    date: '2024-02-18',
    status: 'Won',
    odds: '+180',
    amount: 100,
    payout: 280,
    details: 'Nuggets -3.5, Heat vs Bulls Under 215.5',
  },
];

const stats = [
  {
    label: 'Win Rate',
    value: '67%',
    icon: TrendingUp,
    color: 'text-green-500',
    trend: '+2.5%',
  },
  {
    label: 'Active Parlays',
    value: '3',
    icon: Clock,
    color: 'text-blue-500',
    trend: null,
  },
  {
    label: 'Total Wins',
    value: '142',
    icon: Trophy,
    color: 'text-primary',
    trend: '+12',
  },
  {
    label: 'Success Streak',
    value: '5',
    icon: Activity,
    color: 'text-purple-500',
    trend: 'Best: 8',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, let's build some winning parlays</p>
        </div>
        <Link to="/build-parlay" className="btn-animated">
          <CheckCircle size={18} />
          <span>New Parlay</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="stats-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-secondary-light ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                </div>
              </div>
              {stat.trend && (
                <span className={`text-sm font-medium ${
                  stat.trend.startsWith('+') ? 'text-green-500' : 'text-gray-400'
                }`}>
                  {stat.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Parlays */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-display font-bold text-white">Recent Parlays</h2>
          <Link to="/history" className="text-sm text-primary hover:text-primary-light">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {recentParlays.map((parlay) => (
            <div key={parlay.id} className="p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm text-gray-400">{parlay.date}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          parlay.status === 'Won'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}
                    >
                      {parlay.status}
                    </span>
                    <span className="text-white font-medium">{parlay.odds}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Payout</p>
                  <p className={`font-medium ${
                    parlay.status === 'Won' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    ${parlay.payout.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400">{parlay.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="card bg-blue-50 border border-blue-100">
        <h2 className="text-lg font-display font-bold text-blue-900 mb-2">Today's Tips</h2>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span>NBA games have shown a trend towards unders in back-to-back games</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span>Weather conditions may affect today's MLB game totals</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span>Key player injuries in tonight's NHL matchups</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
