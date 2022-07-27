require("dotenv/config");
const app = require("./app");
const mongoose = require("mongoose");

global.__basedir = __dirname;

const port = process.env.PORT || 3001;

mongoose
	.connect(process.env.MONGODB_LOCAL_SERVER_URL)
	.then(() => console.log("Connected to MongoDB server!!"))
	.catch(() => console.error("ERROR connecting to MongoDB server!"));

app.listen(port, () => console.log("Listen on port " + port));
