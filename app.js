const cartContainer = document.getElementById("cart--container");
const cartTotal = document.getElementById("cart--total");
const checkOutBtn = document.getElementById("checkout--btn");

let cartItems = [
  {
    productID: "product-1",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/52/1383311/1.jpg?9191",
    productTitle: "Oraimo 10000mah Power-Bank OPB-P118D",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },
  {
    productID: "product-2",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/46/2541122/1.jpg?1367",
    productTitle: "Oraimo blender",
    productPrice: 4000,
    productQuantity: 1,
    like: false,
  },
  {
    productID: "product-3",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/04/6146232/1.jpg?7334",
    productTitle: "Oraimo clipper",
    productPrice: 2000,
    productQuantity: 1,
    like: false,
  },
  {
    productID: "product-4",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/02/3337132/1.jpg?7745",
    productTitle: "Oraimo cord",
    productPrice: 3000,
    productQuantity: 1,
    like: false,
  },
];
let totalCostOfItemsInCart;

// a fuction to display our cart items
function displayCartItems() {
  // step one map over the products params
  let currencyDisplay = Intl.NumberFormat("en-US");

  cartContainer.innerHTML = cartItems
    .map((item) => {
      const {
        productID,
        productImage,
        productPrice,
        productQuantity,
        productTitle,
      } = item;
      return `<div class="single--product">
        <!-- product image -->
        <img
          src=${productImage}  alt=""
          class="product--image"
        />
        <!-- ----- -->
        <div class="product--information">
          <h3 class="product--title">${productTitle}</h3>

          <p class="product--amount">&#8358; ${currencyDisplay.format(
            productPrice
          )}</p>

          <!-- product quantity -->
          <div><button onclick=decreaseQuantity('${productID}') >-</button> <span>${productQuantity}</span> <button onclick=increaseQuantity('${productID}')>+</button></div>
          <!-- -------------- -->
        <button onclick="removeItemFromCart('${productID}')" class="remove--item">remove</button>

         <button onclick=updateProductLikeness('${productID}') class='like--btn'>
        
           ${
             item.like === true
               ? `<i class="fa-solid fa-heart" style="color: #e10935;"></i>`
               : `<i class="fa-regular fa-heart" style="color: #000000;"></i>`
           }
        
         
         </button>

        </div>
      </div>`;
    })
    .join("");
}
displayCartItems();

// a function to increase the quantity of a particular item
function increaseQuantity(id) {
  cartItems.forEach((item) => {
    if (item.productID === id) {
      item.productQuantity = item.productQuantity + 1;
    }
  });
  displayCartItems();
  calculateCartTotal();
}

// a function to decrease the quantity of a particular item
function decreaseQuantity(id) {
  cartItems.forEach((item) => {
    if (item.productQuantity === 1) {
      return;
    }

    if (item.productID === id) {
      item.productQuantity = item.productQuantity - 1;
    }
  });

  displayCartItems();
  calculateCartTotal();
}

// a funtion for deleting an item from the cart
function removeItemFromCart(id) {
  cartItems = cartItems.filter((item) => item.productID !== id);
  displayCartItems();
  calculateCartTotal();
  return cartItems;
}

// a function to handle calculating the cart total
function calculateCartTotal() {
  totalCostOfItemsInCart = cartItems.reduce((total, value) => {
    return total + value.productQuantity * value.productPrice;
  }, 0);
  cartTotal.textContent = totalCostOfItemsInCart;
}
calculateCartTotal();

// a function to check if a customer likes a product
function updateProductLikeness(id) {
  cartItems.forEach((item) => {
    if (item.productID === id && item.like === false) {
      item.like = true;
    } else if (item.productID === id && item.like === true) {
      item.like = false;
    }
  });
  displayCartItems();
}

// a button to handle procced to checkout with everything the customer wants to buy
checkOutBtn.addEventListener("click", proceedToCheck);
function proceedToCheck(params) {
  console.log(cartItems, totalCostOfItemsInCart);
}
