const fs = require("fs");
const path = require("path");
const random_id = require("random-id");

let len = 20;
let pattern = "aA0";

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return;
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Products {
  constructor(title, price, imgURL, description) {
    this.title = title;
    this.price = Number(price);
    this.imgURL = imgURL;
    this.description = description;
  }

  save() {
    this.id = random_id(len, pattern);
    console.log(this.id);
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.splice(id, 1);
      cb(product);
    });
  }
};
