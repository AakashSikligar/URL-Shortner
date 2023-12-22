const express = require("express");
const {
  handleGenerateURL,
  handleAnalytics,
} = require("../controllers/urlController");

const router = express.Router();

router.post("/", handleGenerateURL);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
