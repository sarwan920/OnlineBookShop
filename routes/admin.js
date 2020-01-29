const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product for GET method
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product for POST method
router.post("/add-product", adminController.postAddProduct);

router.get("/products", adminController.getProducts);

router.get("/edit-product/:productId",adminController.getEditProduct);

//--> /admin/delete-product
// router.post("/delete-product",adminController.postDeleteProduct);

module.exports = router;
// exports.products = products;
