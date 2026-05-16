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
    enum: ["available", "full", "closed"],
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

    /* =========================
       NEW CATEGORY FIELD
    ========================= */
    category: {
      type: String,
      enum: [
        "popular",
        "trekking",
        "tour",
        "expedition",
        "peak_climbing",
        "jungle_safari",
        "adventure",
        "cultural",
      ],
      default: "trekking",
    },

    /* =========================
       NEW EQUIPMENT FIELD
    ========================= */
    equipmentRequired: [
      {
        name: String,
        quantity: String,
      },
    ],

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

    availableDates: [availableDateSchema],

    packingList: {
      general: [String],

      upperBody: [String],

      torso: [String],

      lowerBody: [String],

      hands: [String],

      feet: [String],
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
            people: String,

            price: Number,
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

  { timestamps: true }
);

export default mongoose.model(
  "Trip",
  tripSchema
);