const fs = require("fs");

class UploadController {
  static upload = (req, res) => {
    console.log(req.file);
    fs.rename(
      req.file.path,
      `public/images/${req.file.originalname}`,
      (err) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error while uploading");
        } else {
          res.status(203).json({
            msg: "Upload success",
            url: `http://localhost:5000/public/images/${req.file.originalname}`,
          });
        }
      }
    );
  };
}

module.exports = UploadController;
