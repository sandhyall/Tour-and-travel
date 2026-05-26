import React from "react";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";

const LegalDocuments = () => {
  const documents = [
    {
      id: 1,
      title: "Company Registration Certificate",
      image: image1,
    },
    {
      id: 2,
      title: "Tourism Operating License",
      image: image2,
    },
    {
      id: 3,
      title: "Government Tax Clearance",
      image: image3,
    },
    {
      id: 4,
      title: "Business Renewal Certificate",
      image: image4,
    },
  ];

  return (
    <div className="bg-[#faf8f3] min-h-screen text-gray-900 font-sans">
      <div className="relative bg-[#2c3338] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <p className="uppercase tracking-[0.3em] text-sm text-[#f1b400] font-bold mb-5">
            Official Documents
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Legal Documents
          </h1>

          <p className="max-w-3xl text-lg md:text-xl text-gray-300 leading-relaxed">
            Wales Trek and Travel is a fully registered and government
            authorized trekking and travel company in Nepal, committed to
            transparency, professionalism, and responsible tourism.
          </p>
        </div>
      </div>
      \
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-5xl mb-20">
          <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-5">
            Trusted Himalayan Travel Company
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
            Your Safety & Trust Matter To Us
          </h2>

          <div className="w-24 h-1 bg-[#f1b400] rounded-full mb-10"></div>

          <div className="space-y-8 text-lg leading-9 text-gray-700">
            <p>
              <span className="font-bold text-black">
                Wales Trek and Travel
              </span>{" "}
              is a legally registered trekking and adventure travel company
              based in Nepal. We are fully authorized by the Government of Nepal
              and operate in compliance with tourism regulations, safety
              standards, and responsible business practices.
            </p>

            <p>
              Our company is committed to providing travelers with safe, secure,
              and reliable trekking and travel experiences across Nepal, Bhutan,
              and Tibet. We strongly believe that transparency and trust are
              essential when planning adventure holidays in the Himalayas.
            </p>

            <p>
              All of our tours, trekking expeditions, and travel services are
              operated under official government approvals, tourism licenses,
              and legal certifications. These documents demonstrate our
              commitment to professionalism, ethical tourism, and quality
              service.
            </p>

            <p>
              We continuously maintain and renew our legal documents, tax
              clearances, tourism licenses, and company registration
              certificates to ensure travelers can confidently book their
              adventures with us.
            </p>

            <p className="font-semibold text-black">
              Below are some of the official legal and government-issued
              documents held by Wales Trek and Travel.
            </p>
          </div>
        </div>

        <div className="mb-14">
          <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-4">
            Government Authorized
          </p>

          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Documents & Certifications
          </h2>

          <div className="w-20 h-1 bg-[#f1b400] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden bg-gray-50 p-5">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100 bg-white">
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 leading-snug">
                  {doc.title}
                </h3>

                <div className="w-14 h-1 bg-[#f1b400] rounded-full mx-auto mt-5"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-[#2c3338] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <p className="uppercase tracking-[0.25em] text-sm text-[#f1b400] font-bold mb-5">
            Travel With Confidence
          </p>

          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Trusted Himalayan Adventures
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-9 mb-10">
            Wales Trek and Travel is dedicated to providing authentic, safe, and
            professionally managed travel experiences across the Himalayas with
            complete transparency and legal compliance.
          </p>

          <button className="bg-[#f1b400] hover:bg-[#dca400] text-black font-black px-10 py-5 rounded-2xl transition-all duration-300 shadow-lg hover:scale-105 uppercase tracking-[0.15em] text-sm">
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalDocuments;
