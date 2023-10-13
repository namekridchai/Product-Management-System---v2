const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id:Number,
    name: String,
    category: String,
    price: Number,
    stock: Number
  });
  
  const Product = mongoose.model('Products', productSchema);
  module.exports = Product;