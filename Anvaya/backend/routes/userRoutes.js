const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, updateAvatar } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/avatar", protect, upload.single("avatar"), updateAvatar);

module.exports = router;
