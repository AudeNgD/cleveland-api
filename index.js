const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    setHeaders: (res, path, stat) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("Access-Control-Allow-Headers", "Content-Type");
    },
  })
);

// Endpoint for all the Cleveland artworks that have an image

app.get("/artworks", async (req, res) => {
  try {
    const response = await axios.get(
      "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Internal server error: " + error.message);
  }
});

// Endpoint to handle query parameters for the Cleveland API

app.get("/search", async (req, res) => {
  const queryParams = new URLSearchParams(req.query).toString();
  const url = `https://openaccess-api.clevelandart.org/api/artworks/?${encodeURI(
    queryParams
  )}`;
  console.log(url);
  try {
    const response = await axios.get(
      `https://openaccess-api.clevelandart.org/api/artworks/?${queryParams}`
    );
    //response.data has two keys - info and data
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .send(
        "Internal server error: " +
          (error.response ? error.response.data : error.message)
      );
  }
});

// Endpoint to get the details of a specific artwork
app.get("/artworks/:artworkId", async (req, res) => {
  const { artworkId } = req.params.id;
  try {
    const response = await axios.get(
      `https://openaccess-api.clevelandart.org/api/artworks/${artworkId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Internal server error: " + error.message);
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
