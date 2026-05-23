import React from "react";
import { CreditCard, Landmark } from "lucide-react";

export default function PaymentMethodCard({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="space-y-4">

      {/* PAYMENT OPTIONS */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* BANK TRANSFER */}
        <button
          type="button"
          onClick={() => setPaymentMethod("swift_bank_transfer")}
          className={`border rounded-2xl p-5 text-left transition-all group ${
            paymentMethod === "swift_bank_transfer"
              ? "border-amber-500 bg-amber-50/70 shadow-sm"
              : "border-gray-200 hover:bg-gray-50/80"
          }`}
        >
          <Landmark
            size={24}
            className={`mb-3 transition-colors ${
              paymentMethod === "swift_bank_transfer"
                ? "text-amber-600"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />

          <h4
            className={`font-bold ${
              paymentMethod === "swift_bank_transfer"
                ? "text-amber-900"
                : "text-slate-800"
            }`}
          >
            Bank Transfer
          </h4>

          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
            Direct wire transfer. Upload bank slip after payment.
          </p>
        </button>
      </div>

      {/* BANK DETAILS (ONLY SHOW WHEN SELECTED) */}
      {paymentMethod === "swift_bank_transfer" && (
        <div className="border border-amber-200 bg-amber-50/60 rounded-2xl p-5 space-y-2">
          <h3 className="font-bold text-amber-900">
            Company Bank Details
          </h3>

          <div className="text-sm text-slate-700 space-y-1">
            <p><span className="font-semibold">Bank Name:</span> Global IME Bank</p>
            <p><span className="font-semibold">Account Name:</span> Your Company Pvt. Ltd.</p>
            <p><span className="font-semibold">Account No:</span> 1234567890</p>
            <p><span className="font-semibold">SWIFT Code:</span> GLBBNPKA</p>
            <p><span className="font-semibold">Branch:</span> Kathmandu Main Branch</p>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            After payment, upload your bank slip to verify booking.
          </p>
        </div>
      )}

    </div>
  );
}