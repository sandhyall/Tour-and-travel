import React from "react";
import { CreditCard, Landmark } from "lucide-react";

export default function PaymentMethodCard({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">

      {/* ONLINE PAYMENT */}
      <button
        type="button"
        onClick={() => setPaymentMethod("card")}
        className={`border rounded-2xl p-5 text-left transition-all group ${
          paymentMethod === "card"
            ? "border-amber-500 bg-amber-50/70 shadow-sm"
            : "border-gray-200 hover:bg-gray-50/80"
        }`}
      >
        <CreditCard
          size={24}
          className={`mb-3 transition-colors ${
            paymentMethod === "card"
              ? "text-amber-600"
              : "text-gray-400 group-hover:text-gray-600"
          }`}
        />

        <h4
          className={`font-bold transition-colors ${
            paymentMethod === "card"
              ? "text-amber-900"
              : "text-slate-800"
          }`}
        >
          Online Payment
        </h4>

        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          Pay securely using Khalti, eSewa, or International Cards.
        </p>
      </button>

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
        {/* यहाँ केवल Landmark मात्र हुनुपर्छ */}
        <Landmark
          size={24}
          className={`mb-3 transition-colors ${
            paymentMethod === "swift_bank_transfer"
              ? "text-amber-600"
              : "text-gray-400 group-hover:text-gray-600"
          }`}
        />

        <h4
          className={`font-bold transition-colors ${
            paymentMethod === "swift_bank_transfer"
              ? "text-amber-900"
              : "text-slate-800"
          }`}
        >
          Bank Transfer
        </h4>

        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          Direct wire transfer. Upload the bank receipt/slip for validation.
        </p>
      </button>

    </div>
  );
}