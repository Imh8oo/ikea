'use strict';
import headerHTML from './components/header.js';
import Catalog from './components/сatalog.js';
import { renderSubcatalogWrapper } from './components/subcatalog.js';
import GoodsPage from './components/goodsPage.js';
import ItemPage from './components/itemPage.js';
import CartPage from './components/cartPage.js'
import Footer from './components/footer.js';

//header
document.body.insertAdjacentHTML('afterbegin', headerHTML());
//Catalog
const catalog = new Catalog();
catalog.loadCatalogData();
//subcatalog
renderSubcatalogWrapper();
//GoodsPage
const goodsPage = new GoodsPage('.main-header', '.goods-list');
if (location.pathname.includes('goods') && location.search) {
  const searchStr = decodeURI(location.search),
        searchProp = searchStr.split('=')[0].substring(1),
        searchValue = searchStr.split('=')[1];
  goodsPage.loadItems(searchProp, searchValue);
}
//ItemPage
const itemPage = new ItemPage('main > .container');
if (location.pathname.includes('card') && location.hash) {
  itemPage.loadItemData(location.hash.substring(1));
}
//CartPage
const cartPage = new CartPage('.cart-list', '.cart-total-price', '.cart-form');
if (location.pathname.includes('cart')) {
  cartPage.loadItems();
}
//Footer
const footer = new Footer();
footer.loadFooterData();
