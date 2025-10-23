// ==================================================
// 🛒 Cart & Product Management (Shop Page)
// ==================================================

// Elements
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartBadgeElems = document.querySelectorAll("#cartBadge");
const searchBar = document.getElementById("searchBar");

// Cart state (load from localStorage or initialize)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==================================================
// 🔹 Update Cart Badge
// ==================================================
function updateCartBadge() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  cartBadgeElems.forEach((badge) => {
    badge.textContent = totalQty;
    badge.classList.add("animate");

    setTimeout(() => badge.classList.remove("animate"), 300);
  });
}

// ==================================================
// 🔹 Add Item to Cart
// ==================================================
function addToCart(name, price, img) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      name,
      price: parseFloat(price),
      img,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// Attach event listeners for Add to Cart buttons
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = btn.dataset.price;
    const img = btn.dataset.img;

    addToCart(name, price, img);
  });
});

// Initialize cart badge when page loads
updateCartBadge();

// ==================================================
// 🔹 Product Search (Navbar Search Bar)
// ==================================================
if (searchBar) {
  // Live filter while typing
  searchBar.addEventListener("input", () => {
    filterProducts(searchBar.value.toLowerCase());
  });

  // Press Enter → search (redirect if not on shop page)
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchBar.value.trim().toLowerCase();

      if (!window.location.href.includes("menu.html")) {
        window.location.href = `menu.html?search=${encodeURIComponent(query)}`;
      } else {
        filterProducts(query);
      }
    }
  });
}

// ==================================================
// 🔹 Helper: Filter Products by Name
// ==================================================
function filterProducts(query) {
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const name = product.querySelector("h2").textContent.toLowerCase();
    product.style.display = name.includes(query) ? "block" : "none";
  });
}

// ==================================================
// 🔹 Auto Apply Search if ?search= in URL
// ==================================================
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("search");

if (searchQuery) {
  if (searchBar) searchBar.value = searchQuery;
  filterProducts(searchQuery.toLowerCase());
}
