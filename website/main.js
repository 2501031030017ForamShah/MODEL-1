// c:\Foram\MODEL-1\website\main.js

document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
    initScrollToTop();
    renderCart(); // If on cart page
    loadProductDetails(); // If on product detail page
});

function loadComponents() {
    fetch("header.html")
        .then(res => res.text())
        .then(data => {
            const headerEl = document.getElementById("header-placeholder");
            if(headerEl) headerEl.innerHTML = data;
        });

    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            const footerEl = document.getElementById("footer-placeholder");
            if(footerEl) footerEl.innerHTML = data;
        });
}

function initScrollToTop() {
    const btn = document.getElementById("scrollTopBtn");
    if(!btn) return;

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    };

    btn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

// CART LOGIC
function getCart() {
    return JSON.parse(localStorage.getItem("websiteCart")) || [];
}
function saveCart(cart) {
    localStorage.setItem("websiteCart", JSON.stringify(cart));
}



function addToCart(btn) {
    let card = btn.closest(".card");
    let title = card.querySelector(".card-title").innerText;
    let priceText = card.querySelector(".price") ? card.querySelector(".price").innerText : "₹50,000";
    let img = card.querySelector("img").src;
    let quantity = 1;

    let cart = getCart();
    let existing = cart.find(i => i.title === title);
    if(existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ title, price: priceText, img, quantity });
    }
    saveCart(cart);
    alert(title + " added to cart!");
}

function renderCart() {
    let container = document.getElementById("cartItems");
    if(!container) return;

    let cart = getCart();
    container.innerHTML = "";
    
    if(cart.length === 0) {
        container.innerHTML = "<h4 class='text-center'>Your cart is empty.</h4>";
        return;
    }

    let grandTotal = 0;

    cart.forEach((item, index) => {
        let numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''));
        let itemTotal = numericPrice * item.quantity;
        grandTotal += itemTotal;

        container.innerHTML += `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${item.img}" class="img-fluid rounded-start" alt="${item.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text text-muted mb-1">Price: ${item.price}</p>
                            <p class="card-text text-warning h5 mb-3">Subtotal: ₹${itemTotal.toLocaleString('en-IN')}</p>
                            <div class="qty-control justify-content-start">
                                <button class="qty-btn" onclick="updateCartQty(${index}, -1)">-</button>
                                <input type="number" class="qty-input" value="${item.quantity}" readonly>
                                <button class="qty-btn" onclick="updateCartQty(${index}, 1)">+</button>
                            </div>
                            <button class="btn btn-danger" onclick="removeCartItem(${index})">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML += `
        <div class="card p-3 mt-4 text-end">
            <h4 class="text-warning mb-0">Grand Total: ₹${grandTotal.toLocaleString('en-IN')}</h4>
        </div>
    `;
}

function updateCartQty(index, change) {
    let cart = getCart();
    if(cart[index].quantity + change > 0) {
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

// Load More Logic
function loadMore() {
    let hiddenItems = document.querySelectorAll(".extra-item");
    hiddenItems.forEach(item => item.style.display = "block");
    let btn = document.getElementById("loadMoreBtn");
    if(btn) btn.style.display = "none";
}

const carDatabase = {
    "sports": {
        title: "Sports Car GT",
        price: "₹85,000",
        img: "../image/sports_car.jpg",
        desc: "Experience the ultimate thrill with our premium Sports Car GT. Featuring a V8 engine, 0-60 in 3 seconds, and a luxurious leather interior designed for comfort and performance.",
        specs: ["Engine: 4.0L V8", "Horsepower: 600 HP", "Transmission: 8-speed automatic", "Top Speed: 200 mph"]
    },
    "luxury": {
        title: "Luxury Car",
        price: "₹120,000",
        img: "../image/luxurious_car.jpg",
        desc: "Unmatched comfort and a premium experience. Glide through the city in absolute silence and luxury.",
        specs: ["Engine: 6.0L W12", "Horsepower: 500 HP", "Transmission: 9-speed automatic", "Top Speed: 180 mph"]
    },
    "suv": {
        title: "SUV Car",
        price: "₹65,000",
        img: "../image/suv_car.jpg",
        desc: "Powerful performance for every road. Spacious interior with advanced safety features for the whole family.",
        specs: ["Engine: 3.5L V6", "Horsepower: 300 HP", "Transmission: AWD", "Seating: 7 Passengers"]
    },
    "classic": {
        title: "Classic Car",
        price: "₹150,000",
        img: "../image/Classic_car.jpg",
        desc: "A timeless masterpiece. Restored to perfection with original parts and a beautiful vintage finish.",
        specs: ["Engine: 5.0L V8 (Classic)", "Horsepower: 250 HP", "Transmission: 4-speed manual", "Year: 1969"]
    },
    "electric": {
        title: "Electric Car",
        price: "₹90,000",
        img: "../image/Electric_car.jpg",
        desc: "The future is here. Zero emissions, instant torque, and an impressive range to take you further.",
        specs: ["Battery: 100 kWh", "Range: 400 miles", "0-60: 2.5 seconds", "Charging: Fast Charge Supported"]
    },
    "convertible": {
        title: "Convertible Car",
        price: "₹110,000",
        img: "../image/Convertible_car.jpg",
        desc: "Feel the wind in your hair. A stylish convertible perfect for cruising down the coast.",
        specs: ["Engine: 3.0L Turbo", "Horsepower: 400 HP", "Roof: Power Retractable", "Top Speed: 190 mph"]
    }
};

function loadProductDetails() {
    if (!window.location.pathname.includes("prod_detail.html")) return;
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('car') || 'sports'; // default to sports
    const car = carDatabase[carId];
    if (car) {
        let imgEl = document.getElementById("detail-img");
        if(imgEl) imgEl.src = car.img;
        
        let titleEl = document.getElementById("detail-title");
        if(titleEl) titleEl.innerText = car.title;
        
        let priceEl = document.getElementById("detail-price");
        if(priceEl) priceEl.innerText = car.price;
        
        let descEl = document.getElementById("detail-desc");
        if(descEl) descEl.innerText = car.desc;
        
        const specsContainer = document.getElementById("detail-specs");
        if(specsContainer) {
            specsContainer.innerHTML = "";
            car.specs.forEach(spec => {
                specsContainer.innerHTML += `<li>✅ ${spec}</li>`;
            });
        }
    }
}
