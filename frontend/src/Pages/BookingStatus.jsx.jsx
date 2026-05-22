import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get("bookingId") || "N/A";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-xl text-center border border-gray-100">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Expedition Secured!</h2>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Your booking has been registered successfully. A confirmation voucher and packing checklist have been dispatched to your email.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 my-6 text-left border border-slate-100">
          <div className="flex justify-between text-xs font-mono text-gray-400">
            <span>REFERENCE ID</span>
            <span className="text-slate-900 font-bold">{bookingId}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-amber-500 hover:bg-amber-600 transition-colors py-3.5 rounded-xl font-bold text-black flex items-center justify-center gap-2"
        >
          Explore More Trips <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function BookingCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-xl text-center border border-gray-100">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} />
        </div>
        
        <h2 className="text-3xl font-black text-slate-950 tracking-tight">Checkout Canceled</h2>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          The transaction process was interrupted. No payment was processed, and your spots are still open.
        </p>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-slate-950 hover:bg-slate-900 text-white transition-colors py-3.5 rounded-xl font-bold"
          >
            Return to Checkout
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors py-3.5 rounded-xl font-medium text-sm"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}