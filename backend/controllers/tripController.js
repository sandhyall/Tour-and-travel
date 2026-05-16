import Trip from "../models/Trip.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// upload buffer helper
const uploadBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "trips" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// safe JSON parse
const safeParse = (val) => {
  try {
    return typeof val === "string" ? JSON.parse(val) : val || [];
  } catch {
    return [];
  }
};

/* =========================
   CREATE TRIP
========================= */
export const createTrip = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const data = req.body;

    const slug = slugify(data.title || "trip", { lower: true });

    let heroImage = {};
    if (req.files?.heroImage?.[0]) {
      const result = await uploadBuffer(req.files.heroImage[0].buffer);
      heroImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    let galleryImages = [];
    if (req.files?.galleryImages?.length) {
      for (let file of req.files.galleryImages) {
        const result = await uploadBuffer(file.buffer);
        galleryImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

  const trip = await Trip.create({
  title: data.title,

  country: data.country,

  duration: Number(data.duration),

  price: Number(data.price),

  oldPrice: Number(data.oldPrice),

  overview: data.overview,

  difficulty: data.difficulty,

  activity: data.activity,

  maxAltitude: data.maxAltitude,

  bestSeason: data.bestSeason,

  startPoint: data.startPoint,

  endPoint: data.endPoint,

  meals: data.meals,

  accommodation: data.accommodation,

  /* NEW */
  category: data.category,

  equipmentRequired: safeParse(
    data.equipmentRequired
  ),

  slug,

  heroImage,

  galleryImages,

  packages: safeParse(data.packages),

  itinerary: safeParse(data.itinerary),

  includes: safeParse(data.includes),

  excludes: safeParse(data.excludes),

  highlights: safeParse(data.highlights),

  faqs: safeParse(data.faqs),

  packingList: safeParse(data.packingList),

  availableDates: safeParse(
    data.availableDates
  ),
});

    console.log("✅ TRIP CREATED:", trip._id);

    return res.status(201).json(trip);

  } catch (err) {
    console.error("❌ CREATE TRIP ERROR:", err);
    return res.status(500).json({
      message: "Trip creation failed",
      error: err.message
    });
  }
};

/* =========================
   GET ALL TRIPS
========================= */
export const getTrips = async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
};

/* =========================
   GET TRIP BY SLUG
========================= */
export const getTrip = async (req, res) => {
  const trip = await Trip.findOne({ slug: req.params.slug });
  res.json(trip);
};

/* =========================
   GET TRIP BY ID (ONLY ONCE)
========================= */
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE TRIP
========================= */
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    Object.assign(trip, req.body);

   if (req.body.itinerary)
  trip.itinerary =
    safeParse(req.body.itinerary);

if (req.body.packages)
  trip.packages =
    safeParse(req.body.packages);

if (req.body.includes)
  trip.includes =
    safeParse(req.body.includes);

if (req.body.excludes)
  trip.excludes =
    safeParse(req.body.excludes);

if (req.body.highlights)
  trip.highlights =
    safeParse(req.body.highlights);

if (req.body.faqs)
  trip.faqs =
    safeParse(req.body.faqs);

if (req.body.packingList)
  trip.packingList =
    safeParse(req.body.packingList);

/* NEW */
if (req.body.equipmentRequired) {
  trip.equipmentRequired =
    safeParse(
      req.body.equipmentRequired
    );
}

/* NEW */
if (req.body.category) {
  trip.category =
    req.body.category;
}
    // HERO IMAGE UPDATE
    if (req.files?.heroImage?.[0]) {
      const result = await uploadBuffer(req.files.heroImage[0].buffer);

      trip.heroImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // GALLERY UPDATE
    if (req.files?.galleryImages?.length) {
      const gallery = [];

      for (let file of req.files.galleryImages) {
        const result = await uploadBuffer(file.buffer);

        gallery.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      trip.galleryImages = gallery;
    }

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.log("UPDATE TRIP ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   DELETE TRIP
========================= */
export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTripDate =
  async (req, res) => {
    try {
      const {
        tripId,
        date,
        totalSeats,
      } = req.body;

      const trip =
        await Trip.findById(
          tripId
        );

      if (!trip) {
        return res.status(404)
          .json({
            message:
              "Trip not found",
          });
      }

      trip.availableDates.push({
        date,
        totalSeats,
      });
      
      availableDates: JSON.parse(
  req.body.availableDates || "[]"
),

      await trip.save();

      res.json({
        message:
          "Date added successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
