import { useAuth } from "../context/AuthContext";
import { CITIES } from "../data/metroData";

const CITY_META = {
  hyderabad: { emoji: "🏙️", desc: "27 stations · 3 lines", bg: "from-orange-500 to-red-500" },
  chennai:   { emoji: "🌊", desc: "30 stations · 2 lines", bg: "from-blue-500 to-cyan-500" },
  bengaluru: { emoji: "🌿", desc: "33 stations · 2 lines", bg: "from-purple-500 to-violet-500" },
  kochi:     { emoji: "⛵", desc: "22 stations · 1 line",  bg: "from-teal-500 to-emerald-500" },
};

export default function CitySelector({ onSelect }) {
  const { setCity } = useAuth();

  const handleCity = (id) => {
    setCity(id);
    onSelect?.(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Select Your City
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Which city are you in?</h2>
          <p className="text-slate-500 dark:text-slate-400">We'll load metro data specific to your city</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(CITIES).map(([id, city]) => {
            const meta = CITY_META[id];
            return (
              <button
                key={id}
                onClick={() => handleCity(id)}
                className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${meta.bg} opacity-90`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                <div className="relative">
                  <div className="text-4xl mb-3">{meta.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                  <p className="text-white/70 text-sm">{meta.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-white/90 text-sm font-semibold">
                    Select city
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}