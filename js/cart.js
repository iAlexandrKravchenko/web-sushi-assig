document.addEventListener("DOMContentLoaded", function() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const checkoutButton = document.getElementById('checkout-button');
  const orderForm = document.getElementById('order-form');

  function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>${item.price.toFixed(2)} € x ${item.quantity}</p>
        </div>
        <div class="quantity">
          <button class="minus" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="plus" data-index="${index}">+</button>
        </div>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    updateCartTotal();
  }

  function updateCartTotal() {
    let total = 0;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => total += item.price * item.quantity);
    document.querySelector('.cart-summary span').textContent = `${total.toFixed(2)} €`;
  }

  cartItemsContainer.addEventListener('click', function(event) {
    const index = parseInt(event.target.dataset.index);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (event.target.classList.contains('plus')) {
      cart[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCartItems();
    } else if (event.target.classList.contains('minus')) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
      }
    } else if (event.target.classList.contains('remove-item')) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCartItems();
      if (cart.length === 0) {
        checkoutButton.style.display = 'none';
      }
    }
  });

  checkoutButton.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
      orderForm.style.display = 'block';
      checkoutButton.style.display = 'none';
    } else {
      alert("Your cart is empty!");
    }
  });

  orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    console.log('Order placed:', {name, address, phone});
    alert(`Thank you for your order, ${name}! Your items will be sent to ${address}.`);

    localStorage.setItem('cart', JSON.stringify([]));
    cartItemsContainer.innerHTML = '';
    updateCartTotal();
    orderForm.style.display = 'none';
    checkoutButton.style.display = 'block'; // Show checkout button again if needed
  });

  loadCartItems();
});
