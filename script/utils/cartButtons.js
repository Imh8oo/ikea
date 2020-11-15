import storage from '../storage.js';
import generateCartPage from '../domElements/generateCartPage.js';

export default class CartButtons {
  constructor(goodsWrapperDiv, totalPriceDiv) {
    this.goodsWrapperDiv = goodsWrapperDiv;
    this.totalPriceDiv = totalPriceDiv;
  }

  updateStorage = (id, newCount, maxStockCount) => {
    const itemInCartCount = storage.getСartlistItemById(id).count;
    if (newCount > itemInCartCount && itemInCartCount < maxStockCount) {
      storage.increaseСartlistItemCount(id);
    }
    if (newCount === 0) {
      storage.removeItemFromCartlist(id);
      return;
    }
    if (newCount < itemInCartCount && itemInCartCount > 0) {
      storage.reduceСartlistItemCount(id);
      return;
    }
  }

  updateItemPrice = (target, count) => {
    const itemParentNode = target.closest('.product');
    //Вот тут хрень, переделать надо потом
    const itemPrice = itemParentNode.querySelector('.product__price-regular').textContent.split('.-')[0];
    const itemTotalPrice = itemParentNode.querySelector('.product__total');
    itemTotalPrice.textContent = +itemPrice * count + '.-';
  }

  updateTotalPrice = (id, target, newCount) => {
    const prevTotalPrice = this.totalPriceDiv.textContent.split('.-')[0],
          itemInCartCount = storage.getСartlistItemById(id).count,
          itemParentNode = target.closest('.product'),
          itemPrice = itemParentNode.querySelector('.product__price-regular').textContent.split('.-')[0];
    let newTotalPrice = 0;
    if (newCount > itemInCartCount) {
      newTotalPrice = +prevTotalPrice + +itemPrice;
    } else {
      newTotalPrice = +prevTotalPrice - +itemPrice;
    }
    this.totalPriceDiv.textContent = +newTotalPrice + '.-';
  }

  onInputAmountChanged = (e) => {
    const target = e.target.closest('input');
    const id = target.dataset.idd;
    const newCountValue = target.value;
    this.updateStorage(id, newCountValue, target.dataset.count);
    this.updateItemPrice(target, newCountValue);
    this.updateTotalPrice(id, target, newCountValue);
  }

  removeItemFromCart = (e) => {
    const target = e.target.closest('button');
    if (target) {
      e.preventDefault();
      const id = target.dataset.idd;
      this.updateStorage(id, 0);
      this.goodsWrapperDiv.innerHTML = '';
      this.goodsWrapperDiv.removeEventListener('input', this.onInputAmountChanged);
      this.goodsWrapperDiv.removeEventListener('click', this.removeItemFromCart);
      generateCartPage();
    }
  }
  
  init = () => {
    this.goodsWrapperDiv.addEventListener('input', this.onInputAmountChanged);
    this.goodsWrapperDiv.addEventListener('click', this.removeItemFromCart);
  }
}
