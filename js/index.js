document.addEventListener("DOMContentLoaded", function() {
  const addToCartButtons = document.querySelectorAll('.product button');
  const cartCountSpan = document.querySelector('.cart-count');

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (totalCount > 0) {
      cartCountSpan.textContent = totalCount;
      cartCountSpan.style.display = 'inline-block';
    } else {
      cartCountSpan.style.display = 'none';
    }
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = button.closest('.product');
      const productName = product.querySelector('h2').textContent;
      const productPrice = parseFloat(product.querySelector('p').textContent.replace('€', ''));
      const productImg = product.querySelector('img').src;

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let productExists = cart.find(product => product.name === productName);

      if (productExists) {
        productExists.quantity += 1;
      } else {
        cart.push({ name: productName, price: productPrice, img: productImg, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(productName + " добавлен в корзину!");
    });
  });

  // Инициализируем счетчик при загрузке страницы
  updateCartCount();
});
