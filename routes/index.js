const express = require("express");
const router = express.Router();

const Product = require('../models/product');

router.get("/index",async (req,res,next)=>{
    const products = await Product.find().sort('sorting');
    console.log(products);
    res.render("index",{products:products});
});

router.post("/index/add-product",async (req,res,next)=>{
    const newProduct = new Product(req.body);
    console.log(newProduct);
   await newProduct.save();
    
    res.redirect('/admin/index')
});

router.post('/index/products/ordering',async (req,res)=>{
    const ids = req.body['id[]'];
    console.log(ids);
for(let i=0;i<ids.length;i++){
    console.log(ids[i]);
    const id= ids[i];
   const product =await Product.findById(id);
   console.log("1223");
   console.log(product);
   product.sorting=i;
   await product.save();
}
    res.send('list sorted');
});

module.exports =router;