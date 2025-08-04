const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const protectRoute = require("../middleware/authMiddleware");

// ✅ POST /api/properties/add - Landlord adds new property
router.post("/add", protectRoute, async (req, res) => {
  try {
    const { title, description, address, rent, latitude, longitude } = req.body;

    const newProperty = new Property({
      title,
      description,
      address,
      rent,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      postedBy: req.user.id,
    });

    await newProperty.save();
    res.status(201).json({ msg: "Property added successfully", property: newProperty });
  } catch (err) {
    console.error("Add property error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ GET /api/properties/verified - For students (only verified listings)
router.get("/verified", async (req, res) => {
  try {
    const properties = await Property.find({ verified: true });
    res.json(properties);
  } catch (err) {
    console.error("Error fetching verified:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// // ✅ GET /api/properties/unverified - Admin only
// router.get("/unverified", protectRoute, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ msg: "Access denied" });
//     }

//     const unverifiedProperties = await Property.find({ verified: false }).populate("postedBy", "name email");
//     res.json(unverifiedProperties);
//   } catch (err) {
//     console.error("Error fetching unverified properties:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // ✅ PATCH /api/properties/verify/:id - Admin approves listing
// router.patch("/verify/:id", protectRoute, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ msg: "Access denied" });
//     }

//     const property = await Property.findByIdAndUpdate(
//       req.params.id,
//       { verified: true },
//       { new: true }
//     );

//     if (!property) {
//       return res.status(404).json({ msg: "Property not found" });
//     }

//     res.json({ msg: "Property verified", property });
//   } catch (err) {
//     console.error("Error verifying property:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// PATCH /api/properties/verify/:id
router.patch("/verify/:id", protectRoute, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }

  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    if (!property) return res.status(404).json({ msg: "Property not found" });

    res.json({ msg: "Property verified", property });
  } catch (err) {
    console.error("Error verifying property:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ UNVERIFIED PROPERTIES - Admin only
router.get("/unverified", protectRoute, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }

  try {
    const unverified = await Property.find({ verified: false }).populate("postedBy", "name email");
    res.json(unverified);
  } catch (err) {
    console.error("Error fetching unverified:", err);
    res.status(500).json({ msg: "Server error" });
  }
});



module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Property = require("../models/Property");
// const protectRoute = require("../middleware/authMiddleware");

// // POST /api/properties/add
// router.post("/add", protectRoute, async (req, res) => {
//   try {
//     const { title, description, address, rent, latitude, longitude } = req.body;

//     const newProperty = new Property({
//       title,
//       description,
//       address,
//       rent,
//       location: {
//         type: "Point",
//         coordinates: [longitude, latitude],
//       },
//       postedBy: req.user.id,
//     });

//     await newProperty.save();
//     res.status(201).json({ msg: "Property added successfully", property: newProperty });
//   } catch (err) {
//     console.error("Add property error:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // ✅ NEW: GET /api/properties/verified
// router.get("/verified", async (req, res) => {
//   try {
//     const properties = await Property.find({ verified: true });
//     res.json(properties);
//   } catch (err) {
//     console.error("Error fetching properties:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // GET /api/properties/unverified - Admin only
// router.get("/unverified", protectRoute, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ msg: "Access denied" });
//     }

//     const unverifiedProperties = await Property.find({ verified: false }).populate("postedBy", "name email");
//     res.json(unverifiedProperties);
//   } catch (err) {
//     console.error("Error fetching unverified:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });


// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Property = require("../models/Property");
// const protectRoute = require("../middleware/authMiddleware");

// // POST /api/properties/add
// router.post("/add", protectRoute, async (req, res) => {
//   try {
//     const { title, description, address, rent, latitude, longitude } = req.body;

//     const newProperty = new Property({
//       title,
//       description,
//       address,
//       rent,
//       location: {
//         type: "Point",
//         coordinates: [longitude, latitude],
//       },
//       postedBy: req.user.id,
//     });

//     await newProperty.save();
//     res.status(201).json({ msg: "Property added successfully", property: newProperty });
//   } catch (err) {
//     console.error("Add property error:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // GET /api/properties/verified
// router.get("/verified", async (req, res) => {
//   try {
//     const properties = await Property.find({ verified: true });
//     res.json(properties);
//   } catch (err) {
//     console.error("Error fetching properties:", err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;
