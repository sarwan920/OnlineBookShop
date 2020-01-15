const Product = require("../models/product");

//get Main '/' route
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      pageTitle: "Shop",
      prods: products,
      path: "/"
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      pageTitle: "All Products",
      prods: products,
      path: "/products"
    });
  });
  // res.sendFile(path.join(rootDir,'views','shop.html'));
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.product_id;
  Product.findById(prodID, product => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path:'/products'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart"
  });
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId; 
  console.log(prodId);
  res.redirect("/");
}

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders"
  });
};
