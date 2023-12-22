const { nanoid } = require("nanoid");
// import { nanoid } from "nanoid";

const shortURL = require("../models/urlSchema");

async function handleGenerateURL(req, res) {
  const body = req.body;
  console.log(body);

  if (!body.url) return res.status(400).json({ msg: "url is required" });
  const shortId = nanoid(8);
  await shortURL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await shortURL.findOne({ shortId });
  //   console.log(shortId, result);
  //   return res.json({ msg: "success" });
  return res.json({
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
}

module.exports = {
  handleGenerateURL,
  handleAnalytics,
};
