const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { sequelize } = require("./models/user");
const userRoutes = require("./routes/auth");
const flash = require("express-flash");

const app = express();

require("./config/passport")(passport);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve uploaded profile images
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", userRoutes);

sequelize.sync().then(() => {
	app.listen(3000, () =>
		console.log("Server started on http://localhost:3000")
	);
});
