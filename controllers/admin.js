const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/add-product", {
    pageTitle: "Add Products",
    path: "/admin/add-product"
  });
};

exports.postAddProduct = (req, res, next) => {
  let title = req.body.title;
  let price = req.body.price;
  let imgURL = req.body.imageURL;
  let description=req.body.description;
  const product = new Product(title, price, imgURL,description);
  product.save();
  res.redirect("/");
};



exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      prods: products,
      path: "/admin/products"
    });
  });
};


exports.postDeleteProduct=(req,res,next)=>{
  const prodId=req.params.product_id;
  Product.deleteById(prodId);
  res.redirect("/");
};

