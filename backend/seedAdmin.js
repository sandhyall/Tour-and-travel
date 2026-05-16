import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // तपाईँको यही युजर मोडल इन्पोर्ट गरिएको

dotenv.config();

const run = async () => {
  try {
    // १. डेटाबेस कनेक्सन
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📡 Connected to MongoDB...");

    const email = "admin@travel.com";
    const password = "admin123";

    // २. पहिले नै एडमिन छ कि छैन चेक गर्ने
    const existing = await User.findOne({ email });

    if (existing) {
      console.log("⚠️ Admin already exists in the database.");
      process.exit(0);
    }

    // ३. नयाँ एडमिन सिर्जना गर्ने
    // तपाईँको मोडलमा `pre("save")` हुक भएकोले हामीले यहाँ पासवर्ड ह्यास गरिरहनु पर्दैन।
    // मोडलले स्वतः "admin123" लाई ह्यास गरेर डेटाबेसमा राख्छ।
    await User.create({
      name: "Admin User",
      email,
      password, // सिधै प्लेन टेक्स्ट पठाउने, मोडलले आफै ह्यास गर्छ
      role: "admin"
    });

    console.log("✅ Admin account created successfully!");
    console.log("-----------------------------------------");
    console.log(`✉️  Email:    ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log("-----------------------------------------");
    console.log("Now go to your frontend login page and use these credentials.");

    process.exit(0);

  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

run();