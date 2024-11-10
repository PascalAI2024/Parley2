import { 
  TrendingUp, Clock, CheckCircle, Trophy, 
  Calendar, ArrowRight, AlertTriangle, Activity,
  PlusSquare
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

const upcomingGames = [
  {
    id: 1,
    home: 'Lakers',
    away: 'Warriors',
    time: '7:30 PM',
    date: 'Today',
    homeScore: '-',
    awayScore: '-',
    spread: '-4.5',
    total: '235.5',
  },
  {
    id: 2,
    home: 'Celtics',
    away: 'Bucks',
    time: '8:00 PM',
    date: 'Today',
    homeScore: '-',
    awayScore: '-',
    spread: '-3.5',
    total: '228.5',
  },
];

const insights = [
  {
    title: 'High Value Opportunity',
    description: 'Lakers have covered the spread in 7 of their last 8 home games',
    type: 'positive' as const,
  },
  {
    title: 'Injury Alert',
    description: 'Key player questionable for tonight\'s Celtics game',
    type: 'warning' as const,
  },
  {
    title: 'Trending Pattern',
    description: 'Under has hit in last 5 Warriors road games',
    type: 'info' as const,
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
          <PlusSquare size={18} />
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Parlays */}
        <div className="lg:col-span-2 space-y-6">
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

          {/* Upcoming Games */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display font-bold text-white">Today's Games</h2>
              <button className="text-sm text-primary hover:text-primary-light">
                View all games
              </button>
            </div>
            <div className="space-y-4">
              {upcomingGames.map((game) => (
                <div key={game.id} className="match-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">{game.date}</p>
                        <p className="text-sm font-medium text-white">{game.time}</p>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="font-medium text-white">{game.away}</p>
                          <p className="text-2xl font-display font-bold text-white">{game.awayScore}</p>
                        </div>
                        <span className="text-gray-600">@</span>
                        <div className="text-left">
                          <p className="font-medium text-white">{game.home}</p>
                          <p className="text-2xl font-display font-bold text-white">{game.homeScore}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center px-4 py-2 bg-secondary rounded-lg">
                        <p className="text-sm text-gray-400">Spread</p>
                        <p className="font-medium text-white">{game.spread}</p>
                      </div>
                      <div className="text-center px-4 py-2 bg-secondary rounded-lg">
                        <p className="text-sm text-gray-400">Total</p>
                        <p className="font-medium text-white">{game.total}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Insights and Quick Actions */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="card">
            <h2 className="text-lg font-display font-bold text-white mb-6">AI Insights</h2>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    insight.type === 'positive'
                      ? 'bg-green-500/5 border-green-500/20'
                      : insight.type === 'warning'
                      ? 'bg-yellow-500/5 border-yellow-500/20'
                      : 'bg-blue-500/5 border-blue-500/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {insight.type === 'positive' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : insight.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                    )}
                    <div>
                      <h3 className={`font-medium mb-1 ${
                        insight.type === 'positive'
                          ? 'text-green-500'
                          : insight.type === 'warning'
                          ? 'text-yellow-500'
                          : 'text-blue-500'
                      }`}>
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-400">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-display font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left flex items-center justify-between group">
                <span className="text-white">View Betting History</span>
                <ArrowRight size={18} className="text-gray-500 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="w-full p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left flex items-center justify-between group">
                <span className="text-white">Performance Analytics</span>
                <ArrowRight size={18} className="text-gray-500 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="w-full p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left flex items-center justify-between group">
                <span className="text-white">Account Settings</span>
                <ArrowRight size={18} className="text-gray-500 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
