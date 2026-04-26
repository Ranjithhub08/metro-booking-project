import { useState, useEffect } from "react";

export default function PaymentModal({ fare, onConfirm, onClose }) {
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  
  // User's actual UPI details
  const upiId = "9390888686@ybl"; 
  const name = "Ranjith Kumar";
  
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${fare}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  const handlePay = () => {
    setProcessing(true);
    // Simulate a short wait to "verify" payment
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Complete Payment</h3>
              <p className="text-slate-500 text-sm">Pay ₹{fare} to generate your ticket</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Method Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button 
                onClick={() => setMethod("upi")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${method === "upi" ? "bg-white dark:bg-slate-700 text-violet-600 shadow-sm" : "text-slate-500"}`}
              >
                UPI QR
              </button>
              <button 
                onClick={() => setMethod("card")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${method === "card" ? "bg-white dark:bg-slate-700 text-violet-600 shadow-sm" : "text-slate-500"}`}
              >
                Card / Other
              </button>
            </div>

            {method === "upi" ? (
              <div className="text-center py-4">
                <div className="bg-white p-3 rounded-2xl inline-block border border-slate-100 shadow-sm mb-4">
                  <img src={qrUrl} alt="UPI QR" className="w-48 h-48" />
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Scan this QR with GPay, PhonePe, or Paytm <br/>
                  to pay <span className="font-bold text-slate-900 dark:text-white">₹{fare}</span>
                </p>
                
                {/* Deep link for mobile users */}
                <a 
                  href={upiUrl}
                  className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-sm hover:underline mb-4"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Pay via App on this device
                </a>
              </div>
            ) : (
              <div className="py-10 text-center">
                <div className="text-4xl mb-3">💳</div>
                <p className="text-sm text-slate-500">Card payments are disabled in demo mode.<br/>Please use UPI for testing.</p>
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify & Generate Ticket"
              )}
            </button>
            
            <p className="text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold">
              Step 2 of 2: Confirm Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

