import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { CITIES } from "../data/metroData";
import CitySelector from "../components/CitySelector";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user, bookingHistory, setCity } = useAuth();
  const navigate = useNavigate();

  if (!user?.city) {
    return <CitySelector onSelect={() => {}} />;
  }

  const city = CITIES[user.city];
  const recentBookings = bookingHistory.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome header */}
        <div className="rounded-3xl overflow-hidden relative mb-8 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 p-8 shadow-xl shadow-violet-500/20">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
            <svg viewBox="0 0 100 200" className="w-full h-full" fill="none">
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2"/>
              <line x1="50" y1="80" x2="50" y2="120" stroke="white" strokeWidth="2"/>
              <circle cx="50" cy="130" r="20" stroke="white" strokeWidth="2"/>
              <line x1="50" y1="150" x2="50" y2="180" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div className="relative">
            <p className="text-violet-200 text-sm font-medium mb-1">Welcome back,</p>
            <h1 className="text-3xl font-bold text-white mb-1">{user.username} 👋</h1>
            <p className="text-violet-200 text-sm">
              Exploring <span className="text-white font-semibold">{city?.name}</span> Metro
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/book")}
                className="flex items-center gap-2 bg-white text-violet-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-colors shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Book Ticket
              </button>
              <button
                onClick={() => setCity(null)}
                className="flex items-center gap-2 bg-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/30 transition-colors border border-white/30"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Change City
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Stations", value: city?.stations?.length || 0, icon: "🚉", color: "from-violet-500 to-purple-600" },
            { label: "Metro Lines", value: Object.keys(city?.lines || {}).length, icon: "🛤️", color: "from-blue-500 to-indigo-600" },
            { label: "My Bookings", value: bookingHistory.length, icon: "🎫", color: "from-emerald-500 to-teal-600" },
            { label: "Min Fare", value: "₹10", icon: "💰", color: "from-orange-500 to-amber-600" },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metro lines */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {city?.name} Metro Lines
            </h3>
            <div className="space-y-3">
              {Object.entries(city?.lines || {}).map(([id, line]) => {
                const stationCount = city.stations.filter(s => s.line === id).length;
                return (
                  <div key={id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: line.color }} />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{line.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{stationCount} stations</div>
                    </div>
                    <div
                      className="h-2 rounded-full flex-1 max-w-[120px] opacity-30"
                      style={{ backgroundColor: line.color }}
                    />
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => navigate("/book")}
              className="mt-4 w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/20"
            >
              Plan Your Journey →
            </button>
          </div>

          {/* Recent bookings */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Bookings
            </h3>
            {recentBookings.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🎫</div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">No bookings yet</p>
                <button
                  onClick={() => navigate("/book")}
                  className="mt-3 text-violet-600 dark:text-violet-400 text-sm font-semibold hover:underline"
                >
                  Book your first ticket
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map(b => (
                  <div key={b.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span className="truncate">{b.source}</span>
                      <svg className="w-3 h-3 flex-shrink-0 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="truncate">{b.destination}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">₹{b.fare}</span>
                      <span className="text-xs text-slate-400">{new Date(b.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                <Link to="/history" className="block text-center text-violet-600 dark:text-violet-400 text-xs font-semibold hover:underline mt-2">
                  View all bookings →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Fare chart */}
        <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Fare Structure</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { range: "0–2 stations", fare: "₹10" },
              { range: "3–5 stations", fare: "₹20" },
              { range: "6–10 stations", fare: "₹30" },
              { range: "11–15 stations", fare: "₹40" },
              { range: "15+ stations", fare: "₹50" },
            ].map(f => (
              <div key={f.range} className="text-center p-3 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border border-violet-100 dark:border-violet-800">
                <div className="text-xl font-bold text-violet-700 dark:text-violet-300">{f.fare}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{f.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}