const router = require("express").Router();
const { register, verifyUser, login } = require("../controllers/authController");

//const { register, verifyUser } = require("../controllers/authController");

router.post("/register", register);
router.get("/verify/:id", verifyUser);
router.post("/login", login); // Add below register route


module.exports = router;
