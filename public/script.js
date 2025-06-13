// Cart management
function addToCart(id, title, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, title, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${title} added to cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center text-gray-600">Your cart is empty.</p>';
    checkoutBtn.classList.add('hidden');
    return;
  }

  let total = 0;
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const cartItem = document.createElement('div');
    cartItem.className = 'bg-white p-4 rounded-lg shadow-md flex justify-between items-center';
    cartItem.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold">${item.title}</h3>
        <p class="text-gray-600">₹${item.price} x ${item.quantity}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button onclick="updateQuantity(${item.id}, -1)" class="bg-gray-200 px-2 py-1 rounded">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)" class="bg-gray-200 px-2 py-1 rounded">+</button>
        <button onclick="removeFromCart(${item.id})" class="text-red-500">Remove</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = `Total: ₹${total}`;
  checkoutBtn.classList.remove('hidden');
}

function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
  }
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}
