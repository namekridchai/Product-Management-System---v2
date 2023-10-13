const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const Product  = require('./product.js')
mongoose.connect('mongodb://127.0.0.1:27017/productDB', {useNewUrlParser: true, useUnifiedTopology: true});

let id = 1
// Middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Middleware for parsing JSON
app.use(express.json());

app.get('/products', async(req, res) => {
    const products = await Product.find();
    if (products.length==0) {
        res.status(404).send('product not found');
      } else {
        res.status(200).send(products);
      }
  });

app.get('/products/:id', async(req, res) => {
     const products = await Product.find({id:req.params.id});
      if (products.length==0) {
        res.status(404).send('product not found');
      } else {
        res.status(200).send(products);
      }
});

app.post('/products', async(req, res) => {
    const newProduct = new Product(req.body);
    newProduct.id = id
    try{
        await newProduct.save();
    }
    catch(err){
        res.status(500).send(err);
    }
    res.status(201).send({...newProduct,id:id}); 
    id++;
  });
app.delete('/products/:id', async(req, res) => {
    
    try{
        await Product.deleteOne({id: req.params.id});
    }
    catch(err){
        res.status(500).send(err);
    }
    res.status(200).send('Deleted successfully');
  });


app.put('/products/:id', async(req, res) => {
    try{
        await Product.updateOne({id: req.params.id}, req.body);
    }
    catch(err){
        res.status(500).send(err);
    }
        res.status(200).send('Updated successfully');
      
  });
  app.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}/`);
  });