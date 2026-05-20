import { useEffect } from "react";
import {
  useSearchParams,
  Link,
} from "react-router-dom";

import axios from "../api/axios";

export default function PaymentSuccess() {

  const [params] =
    useSearchParams();

  useEffect(() => {

    const confirm =
      async () => {

        try {

          await axios.post(
            "/payments/confirm-payment",
            {
              bookingId:
                params.get(
                  "bookingId"
                ),

              transactionId:
                params.get(
                  "transactionId"
                ),
            }
          );

        } catch (err) {
          console.log(err);
        }
      };

    confirm();

  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl p-10 text-center">

        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">
            ✅
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">
          Payment Successful
        </h1>

        <p className="text-gray-500 mt-4 leading-relaxed">
          Your expedition booking
          has been confirmed.
          Your ticket PDF has been
          sent to your email.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-2xl font-semibold"
        >
          Back To Homepage
        </Link>

      </div>

    </div>
  );
}