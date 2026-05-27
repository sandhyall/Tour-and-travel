import { useEffect, useState } from "react";
import axios from "../api/axios";
import { X, Plus, Trash2 } from "lucide-react";
import PaymentMethodCard from "./PaymentMethodCard";
import { validateBookingForm } from "../utils/validator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_TEMPLATE = {
  buyer: { firstName: "", lastName: "", email: "" },
  participants: [
    {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      dob: "",
      phone: "",
      nationality: "",
      passportNumber: "",
    },
  ],
  travelDate: "",
};

const BANK_DETAILS = {
  bankName: "Himalayan Bank Ltd.",
  accountName: "Ace Travel Pvt. Ltd.",
  accountNumber: "0123456789012345",
  swiftCode: "HIMANPKA",
  branch: "Thamel Branch, Kathmandu",
};

// FIX 4: Format ISO date string to a readable label for display
const formatDate = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BookingModal({ trip, open, onClose }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [bankSlip, setBankSlip] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() =>
    JSON.parse(JSON.stringify(INITIAL_FORM_TEMPLATE))
  );

  const getAuthHeader = (additionalHeaders = {}) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...additionalHeaders,
      },
    };
  };

// In BookingModal.jsx, update your useEffect dependency array:
useEffect(() => {
  if (open) {
    setForm(JSON.parse(JSON.stringify(INITIAL_FORM_TEMPLATE)));
    setSelectedPackage(trip.packages?.[0] || null);
    setPaymentMethod("card");
    setBankSlip(null);
    setError("");
  }
// Use the ID instead of the whole object
}, [open, trip?._id]);

  if (!open) return null;

  const totalPrice =
    (Number(selectedPackage?.price) || Number(trip.price) || 0) *
    form.participants.length;

  const updateBuyer = (field, value) => {
    setForm((prev) => ({ ...prev, buyer: { ...prev.buyer, [field]: value } }));
  };

  const updateParticipant = (index, field, value) => {
    const updated = form.participants.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setForm((prev) => ({ ...prev, participants: updated }));
  };

  const addParticipant = () => {
    setForm((prev) => ({
      ...prev,
      participants: [
        ...prev.participants,
        {
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          dob: "",
          phone: "",
          nationality: "",
          passportNumber: "",
        },
      ],
    }));
  };

  const removeParticipant = (index) => {
    setForm((prev) => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
    }));
  };

  // ==================== SUBMIT LOGIC ====================
 const createBooking = async () => {
    setError("");
    const validationError = validateBookingForm(form, selectedPackage, paymentMethod, bankSlip);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        tripId: trip._id,
        buyer: form.buyer,
        participants: form.participants,
        numberOfPeople: form.participants.length,
        travelDate: form.travelDate,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
      };

      const { data } = await axios.post("/bookings", payload, getAuthHeader());
      const bookingId = data._id;

      if (paymentMethod === "card") {
        const { data: payData } = await axios.post("/payments/card/checkout", { bookingId });
        window.location.href = payData.paymentUrl;
      } else {
        const fd = new FormData();
        fd.append("slip", bankSlip);
        await axios.post(`/bookings/${bookingId}/slip`, fd, getAuthHeader());
        toast.success("Booking submitted!");
        navigate(`/booking-success?bookingId=${bookingId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[9999] overflow-y-auto">
      <div className="min-h-screen flex justify-center p-4 py-10">
        <div className="bg-white max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-black text-white px-8 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Book Expedition</h2>
              <p className="text-gray-400 text-sm mt-1">
                Complete your secure booking
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-2 p-8 space-y-8">
              {/* Packages */}
              <div>
                <h3 className="text-xl font-bold mb-4">Select Package</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {trip.packages?.map((pkg, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`border rounded-2xl p-5 text-left transition-all ${
                        selectedPackage?.name === pkg.name
                          ? "border-emerald-500 bg-emerald-50/70 shadow-sm"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <h4 className="font-bold text-slate-900">{pkg.name}</h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {pkg.description}
                      </p>
                      <p className="text-xl font-black mt-3 text-slate-900">
                        USD {pkg.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Buyer Info */}
              <div>
                <h3 className="text-xl font-bold mb-4">Buyer Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    placeholder="First Name"
                    value={form.buyer.firstName}
                    onChange={(e) => updateBuyer("firstName", e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors"
                  />
                  <input
                    placeholder="Last Name"
                    value={form.buyer.lastName}
                    onChange={(e) => updateBuyer("lastName", e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <input
                  placeholder="Email"
                  type="email"
                  value={form.buyer.email}
                  onChange={(e) => updateBuyer("email", e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-3 mt-4 w-full outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Participants */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="text-xl font-bold">Travelers / Participants</h3>
                  <button
                    type="button"
                    onClick={addParticipant}
                    className="flex items-center gap-1 text-sm font-bold bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
                  >
                    <Plus size={16} /> Add Traveler
                  </button>
                </div>

                {form.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-5 rounded-2xl bg-gray-50/50 space-y-4 relative"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Traveler #{index + 1}
                      </span>
                      {form.participants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeParticipant(index)}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        placeholder="First Name"
                        value={participant.firstName}
                        onChange={(e) =>
                          updateParticipant(index, "firstName", e.target.value)
                        }
                        className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
                      />
                      <input
                        placeholder="Last Name"
                        value={participant.lastName}
                        onChange={(e) =>
                          updateParticipant(index, "lastName", e.target.value)
                        }
                        className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
                      />
                      <input
                        placeholder="Email"
                        type="email"
                        value={participant.email}
                        onChange={(e) =>
                          updateParticipant(index, "email", e.target.value)
                        }
                        className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
                      />
                      <input
                        placeholder="Phone Number"
                        value={participant.phone}
                        onChange={(e) =>
                          updateParticipant(index, "phone", e.target.value)
                        }
                        className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <select
                        value={participant.gender}
                        onChange={(e) =>
                          updateParticipant(index, "gender", e.target.value)
                        }
                        className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 text-gray-600 transition-colors"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <input
                        type="date"
                        value={participant.dob}
                        onChange={(e) =>
                          updateParticipant(index, "dob", e.target.value)
                        }
                        className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 w-full outline-none focus:border-emerald-500 text-gray-600 transition-colors"
                      />
                      <input
                        placeholder="Nationality"
                        value={participant.nationality}
                        onChange={(e) =>
                          updateParticipant(index, "nationality", e.target.value)
                        }
                        className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <input
                      placeholder="Passport / ID Number"
                      value={participant.passportNumber}
                      onChange={(e) =>
                        updateParticipant(index, "passportNumber", e.target.value)
                      }
                      className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 w-full outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* Travel Dates */}
              <div>
                <h3 className="text-xl font-bold mb-4">Select Date</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {trip.availableDates?.map((d, i) => {
                    // FIX 6: Show remaining seats, not total seats
                    const seatsLeft = d.totalSeats - (d.bookedSeats || 0);
                    const isFull = seatsLeft <= 0 || d.status === "full";
                    const isSelected = form.travelDate === d.date;

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={isFull}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, travelDate: d.date }))
                        }
                        className={`border rounded-2xl p-4 text-left transition-all ${
                          isFull
                            ? "opacity-40 cursor-not-allowed border-gray-100 bg-gray-50"
                            : isSelected
                            ? "border-emerald-500 bg-emerald-50 shadow-sm"
                            : "hover:bg-gray-50 border-gray-200"
                        }`}
                      >
                        {/* FIX 4: Render a human-readable date, not raw ISO string */}
                        <p className="font-bold text-slate-800">
                          {formatDate(d.date)}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            isFull
                              ? "text-red-400 font-semibold"
                              : seatsLeft <= 5
                              ? "text-emerald-500 font-semibold"
                              : "text-gray-400"
                          }`}
                        >
                          {isFull
                            ? "Fully booked"
                            : `${seatsLeft} seat${seatsLeft !== 1 ? "s" : ""} remaining`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                <PaymentMethodCard
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />

                {paymentMethod === "card" && (
                  <div className="mt-4 border border-emerald-200 bg-emerald-50/40 rounded-xl p-5 text-sm text-emerald-900 flex flex-col gap-1.5">
                    <p className="font-semibold">✓ Online Gateway Checkout Selected</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Clicking <strong>"Confirm & Book Now"</strong> will open a
                      secure merchant terminal to finalize your transaction via
                      Khalti, eSewa, or Card.
                    </p>
                  </div>
                )}

                {/* FIX 1: Single bank slip block (was duplicated) */}
                {paymentMethod === "swift_bank_transfer" && (
  <div className="mt-4 space-y-4">
    
    {/* BANK DETAILS CARD */}
    <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-5">
      <h4 className="font-bold text-emerald-900 mb-3">
        Bank Transfer Details
      </h4>

      <div className="text-sm text-gray-700 space-y-2">
        <p>
          <span className="font-semibold">Bank Name:</span> {BANK_DETAILS.bankName}
        </p>
        <p>
          <span className="font-semibold">Account Name:</span> {BANK_DETAILS.accountName}
        </p>
        <p>
          <span className="font-semibold">Account Number:</span> {BANK_DETAILS.accountNumber}
        </p>
        <p>
          <span className="font-semibold">SWIFT Code:</span> {BANK_DETAILS.swiftCode}
        </p>
        <p>
          <span className="font-semibold">Branch:</span> {BANK_DETAILS.branch}
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Please upload your payment receipt after completing the transfer.
      </p>
    </div>

    {/* UPLOAD SLIP */}
    <div className="border border-dashed border-gray-300 rounded-xl p-5 bg-gray-50/50">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Upload Bank Transfer Slip / Receipt
      </label>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setBankSlip(e.target.files?.[0] || null)}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
      />

      {bankSlip ? (
        <p className="text-xs text-emerald-600 mt-2 font-medium">
          ✓ Selected: {bankSlip.name}
        </p>
      ) : (
        <p className="text-xs text-gray-400 mt-2">
          Accepted formats: JPG, PNG, PDF
        </p>
      )}
    </div>
  </div>
)}
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="bg-gray-50/50 p-8 lg:border-l border-gray-200">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm sticky top-6">
                <h3 className="text-2xl font-bold mb-6">Summary</h3>
                <div className="space-y-4 text-gray-500 pb-5 border-b border-gray-100 text-sm">
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span className="font-bold text-slate-900">
                      {selectedPackage?.name || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travelers:</span>
                    <span className="font-bold text-slate-900">
                      {form.participants.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departure:</span>
                    <span className="font-bold text-slate-900">
                      {/* FIX 4: Human-readable date in summary too */}
                      {formatDate(form.travelDate) || "-"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <span className="text-gray-400 text-sm font-medium">
                    Total Price
                  </span>
                  <h2 className="text-3xl font-black text-slate-900">
                    USD {totalPrice.toLocaleString()}
                  </h2>
                </div>

                {error && (
                  <p className="text-red-600 text-xs mt-5 bg-red-50 p-3 rounded-xl border border-red-100">
                    {error}
                  </p>
                )}

                <button
                  onClick={createBooking}
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 transition-all py-3.5 mt-6 rounded-xl font-bold text-white shadow-sm flex items-center justify-center gap-2"
                >
                  {loading ? "Processing transaction..." : "Confirm & Book Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}