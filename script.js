/*
 * Trendify – Simple Dropshipping Shop
 * This script defines the list of products, renders them on the homepage,
 * manages the cart using localStorage, and updates the cart count in the navbar.
 */

// Define the product catalog
const products = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 29.99,
    description:
      'Kabellose Bluetooth‑Kopfhörer mit hervorragender Klangqualität, ergonomischem Design und langer Akkulaufzeit.',
    // Using a remote placeholder image service to avoid bundling local images
    // Reference the image file located at the repository root. After uploading the
    // image files to GitHub, the images live alongside your HTML and JS files.
    image: 'earbuds.jpg'
  },
  {
    id: 2,
    name: 'Smartwatch',
    price: 49.99,
    description:
      'Multifunktionale Smartwatch mit Fitness‑Tracker, Benachrichtigungen und Herzfrequenzmessung.',
    image: 'smartwatch.jpg'
  },
  {
    id: 3,
    name: 'Portable Blender',
    price: 39.99,
    description:
      'Tragbarer Mixer zum Zubereiten von Smoothies unterwegs – mit USB‑Aufladung und robuster Klinge.',
    image: 'blender.jpg'
  },
  {
    id: 4,
    name: 'Phone Holder',
    price: 9.99,
    description:
      'Universelle Smartphone‑Halterung für Auto, Schreibtisch oder Küche. Stabil und flexibel.',
    image: 'phone-holder.jpg'
  },
  {
    id: 5,
    name: 'Posture Corrector',
    price: 19.99,
    description:
      'Haltungskorrektur‑Gurt zur Unterstützung einer gesunden Rückenhaltung und Linderung von Schmerzen.',
    image: 'posture-corrector.jpg'
  }
];

/**
 * Retrieve the current cart from localStorage. If none exists, return an empty array.
 */
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return Array.isArray(cart) ? cart : [];
  } catch (err) {
    return [];
  }
}

/**
 * Save the given cart array back to localStorage.
 * @param {Array} cart
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Add a product to the cart. If the product already exists, increment its quantity.
 * @param {number} productId
 */
function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  alert('Produkt wurde zum Warenkorb hinzugefügt.');
}

/**
 * Compute and display the total number of items in the cart in the navigation bar.
 */
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartCountElem = document.getElementById('cart-count');
  if (cartCountElem) {
    cartCountElem.textContent = count;
  }
}

/**
 * Render the product catalog on the homepage.
 */
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  products.forEach((product) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4 mb-4';
    col.innerHTML = `
      <div class="product-card h-100">
        <img src="${product.image}" alt="${product.name}" />
        <div class="card-body d-flex flex-column">
          <h5 class="product-title">${product.name}</h5>
          <p class="product-price">€${product.price.toFixed(2)}</p>
          <p class="small flex-grow-1">${product.description}</p>
          <button class="btn btn-primary add-to-cart-btn mt-auto" data-id="${product.id}">In den Warenkorb</button>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
  // Attach event listeners to buttons
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'), 10);
      addToCart(id);
    });
  });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderProducts();
});