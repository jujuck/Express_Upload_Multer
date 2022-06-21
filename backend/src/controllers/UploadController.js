const fs = require("fs");

class UploadController {
  static upload = (req, res) => {
    console.log(req.file);
    res.send("Upload in progress");
  };
}

module.exports = UploadController;
