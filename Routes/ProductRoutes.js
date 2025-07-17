const express = require('express');
const productcontroller = require('../controllers/ProductController');

const router = express.Router();

router.post('/add-product/:firmId',productcontroller.addproduct);
router.get('/:firmId/products',productcontroller.getproduct);


router.get('/uploads/:imagename', (req,res)=>{
    const imagename = req.params.imagename;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(Path.join(__dirname,'..','uploads',imagename));

});


router.delete('/:productid',productcontroller.delproduct);
module.exports= router;