import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true, 
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  imageURL: {
    type: String,
  },
  desc: {
    type: String,
  },
  category: {
  type: String,
  required: true,
  trim: true,
},
});
const Product = mongoose.model("Product", productSchema);
export default Product;
