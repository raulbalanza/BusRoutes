const express = require("express");
const routes = require("../routes");
const date = require("../modules/date");
const app = express();

routes(app);

app.get('*', function (req, res) {
    res.send('You must call the API with the appropriate parameters.');
});

app.listen(5001, () => {
    console.log(date() + " Server running on port 5001");
});