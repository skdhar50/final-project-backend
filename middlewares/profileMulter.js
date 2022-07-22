const multer = require("multer");
const uuid = require("../utilities/helpers/uuid");
const multerStorage = multer.diskStorage({
	destination: function (req, res, cb) {
		cb(null, "storages/profile");
	},
	filename: function (req, file, cb) {
		const extention = file.mimetype.split("/")[1];
		const fileName = `${uuid()}.${extention}`;

		cb(null, fileName);
	},
});

module.exports = multer({
	storage: multerStorage,
}).single("photo");
