import {
  CreditCard,
  Landmark,
} from "lucide-react";

export default function PaymentMethodCard({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">

      <button
        type="button"
        onClick={() =>
          setPaymentMethod("card")
        }
        className={`border rounded-2xl p-5 text-left transition-all ${
          paymentMethod === "card"
            ? "border-amber-500 bg-amber-50"
            : "border-gray-200"
        }`}
      >
        <CreditCard
          size={24}
          className="mb-3"
        />

        <h4 className="font-bold">
          Card Payment
        </h4>

        <p className="text-sm text-gray-500 mt-2">
          Pay securely using
          Khalti / Card
        </p>
      </button>

      <button
        type="button"
        onClick={() =>
          setPaymentMethod(
            "swift_bank_transfer"
          )
        }
        className={`border rounded-2xl p-5 text-left transition-all ${
          paymentMethod ===
          "swift_bank_transfer"
            ? "border-amber-500 bg-amber-50"
            : "border-gray-200"
        }`}
      >
        <Landmark
          size={24}
          className="mb-3"
        />

        <h4 className="font-bold">
          Swift Bank Transfer
        </h4>

        <p className="text-sm text-gray-500 mt-2">
          Upload bank transfer
          slip
        </p>
      </button>
    </div>
  );
}