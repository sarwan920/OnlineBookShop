const express = require("express");
// const Product=require('../models/product');

// const rootDir = require("../util/path");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:product_id", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.get("/orders", shopController.getOrders);
// router.get("/products",productsController.products);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
