import { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { CITIES } from "../data/metroData";
import { findRoute, getRouteDetails } from "../utils/routeAlgorithm";
import { calculateFare, estimateTravelTime, generateBookingId } from "../utils/fareCalculator";
import Navbar from "../components/Navbar";
import RouteVisualizer from "../components/RouteVisualizer";
import QRTicket from "../components/QRTicket";
import PaymentModal from "../components/PaymentModal";

export default function BookingPage() {
  const { user, saveBooking } = useAuth();
  const cityId = user?.city;
  const city = CITIES[cityId];
  const stations = city?.stations || [];

  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [srcSearch, setSrcSearch] = useState("");
  const [dstSearch, setDstSearch] = useState("");
  const [srcOpen, setSrcOpen] = useState(false);
  const [dstOpen, setDstOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState(null);
  const [booking, setBooking] = useState(null);
  const [step, setStep] = useState("plan"); // plan | ticket
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const filteredSrc = useMemo(() => 
    stations.filter(s => s.name.toLowerCase().includes(srcSearch.toLowerCase()) && s.id !== dest),
    [srcSearch, stations, dest]
  );
  const filteredDst = useMemo(() =>
    stations.filter(s => s.name.toLowerCase().includes(dstSearch.toLowerCase()) && s.id !== source),
    [dstSearch, stations, source]
  );

  const stationName = (id) => stations.find(s => s.id === id)?.name || id;

  const handleSwap = () => {
    const tempS = source, tempD = dest;
    setSource(tempD);
    setDest(tempS);
    setSrcSearch(tempD ? stationName(tempD) : "");
    setDstSearch(tempS ? stationName(tempS) : "");
    setRoute(null);
    setBooking(null);
    setStep("plan");
  };

  const handleSearch = async () => {
    if (!source || !dest) return;
    setLoading(true);
    setRoute(null);
    setBooking(null);
    setStep("plan");
    await new Promise(r => setTimeout(r, 800));
    const result = findRoute(cityId, source, dest);
    setLoading(false);
    if (result) {
      const stops = result.path.length - 1;
      const fare = calculateFare(stops);
      const time = estimateTravelTime(stops);
      setRoute({ ...result, stops, fare, time, stations: getRouteDetails(cityId, result.path) });
    } else {
      setRoute({ error: "No route found between selected stations." });
    }
  };

  const handleBookTicket = () => {
    const b = {
      id: generateBookingId(),
      source: stationName(source),
      destination: stationName(dest),
      route: route.path,
      fare: route.fare,
      stops: route.stops,
      travelTime: route.time,
      cityName: city.name,
      cityId,
      interchanges: route.interchanges,
      timestamp: Date.now(),
      status: "confirmed",
    };
    saveBooking(b);
    setBooking(b);
    setStep("ticket");
    setIsPaymentOpen(false);
  };

  const officialUrl = city?.officialUrl || "#";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {isPaymentOpen && (
          <PaymentModal 
            fare={route.fare} 
            onConfirm={handleBookTicket} 
            onClose={() => setIsPaymentOpen(false)} 
          />
        )}

        {step === "ticket" && booking ? (
          <div className="max-w-md mx-auto">
            <QRTicket booking={booking} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left panel - Input */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                    <span className="text-sm">🗺️</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white text-base">Plan Journey</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{city?.name} Metro</p>
                  </div>
                </div>

                {/* Source */}
                <div className="mb-3 relative">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    🟢 Source Station
                  </label>
                  <input
                    type="text"
                    value={srcSearch}
                    onChange={e => { setSrcSearch(e.target.value); setSrcOpen(true); setSource(""); }}
                    onFocus={() => setSrcOpen(true)}
                    placeholder="Search station..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  />
                  {srcOpen && filteredSrc.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                      {filteredSrc.slice(0, 8).map(s => {
                        const line = city.lines[s.line];
                        return (
                          <button
                            key={s.id}
                            onClick={() => { setSource(s.id); setSrcSearch(s.name); setSrcOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 text-left transition-colors"
                          >
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: line?.color }} />
                            <div>
                              <div className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</div>
                              <div className="text-xs text-slate-400">{line?.name}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Swap */}
                <div className="flex justify-center my-2">
                  <button
                    onClick={handleSwap}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:border-violet-300 transition-all hover:rotate-180 duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>

                {/* Destination */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    🔴 Destination Station
                  </label>
                  <input
                    type="text"
                    value={dstSearch}
                    onChange={e => { setDstSearch(e.target.value); setDstOpen(true); setDest(""); }}
                    onFocus={() => setDstOpen(true)}
                    placeholder="Search station..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  />
                  {dstOpen && filteredDst.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                      {filteredDst.slice(0, 8).map(s => {
                        const line = city.lines[s.line];
                        return (
                          <button
                            key={s.id}
                            onClick={() => { setDest(s.id); setDstSearch(s.name); setDstOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 text-left transition-colors"
                          >
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: line?.color }} />
                            <div>
                              <div className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</div>
                              <div className="text-xs text-slate-400">{line?.name}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSearch}
                  disabled={!source || !dest || loading}
                  className="mt-5 w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Finding best route...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Find Route
                    </>
                  )}
                </button>
              </div>

              {/* Route result */}
              {route && !route.error && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4">
                    <h3 className="text-white font-bold text-sm mb-3">Route Summary</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Stops", value: route.stops },
                        { label: "Time", value: route.time },
                        { label: "Fare", value: `₹${route.fare}` },
                      ].map(d => (
                        <div key={d.label} className="text-center bg-white/20 rounded-xl p-2">
                          <div className="text-white font-bold text-lg">{d.value}</div>
                          <div className="text-white/70 text-xs">{d.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Station list */}
                  <div className="px-6 py-4 max-h-64 overflow-y-auto">
                    <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Route Path</h4>
                    {route.stations.map((s, i) => {
                      const isInterchange = route.interchanges?.includes(s.id);
                      const lineColor = city.lines[s.line]?.color || "#6366f1";
                      const isFirst = i === 0;
                      const isLast = i === route.stations.length - 1;
                      return (
                        <div key={s.id} className="flex items-center gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${isFirst || isLast ? "border-0" : ""}`}
                              style={{
                                backgroundColor: isFirst ? "#8b5cf6" : isLast ? "#10b981" : isInterchange ? "#f59e0b" : lineColor + "40",
                                borderColor: lineColor,
                              }}
                            />
                            {i < route.stations.length - 1 && (
                              <div className="w-0.5 h-5 mt-0.5" style={{ backgroundColor: lineColor + "60" }} />
                            )}
                          </div>
                          <div className={`py-1 text-sm ${isFirst || isLast ? "font-semibold text-slate-900 dark:text-white" : isInterchange ? "font-medium text-amber-600 dark:text-amber-400" : "text-slate-600 dark:text-slate-400"}`}>
                            {s.name}
                            {isInterchange && <span className="ml-2 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded-full">Interchange</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-6 pb-4">
                    <button
                      onClick={() => setIsPaymentOpen(true)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      Proceed to Payment (₹{route.fare})
                    </button>
                  </div>
                </div>
              )}

              {route?.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-5 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {route.error}
                </div>
              )}
            </div>

            {/* Right panel - visualization */}
            <div className="lg:col-span-3 space-y-4">
              {route && !route.error ? (
                <RouteVisualizer cityId={cityId} path={route.path} interchanges={route.interchanges} />
              ) : (
                <div className="h-full min-h-64 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 flex flex-col items-center justify-center text-center p-12">
                  <div className="text-5xl mb-4">🗺️</div>
                  <h3 className="text-slate-300 font-semibold mb-2">Route Preview</h3>
                  <p className="text-slate-500 text-sm">Select source and destination to visualize your route</p>
                </div>
              )}

              {/* Fare info */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">Fare Structure</h3>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { range: "0–2", fare: 10 },
                    { range: "3–5", fare: 20 },
                    { range: "6–10", fare: 30 },
                    { range: "11–15", fare: 40 },
                    { range: "15+", fare: 50 },
                  ].map(f => {
                    const isActive = route && !route.error && calculateFare(route.stops) === f.fare;
                    return (
                      <div
                        key={f.range}
                        className={`text-center p-2.5 rounded-xl transition-all ${
                          isActive
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <div className="font-bold text-sm">₹{f.fare}</div>
                        <div className="text-xs opacity-70">{f.range} stops</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close dropdowns on outside click */}
      {(srcOpen || dstOpen) && (
        <div className="fixed inset-0 z-10" onClick={() => { setSrcOpen(false); setDstOpen(false); }} />
      )}
    </div>
  );
}