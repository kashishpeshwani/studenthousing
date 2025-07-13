const jwt = require("jsonwebtoken");
const bcrypt    = require("bcrypt");
const User      = require("../models/User");
const nodemailer= require("nodemailer");

// 🔑 read env vars (ADMIN_EMAIL, EMAIL_USER, EMAIL_PASS come from .env)
require("dotenv").config();

/* ----------------- helper: mail transporter ----------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",                         // use any SMTP provider
  auth: {
    user: process.env.EMAIL_USER,           // e.g. your Gmail address
    pass: process.env.EMAIL_PASS            // app‑password / SMTP key
  }
});

/* ----------------- POST  /api/auth/register ----------------- */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1️⃣  duplicate check
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "Email already exists" });

    // 2️⃣  hash password
    const hash = await bcrypt.hash(password, 10);

    // 3️⃣  save user as NOT verified
    const user = await User.create({
      name,
      email,
      password: hash,
      role,
      verified: false
    });

    // 4️⃣  build verification URL (frontend route)
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${user._id}`;

    // 5️⃣  email the ADMIN, not the user
    await transporter.sendMail({
      from: `"Student‑Rental App" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Verify new ${role}: ${name}`,
      html: `
        <p>A new user just registered:</p>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Role: ${role}</li>
        </ul>
        <p>Click the link below to verify:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
      `
    });

    res.json({ msg: "Signup received! Waiting for admin approval." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ------------- GET  /api/auth/verify/:id  (admin click) ------------- */
exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );

    if (!user) return res.status(404).send("User not found");

    res.send(
      `<h2>User ${user.name} is now verified ✅</h2>
       <a href="${process.env.FRONTEND_URL}/login">Go to login page</a>`
    );
  } catch (err) {
    res.status(500).send("Verification failed");
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User not found" });

    // 2. Check if verified
    if (!user.verified)
      return res.status(401).json({ msg: "Account not verified by admin" });

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid password" });

    // 4. Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Send token + basic user info
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


// What you just wrote 👀
// Hash + save the new user with verified:false.

// Build a verification link pointing to your React route /verify/:id.

// Email that link to a single admin address (ADMIN_EMAIL in .env).

// When the admin clicks, it hits the verifyUser controller which flips verified to true.

