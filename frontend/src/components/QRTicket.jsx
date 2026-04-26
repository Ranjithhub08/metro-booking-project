import { useEffect, useRef } from "react";

export default function QRTicket({ booking }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    `TICKET:${booking.id}|${booking.source}|${booking.destination}|${booking.fare}`
  )}`;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50">
        
        {/* Top Header - Branded */}
        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 p-8 text-white relative overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
          
          <div className="relative z-10 flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-black text-xl tracking-tight leading-none uppercase">MetroPass</h2>
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{booking.cityName} Metro Rail</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <span className="text-[10px] font-black uppercase tracking-tighter">Verified Ticket</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">From Station</p>
              <h3 className="text-2xl font-black truncate">{booking.source}</h3>
            </div>
            <div className="flex flex-col items-center px-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            <div className="flex-1 text-right">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">To Station</p>
              <h3 className="text-2xl font-black truncate">{booking.destination}</h3>
            </div>
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="relative h-6 bg-white dark:bg-slate-900 flex items-center justify-between px-[-10px]">
          <div className="absolute left-0 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full -ml-3 border-r border-slate-200 dark:border-slate-800 shadow-inner"></div>
          <div className="w-full border-t-2 border-dashed border-slate-100 dark:border-slate-800 mx-4"></div>
          <div className="absolute right-0 w-6 h-6 bg-slate-50 dark:bg-slate-950 rounded-full -mr-3 border-l border-slate-200 dark:border-slate-800 shadow-inner"></div>
        </div>

        {/* Ticket Body */}
        <div className="p-8 pt-2">
          {/* Main QR Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group cursor-pointer">
              {/* Holographic background for QR */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-violet-500/20 via-indigo-500/20 to-emerald-500/20 rounded-3xl blur-xl transition-all group-hover:opacity-100 opacity-50"></div>
              <div className="relative bg-white p-4 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <img 
                  src={qrUrl} 
                  alt="Ticket QR" 
                  className="w-48 h-48 transition-transform group-hover:scale-105 duration-500"
                />
                {/* Security overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] [background-size:4px_4px]"></div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-1">Serial Number</p>
              <p className="text-slate-900 dark:text-white font-black text-sm tracking-widest">{booking.id}</p>
            </div>
          </div>

          {/* Ticket Metadata */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ticket Type</p>
              <p className="text-sm font-black text-slate-900 dark:text-white">One Way Trip</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fare Paid</p>
              <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-none">₹{booking.fare}.00</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Passenger</p>
              <p className="text-sm font-black text-slate-900 dark:text-white truncate">Guest User</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date & Time</p>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                {new Date(booking.timestamp).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })} • {new Date(booking.timestamp).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Bottom Branding / Disclaimer */}
          <div className="flex items-center justify-between opacity-50">
            <div className="h-px bg-slate-200 dark:border-slate-800 flex-1"></div>
            <span className="mx-4 text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Security Encrypted</span>
            <div className="h-px bg-slate-200 dark:border-slate-800 flex-1"></div>
          </div>
          
          <p className="text-[9px] text-slate-400 dark:text-slate-500 text-center mt-4 leading-relaxed font-medium">
            This ticket is valid for one hour from the time of issue. <br/>
            Tampering with the digital ticket is a punishable offence.
          </p>
        </div>

        {/* Footer Glow */}
        <div className="h-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700"></div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4 no-print">
        <button 
          onClick={handleDownload}
          className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Save to Gallery
        </button>
        <button 
          onClick={() => window.location.href = "/"}
          className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}