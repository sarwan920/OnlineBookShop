const Product = require("../models/product");
const Cart = require("../models/cart");

//get Main '/' route
exports.getIndex = (req, res, next) => {
  // console.log("Website is online");
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        pageTitle: "Shop",
        prods: rows,
        path: "/"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render("shop/product-list",{
      pageTitle:"Products",
      prods:rows,
      path:'/products'
    });
  })
  .catch(err=>{
    console.log(err);
  });
  // res.sendFile(path.join(rootDir,'views','shop.html'));
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.findById(prodID, product => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push[{
            productData: product,
            qty: cartProductData.qty
          }];
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts
      });
    });

  });

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId, (product) => {

    //  let productPrice  = Number(product.price);

    // let x = +product.price;

    // Cart.addProduct(prodId,product.price)
    Cart.addProduct(prodId, product.price);

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