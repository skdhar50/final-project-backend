require("express-async-errors");
const error = require("./middlewares/error");
const app = require("express")();

require("./middlewares/")(app);
require("./middlewares/routes")(app);

app.use('/test', (req, res) => {
    res.json({
        "m": "mm",
    })
})

app.use(error);

module.exports = app;
