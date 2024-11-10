import { useState } from 'react';
import { 
  Trophy, CircleDot, Dumbbell, Gamepad2,
  Plus, X, TrendingUp, 
  DollarSign, ArrowRight,
  Brain, ChartBar, Sparkles
} from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';

interface SportType {
  id: string;
  name: string;
  icon: any;
  active: boolean;
}

interface EventOdds {
  spread: string;
  spreadOdds: string;
  moneyline: string;
  total: string;
  totalOdds: string;
}

interface EventInsight {
  type: 'positive' | 'warning' | 'neutral';
  text: string;
  confidence: number;
}

interface EventStats {
  homeForm: string[];
  awayForm: string[];
  headToHead: string;
  injuries: string[];
}

interface Event {
  id: number;
  home: string;
  away: string;
  time: string;
  odds: EventOdds;
  insights: EventInsight[];
  stats: EventStats;
}

interface MockEvents {
  [key: string]: Event[];
}

// Mock data - replace with real API data later
const sports: SportType[] = [
  { id: 'nba', name: 'NBA', icon: Trophy, active: true },
  { id: 'mlb', name: 'MLB', icon: CircleDot, active: false },
  { id: 'nfl', name: 'NFL', icon: Dumbbell, active: false },
  { id: 'nhl', name: 'NHL', icon: Gamepad2, active: false },
];

const mockEvents: MockEvents = {
  nba: [
    { 
      id: 1, 
      home: 'Lakers', 
      away: 'Warriors', 
      time: '7:30 PM', 
      odds: { 
        spread: '-3.5', 
        spreadOdds: '-110',
        moneyline: '-150', 
        total: '235.5',
        totalOdds: '-110'
      },
      insights: [
        {
          type: 'positive',
          text: 'Lakers are 7-1 ATS in their last 8 home games',
          confidence: 85
        },
        {
          type: 'neutral',
          text: 'Warriors averaging 118.5 points in last 4 road games',
          confidence: 65
        }
      ],
      stats: {
        homeForm: ['W', 'W', 'L', 'W', 'W'],
        awayForm: ['W', 'L', 'W', 'L', 'W'],
        headToHead: '3-2',
        injuries: ['Stephen Curry (GTD)', 'Anthony Davis (Probable)']
      }
    },
    { 
      id: 2, 
      home: 'Celtics', 
      away: 'Bucks', 
      time: '8:00 PM', 
      odds: { 
        spread: '-4.5', 
        spreadOdds: '-110',
        moneyline: '-180', 
        total: '228.5',
        totalOdds: '-110'
      },
      insights: [
        {
          type: 'positive',
          text: 'Celtics have won last 6 home games straight up',
          confidence: 88
        },
        {
          type: 'warning',
          text: "Key player questionable for tonight's game",
          confidence: 72
        }
      ],
      stats: {
        homeForm: ['W', 'W', 'W', 'W', 'W'],
        awayForm: ['W', 'W', 'L', 'W', 'L'],
        headToHead: '4-1',
        injuries: ['Jaylen Brown (Out)', 'Giannis Antetokounmpo (Probable)']
      }
    },
  ],
};

interface Bet {
  id: string;
  event: Event;
  type: 'spread' | 'moneyline' | 'total';
  selection: string;
  odds: string;
  confidence: number;
}

export function ParlayBuilder() {
  const [selectedSport, setSelectedSport] = useState('nba');
  const [bets, setBets] = useState<Bet[]>([]);
  const [totalOdds, setTotalOdds] = useState<string>('+100');
  const [wagerAmount, setWagerAmount] = useState<string>('10');
  const [showInsights, setShowInsights] = useState<number | null>(null);
  const { isDemo } = useDemo();

  const handleAddBet = (event: Event, type: Bet['type'], selection: string, odds: string) => {
    // Find the relevant insight for this bet
    const relevantInsight = event.insights.find((insight) => {
      if (type === 'spread' && insight.text.includes('ATS')) return true;
      if (type === 'moneyline' && insight.text.includes('straight up')) return true;
      if (type === 'total' && insight.text.includes('points')) return true;
      return false;
    });

    const newBet: Bet = {
      id: `${event.id}-${type}-${selection}`,
      event,
      type,
      selection,
      odds,
      confidence: relevantInsight?.confidence || 75,
    };
    setBets([...bets, newBet]);
    // Mock odds calculation - replace with real calculation
    setTotalOdds(`+${(parseInt(totalOdds.slice(1)) + 100).toString()}`);
  };

  const handleRemoveBet = (betId: string) => {
    setBets(bets.filter(bet => bet.id !== betId));
    // Mock odds recalculation
    setTotalOdds(`+${(parseInt(totalOdds.slice(1)) - 100).toString()}`);
  };

  const calculatePayout = () => {
    const amount = parseFloat(wagerAmount) || 0;
    const odds = parseInt(totalOdds.slice(1));
    return amount + (amount * (odds / 100));
  };

  const calculateConfidence = () => {
    if (bets.length === 0) return 0;
    return Math.round(bets.reduce((acc, bet) => acc + bet.confidence, 0) / bets.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Build Your Parlay</h1>
          <p className="text-gray-400">Select your picks and create your winning combination</p>
        </div>
        <div className="stats-card px-6 py-3">
          <div className="flex items-center gap-3">
            <Brain className="text-primary" size={24} />
            <div>
              <p className="text-sm text-gray-400">AI Confidence</p>
              <p className="text-lg font-display font-bold text-white">{calculateConfidence()}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sport Selection */}
      <div className="card">
        <h2 className="text-lg font-display font-bold text-white mb-6">Select Sport</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sports.map((sport) => (
            <button
              key={sport.id}
              onClick={() => setSelectedSport(sport.id)}
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all
                ${
                  selectedSport === sport.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-white/5 hover:border-primary/50 text-gray-400 hover:text-white'
                }
                ${sport.active ? '' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!sport.active}
            >
              <sport.icon size={24} />
              <span className="font-medium">{sport.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Events and Odds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {selectedSport && mockEvents[selectedSport]?.map((event) => (
            <div key={event.id} className="card">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Today</p>
                    <p className="text-sm font-medium text-white">{event.time}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">
                      {event.away} @ {event.home}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {event.stats.injuries.map((injury, idx) => (
                        <span key={idx} className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                          {injury}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowInsights(showInsights === event.id ? null : event.id)}
                  className="text-primary hover:text-primary-light transition-colors"
                >
                  <Brain size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Spread */}
                <button
                  onClick={() => handleAddBet(event, 'spread', event.odds.spread, event.odds.spreadOdds)}
                  className="p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left"
                >
                  <p className="text-sm text-gray-400 mb-2">Spread</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-display font-bold text-white">{event.odds.spread}</span>
                    <span className="text-primary">{event.odds.spreadOdds}</span>
                  </div>
                </button>

                {/* Moneyline */}
                <button
                  onClick={() => handleAddBet(event, 'moneyline', 'ML', event.odds.moneyline)}
                  className="p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left"
                >
                  <p className="text-sm text-gray-400 mb-2">Moneyline</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-display font-bold text-white">ML</span>
                    <span className="text-primary">{event.odds.moneyline}</span>
                  </div>
                </button>

                {/* Total */}
                <button
                  onClick={() => handleAddBet(event, 'total', `O ${event.odds.total}`, event.odds.totalOdds)}
                  className="p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors text-left"
                >
                  <p className="text-sm text-gray-400 mb-2">Total</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-display font-bold text-white">O {event.odds.total}</span>
                    <span className="text-primary">{event.odds.totalOdds}</span>
                  </div>
                </button>
              </div>

              {/* Team Form */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">{event.home} Form</p>
                  <div className="flex gap-1">
                    {event.stats.homeForm.map((result, idx) => (
                      <span
                        key={idx}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium
                          ${
                            result === 'W'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">{event.away} Form</p>
                  <div className="flex gap-1">
                    {event.stats.awayForm.map((result, idx) => (
                      <span
                        key={idx}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium
                          ${
                            result === 'W'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              {showInsights === event.id && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain size={16} className="text-primary" />
                    <h4 className="text-sm font-medium text-white">AI Insights</h4>
                  </div>
                  {event.insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        insight.type === 'positive'
                          ? 'bg-green-500/5 border-green-500/20'
                          : insight.type === 'warning'
                          ? 'bg-yellow-500/5 border-yellow-500/20'
                          : 'bg-blue-500/5 border-blue-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2">
                          <ChartBar size={16} className={
                            insight.type === 'positive'
                              ? 'text-green-500'
                              : insight.type === 'warning'
                              ? 'text-yellow-500'
                              : 'text-blue-500'
                          } />
                          <span className="text-sm font-medium text-white">{insight.confidence}% Confidence</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{insight.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bet Slip */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-display font-bold text-white mb-6">Your Parlay</h2>
            {bets.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-secondary-light flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-400">Select bets to add to your parlay</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bets.map((bet) => (
                  <div key={bet.id} className="flex items-center justify-between p-4 bg-secondary-light rounded-lg">
                    <div>
                      <p className="font-medium text-white">
                        {bet.event.away} @ {bet.event.home}
                      </p>
                      <p className="text-sm text-gray-400">
                        {bet.type === 'moneyline' ? 'Moneyline' : bet.type === 'spread' ? 'Spread' : 'Total'}: {bet.selection}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Brain size={14} className="text-primary" />
                        <span className="text-xs text-primary">{bet.confidence}% Confidence</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-primary">{bet.odds}</span>
                      <button
                        onClick={() => handleRemoveBet(bet.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-white/5 pt-4 space-y-4">
                  <div>
                    <label htmlFor="wager" className="block text-sm font-medium text-gray-300 mb-1">
                      Wager Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="number"
                        name="wager"
                        id="wager"
                        value={wagerAmount}
                        onChange={(e) => setWagerAmount(e.target.value)}
                        className="input pl-10"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="bg-secondary-light rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Odds</span>
                      <span className="text-lg font-display font-bold text-white">{totalOdds}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">AI Confidence</span>
                      <div className="flex items-center gap-2">
                        <Brain size={16} className="text-primary" />
                        <span className="text-lg font-display font-bold text-primary">
                          {calculateConfidence()}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Potential Payout</span>
                      <span className="text-lg font-display font-bold text-green-500">
                        ${calculatePayout().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="btn-animated w-full group">
                    Place Parlay
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="card space-y-4">
            <h3 className="font-display font-bold text-white">Quick Stats</h3>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Parlay Win Rate</span>
                <span className="text-white">67%</span>
              </div>
              <div className="stat-progress">
                <div className="stat-progress-bar" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">NBA Picks Accuracy</span>
                <span className="text-white">72%</span>
              </div>
              <div className="stat-progress">
                <div className="stat-progress-bar" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>

          {isDemo && (
            <div className="card bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-green-500" size={20} />
                <h3 className="font-display font-bold text-white">Demo Features</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Brain size={16} className="text-green-500" />
                  <span>AI-powered insights and predictions</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChartBar size={16} className="text-green-500" />
                  <span>Real-time odds and statistics</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-500" />
                  <span>Performance tracking and analysis</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
