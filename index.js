const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendorRoutes = require('./Routes/vendorRoutes');
const firmRoutes = require('./Routes/firmRoutes');
const productroutes = require('./Routes/ProductRoutes');

const path = require('path');



const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("DB connection error:", error));

app.use(bodyParser.json());

app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product',productroutes);


app.get('/home', (req, res) => {
  res.send("<h1>Welcome</h1>");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
