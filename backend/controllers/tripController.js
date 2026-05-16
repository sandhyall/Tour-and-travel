import Trip from "../models/Trip.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* =========================
   Cloudinary Upload Helper
========================= */
const uploadBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "trips" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/* =========================
   Safe JSON Parse
========================= */
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
    const data = req.body;

    const slug = slugify(data.title || "trip", {
      lower: true,
      strict: true,
    });

    // HERO IMAGE
    let heroImage = null;

    if (req.files?.featuredImage?.[0]) {
      const result = await uploadBuffer(req.files.featuredImage[0].buffer);

      heroImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // GALLERY IMAGES
    let galleryImages = [];

    if (req.files?.gallery?.length) {
      for (let file of req.files.gallery) {
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
      duration: Number(data.duration) || 0,
      price: Number(data.price) || 0,
      oldPrice: Number(data.oldPrice) || 0,

      overview: data.overview,
      difficulty: data.difficulty,
      activity: data.activity,
      maxAltitude: data.maxAltitude,
      bestSeason: data.bestSeason,
      startPoint: data.startPoint,
      endPoint: data.endPoint,
      meals: data.meals,
      accommodation: data.accommodation,

      slug,

      heroImage, // ✅ MATCHED WITH SCHEMA
      galleryImages, // ✅ MATCHED WITH SCHEMA

      includes: safeParse(data.includes),
      excludes: safeParse(data.excludes),
      highlights: safeParse(data.highlights),
      itinerary: safeParse(data.itinerary),
      faqs: safeParse(data.faqs),
      packingList: safeParse(data.packingList),
    });

    return res.status(201).json(trip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Trip creation failed",
      error: err.message,
    });
  }
};

/* =========================
   GET ALL TRIPS
========================= */
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET BY ID
========================= */
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* =========================
   UPDATE TRIP (FIXED)
========================= */
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // SAFE FIELD UPDATE
    if (req.body.title) trip.title = req.body.title;
    if (req.body.country) trip.country = req.body.country;
    if (req.body.duration) trip.duration = req.body.duration;
    if (req.body.price) trip.price = req.body.price;
    if (req.body.overview) trip.overview = req.body.overview;

    if (req.body.includes) trip.includes = safeParse(req.body.includes);
    if (req.body.excludes) trip.excludes = safeParse(req.body.excludes);
    if (req.body.highlights) trip.highlights = safeParse(req.body.highlights);
    if (req.body.itinerary) trip.itinerary = safeParse(req.body.itinerary);
    if (req.body.faqs) trip.faqs = safeParse(req.body.faqs);

    // SLUG UPDATE
    if (req.body.title) {
      trip.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
      });
    }

    // HERO IMAGE UPDATE
    if (req.files?.featuredImage?.[0]) {
      const result = await uploadBuffer(req.files.featuredImage[0].buffer);

      trip.heroImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // GALLERY UPDATE
    if (req.files?.gallery?.length) {
      const updatedGallery = [];

      for (let file of req.files.gallery) {
        const result = await uploadBuffer(file.buffer);

        updatedGallery.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      trip.galleryImages = updatedGallery;
    }

    await trip.save();

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({
      message: "Update failed",
      error: err.message,
    });
  }
};

/* =========================
   DELETE TRIP
========================= */
export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    await trip.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
/* ==========================================================================
   7. ADD TRIP DATE LOGISTICS
   ========================================================================== */
export const addTripDate = async (req, res) => {
  try {
    const { tripId, date, totalSeats } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Target trip not found" });
    }

    // Push new date object to the array inside schema
    trip.availableDates.push({
      date,
      totalSeats: Number(totalSeats || 0),
    });

    await trip.save();
    return res.status(200).json({
      success: true,
      message: "Logistics date variant added successfully",
      trip,
    });
  } catch (err) {
    console.error("❌ ADD TRIP DATE ERROR:", err);
    return res
      .status(500)
      .json({ message: "Failed to allocate date matrix", error: err.message });
  }
};

export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ slug: req.params.slug });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};