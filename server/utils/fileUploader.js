const express = require("express");
const path = require("path");
const multer = require("multer");

//multer image storage

const userImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/img/users");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const userImageUpload = multer({ storage: userImageStorage });

module.exports = userImageUpload;