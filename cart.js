// cart.js
// Handles adding, updating, removing items from cart using localStorage

function getCart() {
    return JSON.parse(localStorage.getItem("carWorldCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("carWorldCart", JSON.stringify(cart));
}

function addToCart(button) {
    // Find the closest card container
    let card = button.closest('.car-card') || button.closest('.card');
    
    // Get product details
    let title = card.querySelector('h3') ? card.querySelector('h3').innerText : card.querySelector('.card-title').innerText;
    let imgSrc = card.querySelector('img').src;
    let qtyInput = card.querySelector('.qty-input');
    let quantity = qtyInput ? parseInt(qtyInput.value) : 1;

    let cart = getCart();
    
    // Check if item already in cart
    let existingItemIndex = cart.findIndex(item => item.title === title);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ title, imgSrc, quantity });
    }
    
    saveCart(cart);
    
    alert(title + " added to cart successfully!");
}

function increaseQty(button) {
    let input = button.parentElement.querySelector(".qty-input");
    input.value = parseInt(input.value) + 1;
}

function decreaseQty(button) {
    let input = button.parentElement.querySelector(".qty-input");
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Below functions are for cart.html rendering
function renderCart() {
    let cartContainer = document.getElementById("cart-items-container");
    if (!cartContainer) return; // Not on the cart page

    let cart = getCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h3 style='margin: 40px; color: white;'>Your cart is empty.</h3>";
        return;
    }

    cart.forEach((item, index) => {
        let cardHTML = `
        <div class="car-card">
            <img src="${item.imgSrc}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>Quantity: ${item.quantity}</p>
            <div class="quantity-control" style="border-top: none; padding-top: 0;">
                <button class="qty-btn" onclick="updateCartItemQty(${index}, -1)">−</button>
                <input type="number" class="qty-input" value="${item.quantity}" readonly>
                <button class="qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
            </div>
            <button class="btn" style="background: red; width: 80%; margin: 0 auto 15px; display: block;" onclick="removeCartItem(${index})">Remove</button>
        </div>`;
        cartContainer.innerHTML += cardHTML;
    });
}

function updateCartItemQty(index, change) {
    let cart = getCart();
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        saveCart(cart);
        renderCart();
    }
}

function removeCartItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});
