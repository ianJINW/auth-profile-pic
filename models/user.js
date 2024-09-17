const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite"
});

const User = sequelize.define("User", {
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	profileImage: {
		type: DataTypes.STRING,
		defaultValue: "/images/default-profile.png" // Path to default image
	}
});

module.exports = { sequelize, User };
