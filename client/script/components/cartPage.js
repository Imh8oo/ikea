import GetData from '../utils/getData.js';
const getData = new GetData();
import storage from '../storage.js';
import CartButtons from '../utils/cartButtons.js';

export default class CartPage {
  constructor(cartListSelector, cartTotalPriceSelector, cartFormSelector) {
    this.cartListNode = document.querySelector(cartListSelector);
    this.cartTotalPriceNode = document.querySelector(cartTotalPriceSelector);
    this.cartFormNode = document.querySelector(cartFormSelector);
    this.cartButtons = new CartButtons(this.cartListNode, this.cartTotalPriceNode, this.cartFormNode);
  };

  state = {
    totalPriceValue: 0,
    items: [],
  };

  getItemIds = () => {
    let idsArray = [];
    storage.cartlist.forEach( item => idsArray.push(item.id));
    return idsArray;
  };

  checkItemCount = () => {
    this.state.items.forEach( item => {
      storage.cartlist.find( storageItem => {
        if (storageItem.id === item.id) {
          (storageItem.count <= item.count) ? (item.amount = storageItem.count) : (item.amount = item.count)
        }
      });
    });
  };

  onItemsLoaded = () => {
    this.checkItemCount();
    this.render();
  };

  loadItems = async () => {
    const idsArray = this.getItemIds();
    this.state.items = await getData.getItemsById(idsArray);
    this.onItemsLoaded();
  };

  render = () => {
    if (this.state.items.length) {
      this.state.items.forEach( ({ id, img: [img], name: itemName, description, price, count: countInStock, amount: amountInCart }) => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
          <div class="product">
            <div class="product__image-container">
              <img src=${img} alt="IKEA ${itemName} ${description}" aria-describedby="aria_product_description_40366083" itemprop="image">
            </div>
            <div class="product__description">
              <h3 class="product__name"><a href="card.html#${id}">${itemName}</a></h3>
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

        this.cartListNode.append(listItem);
        this.state.totalPriceValue += price * amountInCart;
      });
      this.cartButtons.init();
      this.cartTotalPriceNode.textContent = this.state.totalPriceValue + '.-';
    } else {
      this.cartListNode.textContent = 'Корзина пуста';
    }
  };
};
