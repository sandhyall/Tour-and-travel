// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // 🔑 Generate JWT
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: "7d"
//   });
// };

// // ✅ REGISTER
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id, user.role)
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ LOGIN
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id, user.role)
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ GET PROFILE
// export const getProfile = async (req, res) => {
//   res.json(req.user);
// };

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ message: "All fields are required." });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already in use." });

    const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
    });

    return res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ message: "Server error during registration." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid email or password." });

    return res.status(200).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Server error during login." });
  }
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
};