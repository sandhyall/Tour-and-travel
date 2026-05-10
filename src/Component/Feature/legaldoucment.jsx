import React from "react";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";

const LegalDocuments = () => {
  const documents = [
    {
      id: 1,
      title: "Company Registration",
      image: image1,
    },
    {
      id: 2,
      title: "Tourism License",
      image: image2,
    },
    {
      id: 3,
      title: "Tax Clearance 1",
      image: image3,
    },
    {
      id: 4,
      title: "Tax Clearance 2",
      image: image4,
    },
  ];

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black mb-12 tracking-tight uppercase">
          Legal Document
        </h1>

        <div className="max-w-6xl space-y-8 text-xl leading-relaxed text-gray-700 mb-20">
          <p>
            Tour and Travel the Himalaya is trading name of Ace the Himalaya Trekking Pvt.
            Ltd and Tour and travel the Himalaya Tours and Travels Pvt. Ltd, we are
            committed to ensuring you have a safe and enjoyable holiday;
            therefore all travel arrangements prepared by us are completely
            secure.
          </p>
          <p>
            Ace the Himalaya Trekking Pvt. Ltd and Ace the Himalaya Tours and
            Travels Pvt. Ltd is a well-known government licensed trekking and
            touring company in Nepal. Please find the details of government
            licenses and authorities that Ace the Himalaya holds:
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-10 tracking-tight uppercase">
          Documents From Government Authorities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border border-gray-200 p-2 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer group"
            >
              <div className="aspect-[4/3] overflow-hidden border border-gray-100 bg-gray-50">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalDocuments;
