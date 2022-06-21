const express = require("express");
const path = require("path");
const cors = require("cors");
const router = require("./router");

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Redirect all requests to the REACT app
app.get("*", (req, res) => {
  if (req.path.includes("public")) {
    const urlpath = req.path.split("/");
    res.sendFile(path.join(__dirname, "..", "public", urlpath[2], urlpath[3]));
  } else {
    res.sendFile(
      path.join(__dirname, "..", "..", "frontend", "dist", "index.html")
    );
  }
});

// ready to export
module.exports = app;
