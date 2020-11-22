import GetData from '../utils/getData.js';
const getData = new GetData();
import settings from '../settings.js';
import storage from '../storage.js';
import { goodsPageBtns } from '../utils/goodsButtons.js';

export default class GoodsPage {
  constructor(pageTitleSelector, goodsWrapperSelector) {
    this.pageTitleNode = document.querySelector(pageTitleSelector);
    this.goodsWrapperNode = document.querySelector(goodsWrapperSelector);
  };

  state = {
    searchProp: '',
    searchValue: '',
    items: [],
  };

  _pageTitleTextContents = {
    cat: '',
    subcat: '',
    wishlist: 'Список желаний',
    s: 'Поиск: ',
    getTitle(searchProp, searchValue = '') {
      return this[searchProp] + searchValue;
    }
  };

  onPageMounted = (searchProp, searchValue) => {
    this.state = {
      searchProp,
      searchValue,
    };
  };

  onItemsLoaded = () => {
    this.render();
    goodsPageBtns();
  };

  loadItems = async (searchProp, searchValue) => {
    this.onPageMounted(searchProp, searchValue);
    this.pageTitleNode.textContent =
      this._pageTitleTextContents.getTitle(this.state.searchProp, this.state.searchValue);
      console.log('this.state.searchValue: ', this.state.searchProp);

    switch (this.state.searchProp) {
      case 's':
        this.state.items = await getData.getItemsByName(this.state.searchValue);
        break;
      case 'wishlist':
        this.state.items = await getData.getItemsById(storage.wishlist);
        break;
      case 'cat':
        this.state.items = await getData.getItemsByCategory(this.state.searchProp, this.state.searchValue);
        break;
      case 'subcat':
        this.state.items = await getData.getItemsByCategory(this.state.searchProp, this.state.searchValue);
        break;
    }

    this.onItemsLoaded();
  };

  render() {
    if (this.state.items.length) {
      this.state.items.forEach( ({ id, img: [img, secondImg], name: itemName, description, price, count }) => {
        const item = document.createElement('li');
        item.classList.add('goods-list__item');
        item.innerHTML = `
          <a class="goods-item__link" href="card.html#${id}">
            <article class="goods-item">
              <div class="goods-item__img">
                <img src=${img} ${secondImg ? 'data-second-image=' + secondImg : ''} alt="ФАБЛЕР БЬЁРН">
              </div>
              ${ count >= settings.itemIsNewStockCount ? '<p class="goods-item__new">Новинка</p>' : ''}
              ${ !count ? '<p class="goods-item__new">Нет в наличии</p>' : ''}
              <h3 class="goods-item__header">${itemName}</h3>
              <p class="goods-item__description">${description}</p>
              <p class="goods-item__price">
                <span class="goods-item__price-value">${price}</span>
                <span class="goods-item__currency"> ₽</span>
              </p>
              ${ count ? '<button class="btn btn-add-card" aria-label="Добравить в корзину" data-count=' + count + ' data-idd=' + id + '></button>'
                : '<button class="btn btn-add-card__disabled" disabled aria-label="Нет в наличии" data-count=' + count + ' data-idd=' + id + '></button>'}
            </article>
          </a>
        `;
        this.goodsWrapperNode.append(item);
      });
    } else {
      this.goodsWrapperNode.textContent = 'Ничего не найдено';
    }
  };
}
