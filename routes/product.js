import Express from "express";
import {
  cteateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const routeProduct = Express.Router();

routeProduct.post("/products", cteateProduct);

routeProduct
  .get("/products", getAllProducts)
  .get("/products/:id", getProductById);

routeProduct.put("/products/:id", updateProduct);
routeProduct.delete("/products/:id", deleteProduct);
export default routeProduct;
