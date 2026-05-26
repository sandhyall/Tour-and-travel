import React from "react";
import {
  ShieldCheck,
  Calendar,
  CreditCard,
  AlertTriangle,
  Plane,
  Info,
  Mountain,
  Globe,
  FileText,
  CheckCircle2,
} from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-slate-800 font-sans">
      <div className="relative bg-[#2c3338] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <p className="uppercase tracking-[0.3em] text-[#f1b400] text-sm font-bold mb-5">
            Policies & Conditions
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Terms & Conditions
          </h1>

          <p className="max-w-3xl text-lg md:text-xl text-gray-300 leading-relaxed">
            Please carefully read the following booking terms and conditions
            before confirming your adventure with
            <span className="font-bold text-white"> Wales Trek and Travel</span>
            . These policies are designed to ensure transparency, safety, and
            smooth travel experiences across the Himalayas.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-5xl mb-20">
          <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-5">
            Important Information
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
            Booking Policies & Travel Guidelines
          </h2>

          <div className="w-24 h-1 bg-[#f1b400] rounded-full mb-10"></div>

          <div className="space-y-8 text-lg leading-9 text-gray-700">
            <p>
              By booking a trip with
              <span className="font-bold text-black">
                {" "}
                Wales Trek and Travel
              </span>
              , you agree to the terms and conditions outlined below. These
              conditions are designed to protect both travelers and our company
              while maintaining professional service standards.
            </p>

            <p>
              Our trekking and tour programs involve adventure travel in remote
              Himalayan regions where weather conditions, transportation
              schedules, and local circumstances may occasionally affect
              itineraries. We highly recommend that all travelers read these
              policies carefully before making reservations.
            </p>

            <p>
              Wales Trek and Travel reserves the right to modify itineraries,
              accommodations, or transportation when necessary for traveler
              safety, operational requirements, or unforeseen natural
              conditions.
            </p>
          </div>
        </div>

        <section className="mb-20">
          <div className="flex gap-5 p-8 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
            <AlertTriangle className="text-blue-600 shrink-0 mt-1" size={28} />

            <div>
              <h2 className="text-2xl font-black text-blue-900 mb-3">
                Special Travel Notice
              </h2>

              <p className="text-blue-800 leading-8 text-lg">
                In the event of international conflicts, natural disasters,
                pandemics, or government travel restrictions, travelers may
                receive trip credits valid for up to
                <span className="font-bold"> 5 years </span>
                from the original booking date. Please contact our team for
                assistance regarding rescheduling or future travel arrangements.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Calendar className="text-[#f1b400]" size={28} />

            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
              Booking & Payments
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Mountain className="text-[#f1b400]" size={26} />

                <h3 className="text-2xl font-black text-gray-900">
                  Nepal Trips
                </h3>
              </div>

              <ul className="space-y-5 text-gray-700 text-lg leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-600 mt-1 shrink-0"
                    size={20}
                  />
                  <span>
                    A<span className="font-bold"> 30% deposit </span>
                    is required to confirm your booking.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-600 mt-1 shrink-0"
                    size={20}
                  />
                  <span>
                    The remaining balance can be paid upon arrival in Nepal
                    before the trip departure.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <AlertTriangle
                    className="text-red-500 mt-1 shrink-0"
                    size={20}
                  />
                  <span className="font-bold text-red-600">
                    Deposits are non-refundable.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="text-[#f1b400]" size={26} />

                <h3 className="text-2xl font-black text-gray-900">
                  Bhutan & Tibet
                </h3>
              </div>

              <ul className="space-y-5 text-gray-700 text-lg leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-600 mt-1 shrink-0"
                    size={20}
                  />
                  <span>
                    A<span className="font-bold"> 50% deposit </span>
                    is required at the time of booking.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2
                    className="text-green-600 mt-1 shrink-0"
                    size={20}
                  />
                  <span>
                    Full payment must be completed at least
                    <span className="font-bold">
                      {" "}
                      20 days before departure.
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <AlertTriangle
                    className="text-red-500 mt-1 shrink-0"
                    size={20}
                  />
                  <span className="font-bold text-red-600">
                    Deposits are non-refundable.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <ShieldCheck className="text-[#f1b400]" size={28} />

            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
              Cancellation & Refund
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
            <div className="p-8 border-b bg-gray-50">
              <p className="text-lg text-gray-700 italic">
                Cancellation requests must be submitted in writing via email.
              </p>
            </div>

            <table className="w-full">
              <thead className="bg-[#2c3338] text-white">
                <tr>
                  <th className="text-left px-8 py-5 text-sm uppercase tracking-wider">
                    Notice Period
                  </th>

                  <th className="text-right px-8 py-5 text-sm uppercase tracking-wider">
                    Cancellation Charge
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6 text-lg text-gray-700">
                    20+ Days Before Departure (Nepal)
                  </td>

                  <td className="px-8 py-6 text-right font-bold text-gray-900">
                    30% Deposit
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6 text-lg text-gray-700">
                    Less Than 20 Days Before Departure
                  </td>

                  <td className="px-8 py-6 text-right font-black text-red-600">
                    100% Non-Refundable
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-[#f1b400]" size={26} />

              <h3 className="text-2xl font-black text-gray-900">
                Rescheduling Fees
              </h3>
            </div>

            <div className="space-y-5 text-lg text-gray-700">
              <div className="flex justify-between items-center border-b pb-4">
                <span>Nepal Trips</span>

                <span className="font-black text-gray-900">$200 / person</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Bhutan & Tibet</span>

                <span className="font-black text-gray-900">$500 / person</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Plane className="text-[#f1b400]" size={26} />

              <h3 className="text-2xl font-black text-gray-900">
                Flight Delays
              </h3>
            </div>

            <p className="text-lg text-gray-700 leading-9">
              Wales Trek and Travel is not responsible for delays or
              cancellations caused by weather conditions, airport congestion, or
              government regulations. Helicopter charter services may be
              available at the traveler’s own expense depending on weather and
              availability.
            </p>
          </div>
        </section>

        <section className="bg-[#2c3338] rounded-3xl p-10 md:p-16 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="text-[#f1b400]" size={30} />

            <h2 className="text-4xl font-black">Responsibility & Agreement</h2>
          </div>

          <div className="space-y-8 text-lg text-gray-300 leading-9">
            <p>
              By booking with Wales Trek and Travel, travelers confirm that they
              are physically and mentally prepared for the chosen adventure
              activities and understand the risks associated with high-altitude
              travel.
            </p>

            <p>
              We strongly recommend comprehensive travel insurance that covers
              emergency evacuation, medical expenses, trip cancellation, and
              high-altitude trekking activities.
            </p>

            <p>
              Wales Trek and Travel reserves the right to refuse service to any
              traveler whose behavior may endanger the safety or enjoyment of
              others during the trip.
            </p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500 tracking-wide">
            © {new Date().getFullYear()} Wales Trek and Travel. All Rights
            Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;
