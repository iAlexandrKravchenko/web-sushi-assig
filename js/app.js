// File path: js/app.js

document.addEventListener("DOMContentLoaded", function() {
  // Инициализация функций при загрузке страницы
  setupItemButtons();
  updateCartTotal();

  // Получаем элементы кнопок "Добавить в корзину"
  const addToCartButtons = document.querySelectorAll('.product button');

  // Обработка событий для каждой кнопки "Добавить в корзину"
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = button.closest('.product');
      const productName = product.querySelector('h2').textContent;
      const productPrice = product.querySelector('p').textContent;
      const productImg = product.querySelector('img').src;

      addToCart(productName, productPrice, productImg);
    });
  });

  // Функция добавления товара в корзину
  function addToCart(name, price, img) {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) {
      console.error('Cart items container not found!');
      return;
    }

    const newItem = document.createElement('div');
    newItem.classList.add('cart-item');
    newItem.innerHTML = `
        <img src="${img}" alt="Sushi" class="cart-item-img">
        <div class="item-info">
            <h3>${name}</h3>
            <p>${price}</p>
        </div>
        <div class="quantity">
            <button>-</button>
            <span>1</span>
            <button>+</button>
        </div>
        <button class="remove-item">Remove</button>
    `;
    cartItems.appendChild(newItem);
    updateCartTotal();
  }

  // Функция обновления общей стоимости корзины
  function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    cartItems.forEach(item => {
      const priceElement = item.querySelector('.item-info p');
      const quantityElement = item.querySelector('.quantity span');
      const price = parseFloat(priceElement.textContent.replace('€', ''));
      const quantity = parseInt(quantityElement.textContent);
      total += price * quantity;
    });
    const totalElement = document.querySelector('.cart-summary span');
    if (totalElement) {
      totalElement.textContent = total.toFixed(2) + ' €';
    } else {
      console.error('Total element not found!');
    }
  }


  // Функция установки обработчиков для кнопок в корзине
  function setupItemButtons() {
    // Удаление товара
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        button.closest('.cart-item').remove();
        updateCartTotal();
      });
    });

    // Изменение количества
    const quantityButtons = document.querySelectorAll('.quantity button');
    quantityButtons.forEach(button => {
      button.addEventListener('click', function() {
        const quantity = button.parentNode.querySelector('span');
        const currentQuantity = parseInt(quantity.textContent);
        if (button.textContent === '+' && currentQuantity < 99) {
          quantity.textContent = currentQuantity + 1;
        } else if (button.textContent === '-' && currentQuantity > 1) {
          quantity.textContent = currentQuantity - 1;
        }
        updateCartTotal();
      });
    });
  }

  // Оформление заказа
  const checkoutButton = document.querySelector('.checkout-btn');
  checkoutButton.addEventListener('click', function() {
    alert('Thank you for your order!');
    // Очистка корзины
    document.querySelector('.cart-items').innerHTML = '';
    updateCartTotal();
  });
});
