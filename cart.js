<script>
// =======================
// Cart Management Script
// =======================

// Load cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartList = document.getElementById("cartList");
const cartBadge = document.getElementById("cartBadge");
const subtotalVal = document.getElementById("subtotalVal");
const taxVal = document.getElementById("taxVal");
const deliveryVal = document.getElementById("deliveryVal");
const totalVal = document.getElementById("totalVal");

// =======================
// Render Cart Items
// =======================
function renderCart() {
  cartList.innerHTML = "";
  
  if(cart.length === 0) {
    cartList.innerHTML = `<p>Your cart is empty.</p>`;
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="images/${item.img}" alt="${item.name}" />
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>₱${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-qty">
          <input type="number" min="1" value="${item.qty}" onchange="updateQty(${index}, this.value)" />
        </div>
        <button class="cart-item-remove" onclick="removeItem(${index})">Remove</button>
      `;
      cartList.appendChild(div);
    });
  }

  updateSummary();
}

// =======================
// Update Quantity
// =======================
function updateQty(index, qty) {
  const validQty = Math.max(1, parseInt(qty, 10) || 1);
  cart[index].qty = validQty;
  saveCart();
  renderCart();
}

// =======================
// Remove Item
// =======================
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// =======================
// Calculate Totals
// =======================
function calculateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.12;
  const delivery = subtotal > 0 ? 50 : 0;
  const total = subtotal + tax + delivery;

  return { subtotal, tax, delivery, total };
}

// =======================
// Update Summary UI
// =======================
function updateSummary() {
  const { subtotal, tax, delivery, total } = calculateSummary();
  
  subtotalVal.textContent = `₱${subtotal.toFixed(2)}`;
  taxVal.textContent = `₱${tax.toFixed(2)}`;
  deliveryVal.textContent = `₱${delivery.toFixed(2)}`;
  totalVal.textContent = `₱${total.toFixed(2)}`;
  
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.textContent = totalQty;
}

// =======================
// Save Cart
// =======================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =======================
// Place Order
// =======================
function placeOrder() {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const paymentMethodElem = document.querySelector('input[name="payment"]:checked');
  const paymentMethod = paymentMethodElem ? paymentMethodElem.value : "COD";

  const { subtotal, tax, delivery, total } = calculateSummary();

  const order = {
    id: Date.now(),
    items: [...cart],
    subtotal,
    tax,
    delivery,
    total,
    paymentMethod,
    status: paymentMethod === "COD" ? "Pending" : "Waiting for Payment",
    createdAt: new Date().toLocaleString()
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  cart = [];
  saveCart();
  renderCart();

  alert(`Order placed successfully! Payment Method: ${paymentMethod}`);
  window.location.href = `tracking.html?id=${order.id}`;
}

// =======================
// Add to Cart (call from product page)
// =======================
function addToCart(product) {
  // Check if product already in cart
  const index = cart.findIndex(item => item.name === product.name);
  if(index !== -1) {
    cart[index].qty += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      img: product.img,
      qty: 1
    });
  }

  saveCart();
  renderCart();
  alert(`${product.name} added to cart!`);
}

// =======================
// Initialize
// =======================
renderCart();
</script>
