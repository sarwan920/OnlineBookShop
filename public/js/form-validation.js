var title = document.getElementById("title");
var price = document.getElementById("price");
var imgURL = document.getElementById("imageURL");
var description = document.getElementById("description");

function validate() {
  if (title.value === "") {
    title.style = "border-left:4px solid red";
    title.focus();
    return false;
  }
  if (price.value === "") {
    price.style = "border-left:4px solid red";
    price.focus();
    return false;
  }
  if (imgURL.value === "") {
    imgURL.style = "border-left:4px solid red";
    imgURL.focus();
    return false;
  }
  if (description.value === "") {
    description.style = "border-left:4px solid red";
    return false;
  }

  return true;
}
