import { useAuth } from "../context/AuthContext";
import { CITIES } from "../data/metroData";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function TicketHistory() {
  const { bookingHistory } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Booking History</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{bookingHistory.length} total bookings</p>
          </div>
          <button
            onClick={() => navigate("/book")}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Booking
          </button>
        </div>

        {bookingHistory.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="text-5xl mb-4">🎫</div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">No bookings yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Your booking history will appear here</p>
            <button
              onClick={() => navigate("/book")}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              Book Your First Ticket
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {bookingHistory.map((b, i) => {
              const city = CITIES[b.cityId];
              return (
                <div key={b.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-semibold text-slate-900 dark:text-white text-sm truncate">{b.source}</span>
                            <svg className="w-4 h-4 text-violet-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span className="font-semibold text-slate-900 dark:text-white text-sm truncate">{b.destination}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 px-2.5 py-1 rounded-full font-medium">
                            ₹{b.fare}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full">
                            {b.stops} stops
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full">
                            {b.travelTime}
                          </span>
                          {b.cityName && (
                            <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                              {b.cityName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                          {new Date(b.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                          {new Date(b.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{b.id}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {b.status || "confirmed"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}