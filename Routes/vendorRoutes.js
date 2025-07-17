const vendorcontroller = require('../controllers/VendorController');
const express = require('express');

const router = express.Router();

router.post('/register',vendorcontroller.vendorRegister);


router.get('/all-vendors',vendorcontroller.getallvendors);

router.get('/single-vendor/:vendorid',vendorcontroller.getvendorbyid);
router.post('/login',vendorcontroller.vendorLogin);


module.exports=router;
    