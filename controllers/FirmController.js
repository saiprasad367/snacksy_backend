const Firm = require('../models/Firm');
const vendor = require('../models/Vendor');
const Vendor = require('../models/Vendor');
const multer = require('multer');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Controller function
const addfirm = async (req, res) => {
  try {
    const { firmname, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendorf = await Vendor.findById(req.vendorid);
    if (!vendorf) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const newFirm = new Firm({
      firmname,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendorf._id
    });

   await newFirm.save();
vendorf.firm.push(newFirm._id);
await vendorf.save();

 

    return res.status(200).json({ message: "Firm added successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



const delfirm = async(req,res)=>{

    try {
        
        const firmId = req.params.firmId;
const deletedproduct = await Product.findByIdAndDelete(firmId);
if(!deletedproduct){
    return res.status(404).json({error:"no product found "});

}


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}
module.exports = { upload, addfirm ,delfirm};
