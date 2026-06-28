/* ==================================
   HAMBURGER MENU
================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* Close menu when link clicked */
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});

/* ==================================
   DARK MODE
================================== */

const themeToggle =
    document.getElementById("themeToggle");

const body = document.body;

/* Load Saved Theme */
if (localStorage.getItem("theme") === "dark") {

    body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';
    }
});

/* ==================================
   ADD TO CART
================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCounter = document.getElementById("cartCount");

cartCounter.innerText = cart.length;

document.querySelectorAll(".cart-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        e.stopPropagation();

        const card = this.closest(".product-card");

        const product = {

            name: card.querySelector("h3").innerText,

            price: card.querySelector(".price").innerText,

            image: card.querySelector("img").src

        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        cartCounter.innerText = cart.length;

        this.innerHTML = "✔ Added";

        this.style.background = "#16a34a";

        setTimeout(() => {

            this.innerHTML = "Add To Cart";

            this.style.background = "";

        }, 1200);

    });

});
/* ==================================
   SEARCH PRODUCTS
================================== */

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const searchValue =
        searchInput.value.toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const title =
            product.querySelector("h3")
                .textContent
                .toLowerCase();

        if (title.includes(searchValue)) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";
        }
    });

});

/* ==================================
   CATEGORY FILTER
================================== */

const categoryFilter =
    document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", () => {

    const selected =
        categoryFilter.value;

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const category =
            product.dataset.category;

        if (
            selected === "all" ||
            category === selected
        ) {
            product.style.display =
                "block";
        }
        else {
            product.style.display =
                "none";
        }

    });

});

/* ==================================
   PRODUCT DETAILS MODAL
================================== */

const modal =
    document.getElementById("productModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalPrice =
    document.getElementById("modalPrice");

const modalDescription =
    document.getElementById("modalDescription");

const closeModal =
    document.querySelector(".close-modal");

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", function (e) {

        if (e.target.closest(".cart-btn")) {
            return;
        }

        const title = this.querySelector("h3").innerText;
        const price = this.querySelector(".price").innerText;

        modalTitle.innerText = title;
        modalPrice.innerText = price;

        modalDescription.innerText =
            `${title} is one of our premium products. Designed with quality and style.`;

        modal.style.display = "flex";

    });

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", e => {

    if (e.target === modal) {

        modal.style.display = "none";
    }

});
document.getElementById("buyNowBtn").addEventListener("click", function () {

    // Current product details from modal
    const name = document.getElementById("modalTitle").innerText;
    const price = document.getElementById("modalPrice").innerText;

    // Find matching product image
    const card = [...document.querySelectorAll(".product-card")]
        .find(p => p.querySelector("h3").innerText === name);

    const image = card.querySelector("img").src;

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add selected product
    cart.push({
        name,
        price,
        image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    cartCounter.innerText = cart.length;

    // Close product modal
    modal.style.display = "none";

    // Open checkout
    openCheckout();

});

/* ==================================
   BACK TO TOP BUTTON
================================== */

const topBtn =
    document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* ==================================
   CONTACT FORM
================================== */

const contactForm =
    document.querySelector(".contact-form");

contactForm.addEventListener("submit", e => {

    e.preventDefault();

    alert(
        "Thank you! Your message has been sent successfully."
    );

    contactForm.reset();

});

/* ==================================
   NAVBAR SHADOW ON SCROLL
================================== */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.1)";

    } else {

        navbar.style.boxShadow =
            "none";
    }

});

/* ==================================
   HERO BUTTON ANIMATION
================================== */

document.querySelectorAll(
    ".btn-primary,.btn-secondary"
).forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform =
            "translateY(-5px)";
    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform =
            "translateY(0)";
    });

});

/* ==================================
   REVEAL ON SCROLL
================================== */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .category-card, .featured-card, .product-card"
    );

const revealOnScroll = () => {

    revealElements.forEach(el => {

        const position =
            el.getBoundingClientRect().top;

        const screenPos =
            window.innerHeight - 100;

        if (position < screenPos) {

            el.style.opacity = "1";

            el.style.transform =
                "translateY(0)";
        }
    });

};

revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform =
        "translateY(50px)";

    el.style.transition =
        "all .6s ease";
});

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* ==================================
   CATEGORY CARD CLICK FILTER
================================== */

document.querySelectorAll(
    ".category-card"
).forEach(card => {

    card.addEventListener("click", () => {

        const categoryName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        const filterMap = {

            electronics: "electronics",
            fashion: "fashion",
            shoes: "shoes",
            watches: "watch"
        };

        if (filterMap[categoryName]) {

            categoryFilter.value =
                filterMap[categoryName];

            categoryFilter.dispatchEvent(
                new Event("change")
            );

            document
                .getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }

    });

});

/* ==================================
   WELCOME MESSAGE
================================== */

window.addEventListener("load", () => {

    console.log(
        "ShopEase E-Commerce Loaded Successfully 🚀"
    );

});
const checkoutModal = document.getElementById("checkoutModal");
const successModal = document.getElementById("successModal");

function openCheckout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("🛒 Please add at least one product to cart.");
        return;
    }

    checkoutModal.style.display = "flex";
}

document.querySelector(".close-checkout").onclick = () => {

    checkoutModal.style.display = "none";

}

document.getElementById("checkoutForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const email = document.getElementById("customerEmail").value;
    const address = document.getElementById("customerAddress").value;
    const payment = document.getElementById("paymentMethod").value;

    const orderId = "ORD" + Math.floor(Math.random() * 1000000);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    checkoutModal.style.display = "none";
    successModal.style.display = "flex";

    document.getElementById("orderMessage").innerHTML = `
        <strong>🎉 Thank You ${name}</strong><br><br>

        <b>Order ID:</b> ${orderId}<br><br>

        <b>Total Items:</b> ${cart.length}<br><br>

        <b>Phone:</b> ${phone}<br>
        <b>Email:</b> ${email}<br><br>

        <b>Delivery Address:</b><br>
        ${address}<br><br>

        <b>Payment Method:</b> ${payment}<br><br>

        🚚 <b>Estimated Delivery:</b> 2-3 Business Days
    `;

    localStorage.removeItem("cart");

    cart = [];

    cartCounter.innerText = "0";
});
const cartDrawer=document.getElementById("cartDrawer");
const cartItems=document.getElementById("cartItems");

document.querySelector(".cart-icon").addEventListener("click",showCart);

document.getElementById("closeCart").onclick=()=>{

    cartDrawer.classList.remove("active");

};
function closeSuccess() {
    successModal.style.display = "none";
    location.reload();
}
function showCart(){

    let cart=JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML="";

    if(cart.length===0){

        cartItems.innerHTML="<h3 style='padding:20px'>Your Cart is Empty 🛒</h3>";

    }else{

        cart.forEach((item,index)=>{

            cartItems.innerHTML+=`

            <div class="cart-item">

                <img src="${item.image}">

                <div>

                    <h4>${item.name}</h4>

                    <p>${item.price}</p>

                </div>

            </div>

            `;

        });

    }

    cartDrawer.classList.add("active");

}