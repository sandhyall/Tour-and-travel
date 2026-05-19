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
      heroImage,
      galleryImages,

      categoryType: data.categoryType ? data.categoryType.toLowerCase() : "standard",
      badge: data.badge === "true" || data.badge === true,

      // ✅ FIXED: Strings "true"/"false" converted to actual booleans
      isBestSeller2026: data.isBestSeller2026 === "true",
      isLuxuryVIP: data.isLuxuryVIP === "true",
      isPeakClimbing: data.isPeakClimbing === "true",
      isShortTrek: data.isShortTrek === "true",
      isBhutanTour: data.isBhutanTour === "true",

      availableDates: safeParse(data.availableDates),

      includes: safeParse(data.includes),
      excludes: safeParse(data.excludes),
      highlights: safeParse(data.highlights),
      itinerary: safeParse(data.itinerary),
      faqs: safeParse(data.faqs),
      packingList: safeParse(data.packingList),
      packages: safeParse(data.packages),
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
    const { category, format,type } = req.query;
    let filterQuery = {};

    if (type) {
      if (type === "popular") {
        filterQuery = {
          $or: [{ isBestSeller2026: true }, { badge: true }]
        };
      } else if (["standard", "comfort", "luxury"].includes(type.toLowerCase())) {
        filterQuery.categoryType = type.toLowerCase();
      }
    }

    // Frontend category filter mapping
    if (category === "best-sellers") filterQuery.isBestSeller2026 = true;
    if (category === "luxury") filterQuery.isLuxuryVIP = true;
    if (category === "peak-climbing") filterQuery.isPeakClimbing = true;
    if (category === "short-treks") filterQuery.isShortTrek = true;
    if (category === "bhutan-tours") filterQuery.isBhutanTour = true;

    const trips = await Trip.find(filterQuery).sort({ createdAt: -1 });

    // If frontend requests grouped format (for tab-based components)
    if (format === "grouped") {
      const groupedPackages = {
        "best-sellers": trips.filter((t) => t.isBestSeller2026),
        luxury: trips.filter((t) => t.isLuxuryVIP),
        "peak-climbing": trips.filter((t) => t.isPeakClimbing),
        "short-treks": trips.filter((t) => t.isShortTrek),
        "bhutan-tours": trips.filter((t) => t.isBhutanTour),
      };
      return res.status(200).json(groupedPackages);
    }

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
   UPDATE TRIP
========================= */
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    /* ==========================================================================
       1. TEXT FIELDS
       ========================================================================== */
    const textFields = [
      "title",
      "country",
      "overview",
      "difficulty",
      "activity",
      "maxAltitude",
      "bestSeason",
      "startPoint",
      "endPoint",
      "meals",
      "accommodation",
      "categoryType",
    ];

    textFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        trip[field] = req.body[field];
      }
    });

    /* ==========================================================================
       2. NUMBER FIELDS
       ========================================================================== */
    const numberFields = ["duration", "price", "oldPrice"];
    numberFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        trip[field] = Number(req.body[field]) || 0;
      }
    });

    /* ==========================================================================
       3. BOOLEAN CATEGORY FLAGS
       ========================================================================== */
    const booleanCategoryFields = [
      "isBestSeller2026",
      "isLuxuryVIP",
      "isPeakClimbing",
      "isShortTrek",
      "isBhutanTour",
      "badge",
    ];
    booleanCategoryFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        // ✅ Handle both string "true"/"false" from FormData and real booleans from JSON
        trip[field] = req.body[field] === "true" || req.body[field] === true;
      }
    });

    /* ==========================================================================
       4. ARRAY / JSON FIELDS
       ========================================================================== */
    const arrayFields = [
      "includes",
      "excludes",
      "highlights",
      "itinerary",
      "faqs",
      "packages",
      "packingList",
      "availableDates",
    ];

    arrayFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        trip[field] = safeParse(req.body[field]);
      }
    });

    /* ==========================================================================
       5. SLUG UPDATE
       ========================================================================== */
    if (req.body.title) {
      trip.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
      });
    }

    /* ==========================================================================
       6. HERO IMAGE UPDATE
       ========================================================================== */
    if (req.files?.featuredImage?.[0]) {
      const result = await uploadBuffer(req.files.featuredImage[0].buffer);

      trip.heroImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    /* ==========================================================================
       7. GALLERY IMAGES UPDATE
       ========================================================================== */
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

    /* ==========================================================================
       8. SAVE & RESPOND
       ========================================================================== */
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

/* =========================
   ADD TRIP DATE
========================= */
export const addTripDate = async (req, res) => {
  try {
    const { tripId, date, totalSeats, price, status } = req.body;

    if (!tripId || !date || !totalSeats) {
      return res.status(400).json({
        message: "tripId, date, and totalSeats fields are required",
      });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Target trip not found" });
    }

    const newDateVariant = {
      date: new Date(date),
      totalSeats: Number(totalSeats),
      bookedSeats: 0,
    };

    if (price !== undefined) {
      newDateVariant.price = Number(price);
    }

    if (status) {
      newDateVariant.status = status;
    }

    trip.availableDates.push(newDateVariant);
    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Date variant added successfully",
      trip,
    });
  } catch (err) {
    console.error("❌ ADD TRIP DATE ERROR:", err);
    return res.status(500).json({
      message: "Failed to add date",
      error: err.message,
    });
  }
};

/* =========================
   GET BY SLUG
========================= */
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
