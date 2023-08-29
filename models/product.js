import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  price: {
    type: String,
  },
  color: {
    type: String,
  },
});
const Product = mongoose.model("User", productSchema);
export default Product;
