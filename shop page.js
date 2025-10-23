<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shop — Kira's Bloom Craft</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    /* --- Product Card Styling --- */
    .shop-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
      padding: 2rem;
    }
    .product-card {
      background: #fff8f5;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      width: 220px;
      text-align: center;
      padding: 1rem;
    }
    .product-card img {
      width: 100%;
      border-radius: 12px;
    }
    .product-info h2 {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
    .product-info p {
      color: #ff6b81;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .add-to-cart-btn {
      background: #ff6b81;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }
    .add-to-cart-btn:hover {
      background: #ff4757;
    }
    .navbar ul li a.active {
      color: #ff6b81;
      font-weight: bold;
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar">
    <h1>Kira's Bloom Craft</h1>
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="menu.html">Shop</a></li>
      <li><a href="cart.html">Cart <span id="cartBadge">0</span></a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="tracking.html">Order Tracking</a></li>
      <li><a href="customerservice.html">Customer Service</a></li>
    </ul>
    <div class="nav-search">
      <input type="text" id="searchBar" placeholder="🔍 Search products...">
    </div>
  </nav>

  <!-- Shop Products -->
  <section class="shop-container" id="shopContainer"></section>

  <!-- Footer -->
  <footer>
    &copy; 2025 Kira's Bloom Craft. All Rights Reserved.
  </footer>

  <!-- JS -->
  <script>
    // ===== Navbar Active Link =====
    const navbarLinks = document.querySelectorAll('.navbar ul li a');
    const currentPage = window.location.pathname.split("/").pop();
    navbarLinks.forEach(link => {
      if(link.getAttribute('href') === currentPage){
        link.classList.add('active');
      }
    });

    // ===== Cart Badge =====
    const cartBadge = document.getElementById('cartBadge');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function updateCartBadge() {
      const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
      cartBadge.textContent = totalQty;
    }
    updateCartBadge();

    // ===== Products =====
    const products = [
      {id: 101, name: "Pastel Petals", price: 500, img: "pastel-petals.jpg"},
      {id: 102, name: "Mini Sunshine", price: 150, img: "mini-sunshine.jpg"},
      {id: 103, name: "Purple Kiss", price: 350, img: "purple-kiss.jpg"},
      {id: 104, name: "Mini Blush Daisy", price: 150, img: "mini-blush-daisy.jpg"},
      {id: 105, name: "Café Blossom", price: 550, img: "cafe-blossom.jpg"},
      {id: 106, name: "Pure", price: 400, img: "pure.jpg"},
      {id: 107, name: "Crimson Grace", price: 500, img: "crimson-grace.jpg"},
      {id: 108, name: "Golden One", price: 100, img: "golden-one.jpg"},
      {id: 109, name: "Sapphire Skies", price: 800, img: "sapphire-skies.jpg"},
      {id: 110, name: "Rapunzel's Flower", price: 1000, img: "rapunzels-flower.jpg"},
      {id: 111, name: "Blush Bouquet", price: 1000, img: "blush-bouquet.jpg"},
      {id: 112, name: "Red Romance", price: 600, img: "red-romance.jpg"},
      {id: 113, name: "Sunrise", price: 500, img: "sunrise.jpg"},
      {id: 114, name: "Ocean Bloom", price: 400, img: "ocean-bloom.jpg"},
      {id: 115, name: "Mini Blue Daisy", price: 100, img: "mini-blue-daisy.jpg"},
      {id: 116, name: "Mini Purple Daisy", price: 100, img: "mini-purple-daisy.jpg"},
      {id: 117, name: "Mini Mint Daisy", price: 100, img: "mini-mint-daisy.jpg"},
      {id: 118, name: "Little Scarlet", price: 150, img: "little-scarlet.jpg"},
      {id: 119, name: "Tangerine Dream", price: 150, img: "tangerine-dream.jpg"},
      {id: 120, name: "Rosé Kiss", price: 350, img: "rose-kiss.jpg"},
      {id: 121, name: "Rainbow Mini Daisy", price: 150, img: "rainbow-mini-daisy.jpg"},
      {id: 122, name: "Roséra", price: 500, img: "rosera.jpg"},
      {id: 123, name: "Garden", price: 1000, img: "garden.jpg"}
    ];

    const shopContainer = document.getElementById('shopContainer');

    // ===== Render Products =====
    function renderProducts(productsToRender) {
      shopContainer.innerHTML = '';
      productsToRender.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
          <img src="images/${prod.img}" alt="${prod.name}">
          <div class="product-info">
            <h2>${prod.name}</h2>
            <p>₱${prod.price.toFixed(2)}</p>
            <button class="add-to-cart-btn"
                    data-id="${prod.id}"
                    data-name="${prod.name}"
                    data-price="${prod.price}"
                    data-img="${prod.img}">
              Add to Cart
            </button>
          </div>
        `;
        shopContainer.appendChild(card);
      });

      // Add to Cart Event
      document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          const name = btn.dataset.name;
          const price = parseFloat(btn.dataset.price);
          const img = btn.dataset.img;

          let existing = cart.find(item => item.id === id);
          if(existing){
            existing.qty += 1;
          } else {
            cart.push({id, name, price, img, qty: 1});
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartBadge();
          alert(`✅ Added "${name}" to cart`);
        });
      });
    }

    renderProducts(products);

    // ===== Search Filter (Accent-Insensitive) =====
    const searchBar = document.getElementById('searchBar');

    function normalizeText(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    searchBar.addEventListener('input', (e) => {
      const query = normalizeText(e.target.value.trim());
      const filtered = products.filter(p => normalizeText(p.name).includes(query));

      if(filtered.length > 0){
        renderProducts(filtered);
      } else {
        shopContainer.innerHTML = `<p style="text-align:center; font-weight:bold; color:#ff6b81;">😢 No products found for "${e.target.value}"</p>`;
      }
    });
  </script>
</body>
</html>
