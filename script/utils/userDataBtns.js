import userData from './userData.js';

const toggleWishlist = (e) => {
  const target = e.target.closest('button');
  const id = target.dataset.idd;
  if (userData.wishlist.includes(id)) {
    target.classList.remove('contains-wishlist');
  } else {
    target.classList.add('contains-wishlist');
  }
  userData.wishlist = id;
}

const toggleCartlist = (e) => {
  e.preventDefault();
  const target = e.target.closest('button');
  const id = target.dataset.idd;
  userData.cartlist = id;
}

export const itemPageUserDataBtns = () => {
  const addToWishlistBtn = document.querySelector('.btn-add-wishlist');
  const addToCartBtn = document.querySelector('.btn-good');
  addToWishlistBtn.addEventListener('click', toggleWishlist);
  addToCartBtn.addEventListener('click', toggleCartlist);
}

export const goodsPageUserDataBtns = () => {
  const goodsList = document.querySelector('.goods-list');
  goodsList.addEventListener('click', toggleCartlist);
}
