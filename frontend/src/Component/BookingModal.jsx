import { useState } from "react";

import axios from "../api/axios";

import {
  X,
  Calendar,
  Upload,
} from "lucide-react";

import PaymentMethodCard from "./PaymentMethodCard";

import {
  validateBookingForm,
} from "../utils/validator";

export default function BookingModal({
  trip,
  open,
  onClose,
}) {
  const [loading, setLoading] =
    useState(false);

  const [selectedPackage, setSelectedPackage] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  const [bankSlip, setBankSlip] =
    useState(null);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    buyer: {
      firstName: "",
      lastName: "",
      email: "",
    },

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
  });

  if (!open) return null;

  const updateParticipant = (
    index,
    field,
    value
  ) => {
    const updated = [
      ...form.participants,
    ];

    updated[index][field] = value;

    setForm({
      ...form,
      participants: updated,
    });
  };

  const addParticipant = () => {
    setForm({
      ...form,
      participants: [
        ...form.participants,
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
    });
  };

  const removeParticipant = (
    index
  ) => {
    const updated =
      form.participants.filter(
        (_, i) => i !== index
      );

    setForm({
      ...form,
      participants: updated,
    });
  };

  const selectedPkg =
    trip.packages?.find(
      (p) =>
        p.name === selectedPackage
    );

  const totalPrice =
    (selectedPkg?.price ||
      trip.price ||
      0) *
    form.participants.length;

 const createBooking = async () => {
  try {
    setError("");

    const validationError = validateBookingForm(
      form,
      selectedPackage,
      paymentMethod,
      bankSlip
    );

    if (validationError) {
      return setError(validationError);
    }

    setLoading(true);

  
  const payload = {
  tripId: trip._id,
  buyer: form.buyer,
  participants: form.participants,
  numberOfPeople: form.participants.length,
  travelDate: new Date(form.travelDate).toISOString(),
  paymentMethod,
};
    // 1. CREATE BOOKING
    const { data: booking } = await axios.post(
      "/bookings",
      payload
    );

    const bookingId = booking._id;

    // 2. PAYMENT FLOW
    if (paymentMethod === "card") {
      const { data } = await axios.post(
        "/payments/create-checkout",
        { bookingId }
      );

      window.location.href = data.paymentUrl;
    } else {
      const fd = new FormData();
     fd.append("slip", bankSlip);

      await axios.post(
        `/bookings/${bookingId}/slip`,
        fd,
        {
    headers: {
      "Content-Type": "multipart/form-data",
    },}
      );

      alert(
        "Booking submitted. Admin will verify your payment."
      );

      onClose();
    }
  } catch (err) {
    console.log(err);
    setError(err.response?.data?.message || "Booking failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/70 z-[9999] overflow-y-auto">

      <div className="min-h-screen flex justify-center p-4 py-10">

        <div className="bg-white max-w-6xl w-full rounded-3xl overflow-hidden">

          {/* HEADER */}

          <div className="bg-black text-white px-8 py-6 flex justify-between items-center">

            <div>
              <h2 className="text-3xl font-bold">
                Book Expedition
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Complete your secure booking
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            >
              <X size={20} />
            </button>

          </div>

          <div className="grid lg:grid-cols-3">

            {/* LEFT */}

            <div className="lg:col-span-2 p-8 space-y-8">

              {/* PACKAGE */}

              <div>

                <h3 className="text-xl font-bold mb-4">
                  Select Package
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  {trip.packages?.map(
                    (pkg, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setSelectedPackage(
                            pkg.name
                          )
                        }
                        className={`border rounded-2xl p-5 text-left ${
                          selectedPackage ===
                          pkg.name
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-200"
                        }`}
                      >
                        <h4 className="font-bold text-lg">
                          {pkg.name}
                        </h4>

                        <p className="text-gray-500 text-sm mt-2">
                          {
                            pkg.description
                          }
                        </p>

                        <p className="mt-4 text-2xl font-bold">
                          USD {pkg.price}
                        </p>

                      </button>
                    )
                  )}

                </div>

              </div>

              {/* DATES */}

              <div>

                <h3 className="text-xl font-bold mb-4">
                  Select Date
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  {trip.availableDates?.map(
                    (d, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            travelDate:
                              d.date,
                          })
                        }
                        className={`border rounded-2xl p-4 flex justify-between ${
                          form.travelDate ===
                          d.date
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div>
                          <p className="font-semibold">
                            {d.date}
                          </p>

                          <p className="text-xs text-gray-500">
                            {
                              d.totalSeats
                            } seats
                          </p>
                        </div>

                        <Calendar size={18} />

                      </button>
                    )
                  )}

                </div>

              </div>

              {/* BUYER */}

              <div>

                <h3 className="text-xl font-bold mb-4">
                  Buyer Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <input
                    placeholder="First Name"
                    className="border rounded-xl px-4 py-3"
                    value={
                      form.buyer
                        .firstName
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        buyer: {
                          ...form.buyer,
                          firstName:
                            e.target
                              .value,
                        },
                      })
                    }
                  />

                  <input
                    placeholder="Last Name"
                    className="border rounded-xl px-4 py-3"
                    value={
                      form.buyer
                        .lastName
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        buyer: {
                          ...form.buyer,
                          lastName:
                            e.target
                              .value,
                        },
                      })
                    }
                  />

                </div>

                <input
                  placeholder="Email"
                  className="border rounded-xl px-4 py-3 mt-4 w-full"
                  value={
                    form.buyer.email
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      buyer: {
                        ...form.buyer,
                        email:
                          e.target
                            .value,
                      },
                    })
                  }
                />

              </div>

              {/* PARTICIPANTS */}

              <div>

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-xl font-bold">
                    Travelers
                  </h3>

                  <button
                    type="button"
                    onClick={
                      addParticipant
                    }
                    className="bg-black text-white px-4 py-2 rounded-xl"
                  >
                    Add Traveler
                  </button>

                </div>

                <div className="space-y-6">

                  {form.participants.map(
                    (
                      p,
                      index
                    ) => (
                      <div
                        key={index}
                        className="border rounded-2xl p-5"
                      >

                        <div className="flex justify-between mb-4">

                          <h4 className="font-bold">
                            Traveler {index + 1}
                          </h4>

                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeParticipant(
                                  index
                                )
                              }
                              className="text-red-500"
                            >
                              Remove
                            </button>
                          )}

                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                          {[
                            "firstName",
                            "lastName",
                            "email",
                            "phone",
                            "gender",
                            "dob",
                            "nationality",
                            "passportNumber",
                          ].map(
                            (
                              field
                            ) => (
                              <input
                                key={
                                  field
                                }
                                placeholder={
                                  field
                                }
                                value={
                                  p[
                                    field
                                  ]
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateParticipant(
                                    index,
                                    field,
                                    e
                                      .target
                                      .value
                                  )
                                }
                                className="border rounded-xl px-4 py-3"
                              />
                            )
                          )}

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* PAYMENT */}

              <div>

                <h3 className="text-xl font-bold mb-4">
                  Payment Method
                </h3>

                <PaymentMethodCard
                  paymentMethod={
                    paymentMethod
                  }
                  setPaymentMethod={
                    setPaymentMethod
                  }
                />

                {paymentMethod ===
                  "swift_bank_transfer" && (
                  <div className="mt-6 border border-amber-200 bg-amber-50 rounded-2xl p-5">

                    <h4 className="font-bold">
                      Bank Details
                    </h4>

                    <div className="mt-4 text-sm space-y-2">

                      <p>
                        Bank:
                        Himalayan Bank
                      </p>

                      <p>
                        Account Name:
                        Himalayan Expedition Treks
                      </p>

                      <p>
                        SWIFT:
                        HIMANPKA
                      </p>

                      <p>
                        Account:
                        123456789
                      </p>

                    </div>

                    <div className="mt-5">

                      <label className="block mb-2 text-sm font-medium">
                        Upload Payment Slip
                      </label>

                      <div className="border border-dashed rounded-2xl p-5 bg-white">

                        <input
                          type="file"
                          onChange={(
                            e
                          ) =>
                            setBankSlip(
                              e.target
                                .files[0]
                            )
                          }
                        />

                      </div>

                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-gray-50 border-l p-8">

              <div className="bg-white rounded-3xl border p-6 sticky top-10">

                <h3 className="text-2xl font-bold mb-6">
                  Booking Summary
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span>
                      Package
                    </span>

                    <span className="font-semibold">
                      {selectedPackage ||
                        "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Travelers
                    </span>

                    <span className="font-semibold">
                      {
                        form
                          .participants
                          .length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Date
                    </span>

                    <span className="font-semibold">
                      {form.travelDate ||
                        "-"}
                    </span>
                  </div>

                  <div className="border-t pt-5 flex justify-between items-center">

                    <div>

                      <p className="text-sm text-gray-500">
                        Total
                      </p>

                      <h4 className="text-3xl font-bold">
                        USD{" "}
                        {totalPrice}
                      </h4>

                    </div>

                  </div>

                  {error && (
                    <div className="bg-red-100 text-red-700 text-sm p-4 rounded-xl">
                      {error}
                    </div>
                  )}

                  <button
                    disabled={
                      loading
                    }
                    onClick={
                      createBooking
                    }
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-2xl mt-6"
                  >
                    {loading
                      ? "Processing..."
                      : paymentMethod ===
                        "card"
                      ? "Proceed To Payment"
                      : "Submit Booking"}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}