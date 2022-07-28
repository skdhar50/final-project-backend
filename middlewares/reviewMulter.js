const multer = require("multer");
const multerStorage = multer.diskStorage({
	destination: function (req, res, cb) {
		cb(null, "public/storage/reviews");
	},
	filename: function (req, file, cb) {
		const extension = file.mimetype.split("/")[1];
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const fileName = `${uniqueSuffix}.${extension}`;

		cb(null, fileName);
	},
});

module.exports = multer({
	storage: multerStorage,
}).array("photos", 5);
