const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "../public/tmp/" });

const { ItemController, UploadController } = require("./controllers");

const router = express.Router();

router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

router.post("/upload", upload.single("myfile"), UploadController.upload);

module.exports = router;
