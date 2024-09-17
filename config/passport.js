const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");

module.exports = function(passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email"
			},
			async (email, password, done) => {
				try {
					const user = await User.findOne({ where: { email } });
					if (!user) {
						return done(null, false, { message: "No user with that email" });
					}

					const isMatch = await bcrypt.compare(password, user.password);
					if (!isMatch) {
						return done(null, false, { message: "Incorrect password" });
					}

					return done(null, user);
				} catch (err) {
					return done(err);
				}
			}
		)
	);

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser(async (id, done) => {
		const user = await User.findByPk(id);
		done(null, user);
	});
};
