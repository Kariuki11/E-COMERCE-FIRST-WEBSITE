// index.js

// DOM Elements
const navbar = document.getElementById('navbar');
const cartIcons = document.querySelectorAll('.cart');
const cartCount = document.getElementById('cart-count');

// Cart
let cart = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from local storage
    loadCart();
    
    // Navbar functionality
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add to cart functionality
    cartIcons.forEach(icon => {
        icon.addEventListener('click', addToCart);
    });
});

// Functions
function addToCart(event) {
    const productElement = event.target.closest('.pro');
    const product = {
        name: productElement.querySelector('h5').textContent,
        price: productElement.querySelector('h4').textContent,
        image: productElement.querySelector('img').src,
        quantity: 1
    };

    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push(product);
    }

    saveCart();
    updateCartCount();
    alert('Product added to cart!');
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    cartCount.textContent = cart.reduce((total, product) => total + product.quantity, 0);
}
