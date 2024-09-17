const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const upload = require("../middleware/upload");
const { User } = require("../models/user");
const router = express.Router();

// Registration Route

router.get("/", (req, res) => {
	res.redirect("/login");
});
router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", upload.single("profileImage"), async (req, res) => {
	const { username, email, password } = req.body;

	// Check if email already exists
	const existingUser = await User.findOne({ where: { email } });
	if (existingUser) {
		return res.send("Email already in use");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	let profileImagePath = "/images/default-profile.png";
	if (req.file) {
		profileImagePath = `/uploads/profile-images/${req.file.filename}`;
	}

	let user = await User.create({
		username,
		email,
		password: hashedPassword,
		profileImage: profileImagePath
	});
	console.log(user.profileImage);

	res.redirect("/login");
});

// Login Route
router.get("/login", (req, res) => {
	res.render("login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/profile",
		failureRedirect: "/login",
		failureFlash: true
	})
);

// Profile Route (Protected)
router.get("/profile", isAuthenticated, (req, res) => {
	console.log(req.user.profileImage);

	res.render("profile", { user: req.user });
});

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
