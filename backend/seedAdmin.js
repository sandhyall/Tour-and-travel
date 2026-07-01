// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import User from "./models/User.js";

// dotenv.config();

// const run = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     const email = "admin@travel.com";
//     const password = "admin123";

//     const existing = await User.findOne({ email });

//     if (existing) {
//       console.log("Admin already exists");
//       process.exit();
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       name: "Admin",
//       email,
//       password: hashedPassword,
//       role: "admin"
//     });

//     console.log("✅ Admin created successfully");
//     console.log({ email, password });

//     process.exit();

//   } catch (err) {
//     console.log(err.message);
//   }
// };

// run();

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Connected");

    const email = "travelwales@gmail.com";
    const password = "travelwales2026";

    
    const existing = await User.findOne({ email });

    if (existing) {
      console.log(" Admin already exists");
      process.exit(0);
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password:", password);

    process.exit(0);

  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

run();