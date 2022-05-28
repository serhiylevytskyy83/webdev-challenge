const Router = require('express');
const uploadFile = require('./uploadFile');
const router = Router();

const multer = require('multer');
const upload = multer({ dest: "/tmp" });


router.post('/upload', upload.single("selectedFile"), uploadFile);

module.exports = router;
