import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let currentUrl = window.location.origin;
    // If accessing via localhost, the QR won't work on mobile.
    // We provide a hint or use the detected IP if we could hardcode it (but hardcoding is risky).
    setUrl(currentUrl + "/dashboard");
  }, []);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl blur opacity-30 animate-pulse"></div>
        <div className="relative bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl max-w-md w-full">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">MetroPass</h1>
            <p className="text-slate-400 text-sm">Scan to access the metro booking system</p>
          </div>

          <div className="bg-white p-4 rounded-2xl mb-8 inline-block shadow-inner">
            <img src={qrUrl} alt="Scan QR" className="w-48 h-48" />
          </div>

          <div className="space-y-4">
            <Link 
              to="/dashboard" 
              className="block w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all transform hover:scale-[1.02]"
            >
              Open Dashboard
            </Link>
            <p className="text-xs text-slate-500">
              Point your camera at the QR code to open on mobile
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex gap-8">
        {[
          { label: "Book Tickets", icon: "🎫" },
          { label: "Live Tracking", icon: "📍" },
          { label: "Fare Calculator", icon: "💰" }
        ].map(feat => (
          <div key={feat.label} className="text-center">
            <div className="text-2xl mb-1">{feat.icon}</div>
            <div className="text-xs text-slate-500 font-medium">{feat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
