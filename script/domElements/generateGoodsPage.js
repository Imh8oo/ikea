import GetData from '../utils/getData.js';
import settings from '../settings.js';
import storage from '../storage.js';
import { goodsPageBtns } from '../utils/goodsButtons.js';

const generateGoodsPage = () => {
  const getData = new GetData();
  const mainHeader = document.querySelector('.main-header'),
        goodsList = document.querySelector('.goods-list');

  const renderItems = (items) => {
    if (items.length) {
      items.forEach( ({ id, img: [img, secondImg], name, description, price, count }) => {
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
              <h3 class="goods-item__header">${name}</h3>
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
        goodsList.append(item);
      });
      goodsPageBtns();
    } else {
      goodsList.textContent = 'Ничего не найдено';
    }
  }

  if (location.pathname.includes('goods') && location.search) {
    const searchStr = decodeURI(location.search),
          searchValue = searchStr.split('=')[1],
          prop = searchStr.split('=')[0].substring(1);

    if (prop === 's') {
      mainHeader.textContent = `Поиск: ${searchValue}`;
      getData.getItemsByName(searchValue, renderItems);
    } else if (prop === 'wishlist') {
      mainHeader.textContent = 'Список желаний';
      getData.getWishlistItemsById(storage.wishlist, renderItems);
    } else if (prop === 'cat' || prop === 'subcat') {
      mainHeader.textContent = searchValue;
      getData.getItemsByCategory(prop, searchValue, renderItems);
    }
  }
}

export default generateGoodsPage;
