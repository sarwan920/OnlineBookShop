

const express = require("express");

// const path = require("path");

// const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product for GET method
router.get("/add-product", adminController.getAddProduct);
// /admin/add-product for POST method
router.post("/add-product", adminController.postAddProduct);

//This Route is being used for Get method to get Data From Databse
router.get("/products", adminController.getProducts);

//This Route is being used to get and display editable Product info on page
router.get("/edit-product/:productId",adminController.getEditProduct)
//post method for Updating Edited Product
router.post("/edit-product",adminController.postEditProduct);

//--> /admin/delete-product --> this method is being used 
//to Post delete Product functionalty
router.post("/delete-product",adminController.postDeleteProduct);

module.exports = router;
// exports.products = products;
