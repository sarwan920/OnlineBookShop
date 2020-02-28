const fs = require("fs");
const path = require("path");
const random_id = require("random-id");

let len = 20;
let pattern = "aA0";


//path to the file which we are reading data from
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);


//callback function to get all content from file
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return;
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};


//main class for the product
module.exports = class Products {

  //constructer for the class to create main product
  constructor(id, title, price, imgURL, description) {
    this.id = id;
    this.title = title;
    this.price = Number(price);
    this.imgURL = imgURL;
    this.description = description;
  }



  //this methods adds new product to database and updates the details of the product
  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });

      } else {
        this.id = random_id(len, pattern);
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }

    });
  }



  //this methods return all the data into file to display on the page
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }


  //this method is used to find and display specific product details
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id);
      cb(product);
    });
  }

  // static deleteById(id) {
  //   getProductsFromFile(products => {
  //     const product = products.splice(id, 1);
  //     cb(product);
  //   });
  // }
};