const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const port = 3000;

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes); // this route is regesterd to admin
app.use(shopRoutes); // this is avaiable to all

app.use("/", errorController.getError404);

app.listen(port, () => {
  console.log("App running at port " + port);
});
