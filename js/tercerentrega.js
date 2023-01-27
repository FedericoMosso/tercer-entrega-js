var products = [
  { id: 1, name: "Merlot Roble", description: "Descripcion 1", price: 850 },
  { id: 2, name: "Corbeau Roble", description: "Descripcion 2", price: 850 },
  { id: 3, name: "Malbec Roble", description: "Descripcion 3", price: 850 },
  { id: 4, name: "Malbec Numerado", description: "Descripcion 4", price: 1100 },
  { id: 5, name: "Blend Prestige", description: "Descripcion 5", price: 1400 },
  { id: 6, name: "Pinot Noir Prestige", description: "Descripcion 6", price: 1400 },
];

var cart = [];
var total = 0;

var addToCartButtons = document.querySelectorAll(".add-to-cart");

for (var i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function () {
    var productId = this.getAttribute("data-product-id");
    addToCart(productId);
  });
}

function addToCart(productId) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      cart.push(products[i]);
      total += products[i].price;
      saveCart();
      displayCart();
      break;
    }
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
  var cartItems = document.querySelector("#cart-items");
  cartItems.innerHTML = "";
  for (var i = 0; i < cart.length; i++) {
    cartItems.innerHTML += "<li>" + cart[i].name + " <button class='remove-from-cart' data-product-id='"+cart[i].id+"'>Remover</button></li>";
  }
  cartItems.innerHTML += "<li>Total: $" + total + " <button class='remove-total'>Remover Total</button></li>";
  var removeButtons = document.querySelectorAll(".remove-from-cart");
  for (var i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function () {
      var productId = this.getAttribute("data-product-id");
      removeFromCart(productId);
    });
  }
  var removeTotalButton = document.querySelector(".remove-total");
  removeTotalButton.addEventListener("click", function(){
    total = 0;
    saveCart();
    displayCart();
  });
}


function removeFromCart(productId) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            total -= cart[i].price;
            cart.splice(i, 1);
            saveCart();
            displayCart();
            break;
        }
    }
}

  // agregar un boton para hacer la compra
  var purchaseButton = document.createElement("button");
  purchaseButton.innerHTML = "Comprar";
  purchaseButton.id = "purchase-button";
  purchaseButton.addEventListener("click", function () {
      makePurchase();
  });
  document.querySelector("#cart").appendChild(purchaseButton);
  
  // funcion para hacer la compra
  function makePurchase() {
      console.log("Compra realizada!");
      cart = [];
      saveCart();
      displayCart();
      cart.length === 0 && console.log("El carrito está vacío!")
  }
  
