// const fs = require("fs");
// const path = require("path");
// const random_id = require("random-id");

const db = require('../util/database');

const Cart = require("./cart");

//callback function to get all content from file


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

    return db.execute('INSERT INTO products(title,price,imageUrl,description) VALUES ( ? , ? , ? , ? )' ,
      [this.title,this.price,this.imgURL,this.description]
    );
  }



  //this methods return all the data into file to display on the page
  static fetchAll() {
   return db.execute('SELECT * FROM products');
  }


  //this method is used to find and display specific product details
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
  }


  //this method recives product id of a product that you want to delete and will will delete it
  static deleteById(id) {
    return db.execute('DELETE FROM products where products.id=?',[id]);
  }


};