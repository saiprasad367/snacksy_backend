const express = require('express');
const router = express.Router();
const { upload, addfirm } = require('../controllers/FirmController');
const firmcon = require('../controllers/FirmController');
const verifyToken = require('../middleware/verifyToken');

router.post('/add-firm', verifyToken, upload.single('image'), addfirm);

router.get('/uploads/:imagename', (req,res)=>{
    const imagename = req.params.imagename;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(Path.join(__dirname,'..','uploads',imagename));

});

router.delete('/:firmId',firmcon.delfirm);
module.exports = router;
