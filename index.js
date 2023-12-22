const express = require("express");
const mongoose = require("mongoose");
const urlRouter = require("./routes/urlRoutes");
const URL = require("./models/urlSchema");
const { connectMongoDB } = require("./connection");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log(entry.redirectURL);
  return res.redirect(entry.redirectURL);
  //   res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`connected at Port ${PORT} `));
