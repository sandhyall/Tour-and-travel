import React from "react";
import {
  ShieldCheck,
  Calendar,
  CreditCard,
  AlertTriangle,
  Plane,
  Info,
} from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-6 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            These terms create a legally binding agreement between
            <span className="font-semibold text-slate-900">
              {" "}
              Wales Trek and Travel{" "}
            </span>
            and you. Please review these details carefully before finalizing
            your booking.
          </p>
        </header>

        <div className="space-y-10">
          <section className="flex gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <AlertTriangle className="text-blue-600 shrink-0" size={24} />
            <div>
              <h2 className="font-bold text-blue-900 mb-1">
                Middle East Conflict Extension
              </h2>
              <p className="text-sm text-blue-800">
                Impacted clients may use trip credits **anytime up to 5 years**
                from the original booking date. Contact our team via email for
                adjustments.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-slate-400" size={20} />
              <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900">
                Booking & Payments
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2 border-b pb-1">
                  Nepal Trips
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• 30% deposit required.</li>
                  <li className="font-bold text-red-600">
                    • DEPOSIT IS NON-REFUNDABLE.
                  </li>
                  <li>• Balance due upon arrival in Nepal.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-2 border-b pb-1">
                  Bhutan & Tibet
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• 50% deposit required.</li>
                  <li className="font-bold text-red-600">
                    • DEPOSIT IS NON-REFUNDABLE.
                  </li>
                  <li>• Balance due 20 days before departure.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-slate-400" size={20} />
              <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900">
                Cancellation & Refund
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-4 italic">
              Notice of cancellation must be provided in writing via email.
            </p>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-3 text-left font-semibold">
                      Notice Period
                    </th>
                    <th className="p-3 text-right font-semibold">Charge</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3 text-slate-600">20+ Days (Nepal)</td>
                    <td className="p-3 text-right font-medium">
                      30% (Deposit)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-600">
                      Less than 20 Days (Nepal)
                    </td>
                    <td className="p-3 text-right font-bold text-red-600">
                      100% (No Refund)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-10 pt-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="text-slate-400" size={18} />
                <h3 className="font-bold text-slate-900 uppercase text-sm tracking-widest">
                  Rescheduling
                </h3>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Nepal</span>{" "}
                  <span className="font-bold text-slate-900">
                    $200 / person
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bhutan & Tibet</span>{" "}
                  <span className="font-bold text-slate-900">
                    $500 / person
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Plane className="text-slate-400" size={18} />
                <h3 className="font-bold text-slate-900 uppercase text-sm tracking-widest">
                  Flight Delays
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are not responsible for weather-related delays. Chartered
                helicopters (approx. **$550 one way**) are at the client's
                expense.
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t text-center text-slate-400 text-xs">
          <p>
            © {new Date().getFullYear()} Wales Trek and Travel. All Rights
            Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;
