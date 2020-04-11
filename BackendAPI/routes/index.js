const express = require("express");
const controller = require("../controllers");
const router = express.Router();

router.get("/stop_list", controller.getStopList);
router.get("/stop/:stopId", controller.getStopInfo);
router.get("/line/:lineId", controller.getLineInfo);
router.get("/bus/:busLine", controller.getLinePosition);

module.exports = (app) => {

    app.use("/", router);

};