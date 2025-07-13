// const dotenv = require("dotenv");
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");


// dotenv.config();
// console.log("🔍 Loaded MONGO_URI:", process.env.MONGO_URI);

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server running on ${PORT}`));
//   })
//   .catch(err => console.error(err));

//   app.get("/api/ping", async (req, res) => {
//   try {
//     const dbStatus = mongoose.connection.readyState; // 1 = connected
//     res.json({ message: "✅ Backend is working!", db: dbStatus });
//   } catch (err) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });


// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config(); // ✅ must be at top

// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);


// const app = express();
// app.use(cors());
// app.use(express.json());

// console.log("🔍 Loaded MONGO_URI:", process.env.MONGO_URI); // for debugging

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
//   })
//   .catch(err => console.error("❌ DB error:", err));

// app.get("/api/ping", (req, res) => {
//   res.json({ message: "✅ Backend is working!", db: mongoose.connection.readyState });
// });

/**************** 1. IMPORTS ****************/
const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");
const dotenv   = require("dotenv");

/* Route files */
const authRoutes = require("./routes/auth");   // << your /routes/auth.js

/**************** 2. CONFIG ****************/
dotenv.config();   // loads .env variables

/**************** 3. APP INSTANCE ***********/
const app = express();      // << create app BEFORE you call app.use()

/**************** 4. GLOBAL MIDDLEWARE ******/
app.use(cors());
app.use(express.json());    // parses JSON bodies

/**************** 5. ROUTES *****************/
app.use("/api/auth", authRoutes);   // /api/auth/register  etc.

/**************** 6. DATABASE CONNECT + SERVER START *********/
const PORT = process.env.PORT || 5000;

//extra
console.log("MONGO_URI =>", process.env.MONGO_URI);

//extra
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅  MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀  Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌  DB connection error:", err));
