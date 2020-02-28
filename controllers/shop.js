const Product = require("../models/product");
const Cart=require("../models/cart");

//get Main '/' route
exports.getIndex = (req, res, next) => {
  // console.log("Website is online");
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
  const prodID = req.params.productId;
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

  Product.findById(prodId,(product)=>{

    //  let productPrice  = Number(product.price);

    // let x = +product.price;

    // Cart.addProduct(prodId,product.price)
    Cart.addProduct(prodId,product.price);

  });

  res.redirect('/cart');
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
