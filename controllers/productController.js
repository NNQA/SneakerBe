import { ObjectId } from "mongoose/index.js";
import Product from "../models/product.js";

export const cteateProduct = async (req, res) => {
  try {
    const { image, name, description, price, color } = req.body;

    const findProduct = await Product.findOne({ name });
    console.log(findProduct);
    if (findProduct) {
      return res.status(401).send({
        status: "failure",
        message: "Product is already exist",
      });
    }
    const newProduct = new Product({
      image,
      name,
      description,
      price,
      color,
    });
    const saveProduct = await newProduct.save().then((r) => {
      console.log(r);
    });

    res.status(200).send({
      status: "Added new product successfully",
      data: {
        product: newProduct,
      },
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const getAllProducts = async (req, res) => {
  const allProducts = await Product.find();

  res.status(200).send({
    status: "Successfully",
    data: {
      allproducts: allProducts,
    },
  });
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send({
        status: "failure",
        message: "Not Found Product",
      });
    }
    res.status(200).send({
      status: "Successfully",
      data: {
        product: product,
      },
    });
  } catch (e) {
    res.status(200).send({
      status: "failure",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { image, name, description, price, color } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      $set: {
        image,
        name,
        description,
        price,
        color,
      },
    });
    if (!product) {
      res.status(404).send({
        status: "failure",
        message: "Not Found Product",
      });
    }
    res.status(200).send({
      status: "Successfully",
      data: {
        product: product,
      },
    });
  } catch (e) {
    res.status(200).send({
      status: "failure",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    res.status(200).send({
      status: "Deleted successfully",
    });
  } catch (e) {
    res.status(200).send({
      status: "failure",
    });
  }
};
