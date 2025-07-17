const vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.whatsname


const verifyToken = async(req,res,next)=>{

   // const token = req.headers.token;
   
 const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 

    if(!token){
        return res.status(400).json({error:"Token is required "});

    }


    try {
        const decode = jwt.verify(token,secret);
        const vendorf = await vendor.findById(decode.vendorid);
        if(!vendorf){
            return res.status(400).json({error:"vendor not found "});

        }


req.vendorid = vendorf._id;
next();

    } catch (error) {
        return res.status(400).json({error:"Inavlid Token"});


        
    }

}
module.exports= verifyToken;