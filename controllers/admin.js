const Product = require("../models/product");



/*this controller is being used to 
extract all products from database
and show them on route /admin/products
*/
exports.getProducts = (req, res, next) => {

  //this method is transfering control to product model to
  //get all products and display them in callback
  Product.fetchAll(products => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      prods: products,
      path: "/admin/products",
      editing: true
    });
  });
};


/*this controller is being used to 
render Add Product page
*/
exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Products",
    path: "/admin/add-product",
    editing: false
  });
};


/**this controller is being 
 * used to POST data 
 * to the server for adding 
 * product into the database  */
exports.postAddProduct = (req, res, next) => {
  let title = req.body.title;
  let price = Number(req.body.price);
  let imgURL = req.body.imageURL;
  let description = req.body.description;

  //creating new Object and Pass All data to the Model
  const product = new Product(null, title, price, imgURL, description);

  //this method is being called to save the product
  product.save()
  .then(()=>{
  return res.redirect('/');

  })
  .catch(err=>{
    console.log(console.log(err))
  });

  //for redirecting to home route
  res.redirect("/");
};


/**this Controller is being used to Edit Product Page 
 * and display product details which we are trying to edit
 */
exports.getEditProduct = (req, res, next) => {

  //we are receiving Query Parameter here from URL
  const editMode = req.query.edit;

  //this method redirects us to the home route 
  //if there isn't edit mode required
  if (!editMode) {
    return res.redirect("/");
  }

  //In here ProdID we are extracting prodId from URL
  const prodId = req.params.productId;

  //This method is being used to find product which 
  //we are trying to edit and send its data to the page
  Product.findById(prodId, product => {

    //this condition checks if we did not find 
    //product than it should redirect it to the home route
    if (!product) {
      return res.redirect("/");
    }

    //Now this renders the Edit Product Page with All details
    //that we want to show on Input Fields and edit
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });

  });
};



/**This Controller is being used to Post Edited Data
 * in the server and update into the Database
 */
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



/**This Controller is Being Used
 * to Delete Product from Database That
 * we no more want into our database
 */
exports.postDeleteProduct = (req, res, next) => {
  prodId = req.body.productId;
  console.log(prodId);
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};