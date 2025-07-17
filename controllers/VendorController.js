const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const vendor = require('../models/Vendor');

dotenv.config();
const secret = process.env.whatsname;

// ✅ Register Controller
const vendorRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
    });

    await newVendor.save();

    console.log("Registered");
    return res.status(201).json({ message: "Vendor registered successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Login Controller
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundVendor = await Vendor.findOne({ email });

    if (!foundVendor) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, foundVendor.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { vendorid: foundVendor._id },
      secret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      vendor: {
        id: foundVendor._id,
        name: foundVendor.name,
        email: foundVendor.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const getallvendors = async(req,res)=>{
    try {
        
        const vendors = await vendor.find().populate('firm');
        res.json({vendors});

    } catch (error) {
        console.log(error);
            return res.status(500).json({ error: "Internal server error" });

    }



}

const getvendorbyid = async(req,res)=>{

    const vendorid = req.params.vendorid;
    console.log("Requested Vendor ID:", vendorid);
    try {
        const vend = await vendor.findById(vendorid).populate('firm');
        if(!vend){
            return res.status(404).json({error:"vendor not found "});

        }
res.status(200).json({vend});


    } catch (error) {
         console.log(error);
            return res.status(500).json({ error: "Internal server error" });

    }
}

module.exports = { vendorRegister, vendorLogin,getallvendors ,getvendorbyid};

