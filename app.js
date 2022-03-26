require("express-async-errors");
const app = express()();
const error = require("./middlewares/error");

require("./middlewares/")(app);
require("./middlewares/routes")(app);

app.use(error);

module.exports = app;
