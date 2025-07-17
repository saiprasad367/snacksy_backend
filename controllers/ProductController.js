const Product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm');
const path = require('path');
const { error } = require('console');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname( file.originalname));
  }
});
const upload = multer({ storage: storage });



const addproduct = async(req,res)=>{
    try {
        
             console.log("Incoming product POST request");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("Firm ID:", req.params.firmId);
        const {productname , price, category ,bestseller, description }= req.body;
        const image = req.file?req.file.filename :undefined;
        const firmId = req.params.firmId;
        const firmed = await Firm.findById(firmId);
        
        if(!firmed){

            return res.status(404).json({error:"no firm is found "});

        }


        const products = new Product({
            productname, price, category, bestseller , description ,image , firm:firmed._id
        })

        const savedproduct = await products.save();
        firmed.products.push(savedproduct);
        await firmed.save();
        res.status(200).json(savedproduct);


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }



}




const getproduct = async(req,res)=>{
    try {
        
 const firmId = req.params.firmId;
         const firms = await Firm.findById(firmId);
         if(!firms){
            return res.status(404).json({error: " No firm found "});

         }
const restaurant = firms.firmname;




const prod = await Product.find({firm:firmId});
res.status(200).json({restaurant,prod});


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}



const delproduct = async(req,res)=>{

    try {
        
        const productid = req.params.productid;
const deletedproduct = await Product.findByIdAndDelete(productid);
if(!deletedproduct){
    return res.status(404).json({error:"no product found "});

}


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}
module.exports ={ addproduct:[upload.single('image'), addproduct], getproduct,delproduct};