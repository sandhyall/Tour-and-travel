import Trip from "../models/Trip.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadBuffer = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "trips", ...options },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const safeParse = (val) => {
  try {
    return typeof val === "string" ? JSON.parse(val) : val || [];
  } catch {
    return [];
  }
};

export const createTrip = async (req, res) => {
  try {
    const data = req.body;

    const slug = slugify(data.title || "trip", {
      lower: true,
      strict: true,
    });

    let heroImage = null;
    if (req.files?.featuredImage?.[0]) {
      const result = await uploadBuffer(req.files.featuredImage[0].buffer);
      heroImage = { url: result.secure_url, public_id: result.public_id };
    }

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

    let brochure = null;
    if (req.files?.brochure?.[0]) {
      const result = await uploadBuffer(req.files.brochure[0].buffer, {
        folder: "trips/brochures",
        resource_type: "raw",
      });
      brochure = { url: result.secure_url, public_id: result.public_id };
    }

    let itineraryPdf = null;
    if (req.files?.itineraryPdf?.[0]) {
      const result = await uploadBuffer(req.files.itineraryPdf[0].buffer, {
        folder: "trips/itineraries",
        resource_type: "raw",
      });
      itineraryPdf = { url: result.secure_url, public_id: result.public_id };
    }

    let guidePhoto = null;
    if (req.files?.guidePhoto?.[0]) {
      const result = await uploadBuffer(req.files.guidePhoto[0].buffer, {
        folder: "trips/guides",
      });
      guidePhoto = { url: result.secure_url, public_id: result.public_id };
    }

    let mapImage = null;

    if (req.files?.mapImage?.[0]) {
      const result = await uploadBuffer(req.files.mapImage[0].buffer, {
        folder: "trips/maps",
      });

      mapImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const rawGuideInfo = safeParse(data.guideInfo);
    const guideInfo = {
      name: rawGuideInfo.name || data.guideName || "",
      bio: rawGuideInfo.bio || data.guideBio || "",
      experience: rawGuideInfo.experience || data.guideExperience || "",
      languages: rawGuideInfo.languages || data.guideLanguages || "",
      photo: guidePhoto || rawGuideInfo.photo || null,
    };

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

      categoryType: data.categoryType
        ? data.categoryType.toLowerCase()
        : "standard",
      badge: data.badge === "true" || data.badge === true,

      isBestSeller2026: data.isBestSeller2026 === "true",
      isLuxuryVIP: data.isLuxuryVIP === "true",
      isPeakClimbing: data.isPeakClimbing === "true",
      isShortTrek: data.isShortTrek === "true",
      isBhutanTour: data.isBhutanTour === "true",
      isTibetTour: data.isTibetTour === "true",

      mapImage,
      brochure,
      itineraryPdf,
      guideInfo,

      note: data.note,
      luklaFlightInfo: data.luklaFlightInfo,
      relatedInformation: data.relatedInformation,
      bestTime: data.bestTime,
      whyChoose: data.whyChoose,

      otherEssentials: safeParse(data.otherEssentials),
      optionalItems: safeParse(data.optionalItems),

      availableDates: safeParse(data.availableDates),
      includes: safeParse(data.includes),
      excludes: safeParse(data.excludes),
      highlights: safeParse(data.highlights),
      itinerary: safeParse(data.itinerary),
      faqs: safeParse(data.faqs),
      packingList: safeParse(data.packingList),
      packages: Array.isArray(data.packages)
        ? data.packages
        : safeParse(data.packages),
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

export const getTrips = async (req, res) => {
  try {
    const { category, format, type } = req.query;
    let filterQuery = {};

    if (type) {
      if (type === "popular") {
        filterQuery = { $or: [{ isBestSeller2026: true }, { badge: true }] };
      } else if (
        ["standard", "comfort", "luxury"].includes(type.toLowerCase())
      ) {
        filterQuery.categoryType = type.toLowerCase();
      }
    }

    if (category === "best-sellers") filterQuery.isBestSeller2026 = true;
    if (category === "luxury") filterQuery.isLuxuryVIP = true;
    if (category === "peak-climbing") filterQuery.isPeakClimbing = true;
    if (category === "short-treks") filterQuery.isShortTrek = true;
    if (category === "bhutan-tours") filterQuery.isBhutanTour = true;
    if (category === "tibet-tours") filterQuery.isTibetTour = true;

    const trips = await Trip.find(filterQuery).sort({ createdAt: -1 });

    if (format === "grouped") {
      const groupedPackages = {
        "best-sellers": trips.filter((t) => t.isBestSeller2026),
        luxury: trips.filter((t) => t.isLuxuryVIP),
        "peak-climbing": trips.filter((t) => t.isPeakClimbing),
        "short-treks": trips.filter((t) => t.isShortTrek),
        "bhutan-tours": trips.filter((t) => t.isBhutanTour),
        "tibet-tours": trips.filter((t) => t.isTibetTour),
      };
      return res.status(200).json(groupedPackages);
    }

    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

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

      "note",
      "luklaFlightInfo",
      "relatedInformation",
      "bestTime",
      "whyChoose",
    ];

    textFields.forEach((f) => {
      if (req.body[f] !== undefined) trip[f] = req.body[f];
    });

    ["duration", "price", "oldPrice"].forEach((f) => {
      if (req.body[f] !== undefined) trip[f] = Number(req.body[f]) || 0;
    });

    const boolFields = [
      "isBestSeller2026",
      "isLuxuryVIP",
      "isPeakClimbing",
      "isShortTrek",
      "isBhutanTour",
      "isTibetTour",
      "badge",
    ];
    boolFields.forEach((f) => {
      if (req.body[f] !== undefined) {
        trip[f] = req.body[f] === "true" || req.body[f] === true;
      }
    });

   const parse = (val, defaultValue = {}) => {
  try {
    return typeof val === "string"
      ? JSON.parse(val)
      : val ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

    [
      "includes",
      "excludes",
      "highlights",
      "itinerary",
      "faqs",
      "packages",
      "packingList",
      "availableDates",

      "otherEssentials",
      "optionalItems",
    ].forEach((f) => {
      if (req.body[f] !== undefined) trip[f] = parse(req.body[f]);
    });

    if (req.body.packingList !== undefined) {
  trip.packingList = parse(req.body.packingList, {});
}

    if (req.body.title) {
      trip.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    if (req.files?.featuredImage?.[0]) {
      const result = await uploadBuffer(req.files.featuredImage[0].buffer);
      trip.heroImage = { url: result.secure_url, public_id: result.public_id };
    }

    if (req.files?.gallery?.length) {
      const uploadedGallery = [];
      for (let file of req.files.gallery) {
        const result = await uploadBuffer(file.buffer);
        uploadedGallery.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      trip.galleryImages = [...(trip.galleryImages || []), ...uploadedGallery];
    }

    if (req.files?.brochure?.[0]) {
      const result = await uploadBuffer(req.files.brochure[0].buffer, {
        folder: "trips/brochures",
        resource_type: "raw",
      });
      trip.brochure = { url: result.secure_url, public_id: result.public_id };
    }

    if (req.files?.itineraryPdf?.[0]) {
      const result = await uploadBuffer(req.files.itineraryPdf[0].buffer, {
        folder: "trips/itineraries",
        resource_type: "raw",
      });
      trip.itineraryPdf = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.files?.guidePhoto?.[0]) {
      const result = await uploadBuffer(req.files.guidePhoto[0].buffer, {
        folder: "trips/guides",
      });
      trip.guideInfo = {
        ...trip.guideInfo,
        photo: { url: result.secure_url, public_id: result.public_id },
      };
    }

    if (req.files?.mapImage?.[0]) {
      const result = await uploadBuffer(req.files.mapImage[0].buffer, {
        folder: "trips/maps",
      });

      trip.mapImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.body.guideInfo) {
      const parsedGuide = parse(req.body.guideInfo);
      trip.guideInfo = {
        ...trip.guideInfo,
        name: parsedGuide.name ?? trip.guideInfo?.name ?? "",
        bio: parsedGuide.bio ?? trip.guideInfo?.bio ?? "",
        experience: parsedGuide.experience ?? trip.guideInfo?.experience ?? "",
        languages: parsedGuide.languages ?? trip.guideInfo?.languages ?? "",
      };
    } else {
      const flatGuideFields = {
        guideName: "name",
        guideBio: "bio",
        guideExperience: "experience",
        guideLanguages: "languages",
      };
      Object.entries(flatGuideFields).forEach(([bodyKey, modelKey]) => {
        if (req.body[bodyKey] !== undefined) {
          trip.guideInfo = {
            ...trip.guideInfo,
            [modelKey]: req.body[bodyKey],
          };
        }
      });
    }

    await trip.save();
    return res.status(200).json(trip);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Update failed", error: err.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    await trip.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Trip deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addTripDate = async (req, res) => {
  try {
    const { tripId, date, totalSeats, price, status } = req.body;

    if (!tripId || !date || !totalSeats) {
      return res.status(400).json({
        message: "tripId, date, and totalSeats fields are required",
      });
    }

    const trip = await Trip.findById(tripId);
    if (!trip)
      return res.status(404).json({ message: "Target trip not found" });

    const newDateVariant = {
      date: new Date(date),
      totalSeats: Number(totalSeats),
      bookedSeats: 0,
    };

    if (price !== undefined) newDateVariant.price = Number(price);
    if (status) newDateVariant.status = status;

    trip.availableDates.push(newDateVariant);
    await trip.save();

    return res.status(200).json({
      success: true,
      message: "Date variant added successfully",
      trip,
    });
  } catch (err) {
    console.error("❌ ADD TRIP DATE ERROR:", err);
    return res
      .status(500)
      .json({ message: "Failed to add date", error: err.message });
  }
};

export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ slug: req.params.slug });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
