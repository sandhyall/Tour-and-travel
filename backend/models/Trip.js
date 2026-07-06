import mongoose from "mongoose";

const availableDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },

  totalSeats: {
    type: Number,
    required: true,
  },

  bookedSeats: {
    type: Number,
    default: 0,
  },

  price: Number,

  status: {
    type: String,
    enum: ["available", "full", "closed", "limited", "sold-out"],
    default: "available",
  },
});

const tripSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,

    country: {
      type: String,
      enum: ["Nepal", "Bhutan", "Tibet"],
      required: true,
    },

    heroImage: {
      url: String,
      public_id: String,
    },

    galleryImages: [
      {
        url: String,
        public_id: String,
      },
    ],

    overview: String,

    difficulty: String,
    activity: String,
    maxAltitude: String,
    bestSeason: String,
    startPoint: String,
    endPoint: String,
    meals: String,
    accommodation: String,

    duration: Number,
    price: Number,
    oldPrice: Number,

    categoryType: {
      type: String,
      enum: ["standard", "comfort", "luxury"],
      default: "standard",
    },

    badge: {
      type: Boolean,
      default: false,
    },

    isBestSeller2026: {
      type: Boolean,
      default: false,
    },

    isLuxuryVIP: {
      type: Boolean,
      default: false,
    },

    isPeakClimbing: {
      type: Boolean,
      default: false,
    },

    isShortTrek: {
      type: Boolean,
      default: false,
    },

    isBhutanTour: {
      type: Boolean,
      default: false,
    },

    isTibetTour: {
      type: Boolean,
      default: false,
    },

    // Map Image
    mapImage: {
      url: String,
      public_id: String,
    },

    // ✅ NEW: Downloadable brochure PDF (Cloudinary URL)
    brochure: {
      url: String,
      public_id: String,
    },

    itineraryPdf: {
      url: String,
      public_id: String,
    },

    guideInfo: {
      name: { type: String, default: "" },
      bio: { type: String, default: "" },
      experience: { type: String, default: "" },
      languages: { type: String, default: "" },
      photo: {
        url: String,
        public_id: String,
      },
    },

    // ===================== Extra Trek Information =====================

    note: {
      type: String,
      default: "",
    },

    luklaFlightInfo: {
      type: String,
      default: "",
    },

    relatedInformation: {
      type: String,
      default: "",
    },

    bestTime: {
      type: String,
      default: "",
    },

    whyChoose: {
      type: String,
      default: "",
    },

    otherEssentials: [String],

    optionalItems: [String],

    availableDates: [availableDateSchema],
    packingList: {
      general: [String],
      upperBody: [String],
      torso: [String],
      lowerBody: [String],
      hands: [String],
      feet: [String],
      undergarments: [String],
      otherEssentials: [String],
      optionalItems: [String],
    },

    highlights: [String],
    includes: [String],
    excludes: [String],

    packages: [
      {
        name: String,
        price: Number,
        oldPrice: Number,
        description: String,

        groupPricing: [
          {
            minPax: { type: Number, default: 1 },
            maxPax: { type: Number, default: 1 },
            pricePerPax: { type: Number, default: 0 },
          },
        ],
      },
    ],

    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
        altitude: String,
        meals: String,
        accommodation: String,
      },
    ],

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Trip", tripSchema);
