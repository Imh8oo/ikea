import GetData from '../utils/getData.js';
import CartButtons from '../utils/cartButtons.js';
import storage from '../storage.js';

const generateCartPage = () => {
  const getData = new GetData();
  const cartList = document.querySelector('.cart-list'),
        cartTotalPrice = document.querySelector('.cart-total-price'),
        cartForm = document.querySelector('.cart-form');
  const cartButtons = new CartButtons(cartList, cartTotalPrice, cartForm);
  let totalPriceValue = 0;

  const renderItems = (items) => {
    if (items.length) {
      items.forEach( ({ id, img: [img], name, description, price, count: countInStock, amount: amountInCart }) => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
          <div class="product">
            <div class="product__image-container">
              <img src=${img} alt="IKEA ${name} ${description}" aria-describedby="aria_product_description_40366083" itemprop="image">
            </div>
            <div class="product__description">
              <h3 class="product__name"><a href="card.html#${id}">${name}</a></h3>
              <p class="product_description-text">${description}</p>
            </div>
            <div class="product__prices">
              <div class="product__price-type product__price-type-regular">
                <div>
                  <div class="product__total product__total-regular">${price * amountInCart}.-</div>
                  <div class="product__price-regular">${price}.-</div>
                </div>
              </div>
            </div>
            <div class="product__controls">
              <div class="product-controls__remove">
                <button type="button" class="btn btn-remove" data-idd=${id}>
                  <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                </button>
              </div>
              <div class="product-controls__quantity">
                <input type="number" value=${amountInCart} data-count=${countInStock} required class="product-controls__input" data-idd=${id} min="0"></input>
              </div>
            </div>
          </div>
        `;

        cartList.append(listItem);
        totalPriceValue += price * amountInCart;
      });
      cartButtons.init();
      cartTotalPrice.textContent = totalPriceValue + '.-';
    } else {
      cartList.textContent = 'Корзина пуста';
    }
  };

  if (location.pathname.includes('cart')) {
    getData.getCartItems(storage.cartlist, renderItems);
  }
};

export default generateCartPage;
