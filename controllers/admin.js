const Product = require("../models/product");




exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      prods: products,
      path: "/admin/products",
      editing: true
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Products",
    path: "/admin/add-product",
    editing: false
  });
};



exports.postAddProduct = (req, res, next) => {
  let title = req.body.title;
  let price = Number(req.body.price);
  let imgURL = req.body.imageURL;
  let description = req.body.description;
  const product = new Product(null, title, price, imgURL, description);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findById(prodId, product => {

    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  });
};


exports.postEditProduct = (req, res, next) => {
  prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedimageUrl = req.body.imageURL;
  const updatedDescription = req.body.description;
  const UpdatedProduct = new Product(prodId, updatedTitle, updatedPrice, updatedimageUrl, updatedDescription);
  UpdatedProduct.save();
  res.redirect('/admin/products');

};

exports.postDeleteProduct = (req, res, next) => {
  console.log('Hello World');
  res.redirect("/admin/products");
  //
 
};

