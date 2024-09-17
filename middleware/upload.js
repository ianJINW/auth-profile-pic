const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "uploads/profile-images"); // Save images in this directory
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
	}
});

const upload = multer({ storage });

module.exports = upload;
