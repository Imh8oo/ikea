import storage from '../storage.js';

const toggleWishlist = (e) => {
  const target = e.target.closest('button');
  const id = target.dataset.idd;
  target.classList.toggle('contains-wishlist');
  storage.wishlist = id;
}

const toggleCartlist = (e) => {
  const target = e.target.closest('button');
  if (target) {
    e.preventDefault();
    const id = target.dataset.idd;
    let itemInCartCount;
    if (storage.getСartlistItemIndex(id) >= 0) {
      itemInCartCount = storage.getСartlistItemById(id).count;
    } else {
      itemInCartCount = 0;
    }

    if (target.dataset.count > itemInCartCount) {
      storage.increaseСartlistItemCount(id);
    }
  }
}

export const itemPageBtns = (id) => {
  const addToWishlistBtn = document.querySelector('.btn-add-wishlist');
  const addToCartBtn = document.querySelector('.btn-good');
 
  if (storage.wishlist.includes(id)) {
    addToWishlistBtn.classList.add('contains-wishlist');
  } else {
    addToWishlistBtn.classList.remove('contains-wishlist');
  }

  addToWishlistBtn.addEventListener('click', toggleWishlist);
  addToCartBtn.addEventListener('click', toggleCartlist);
}

export const goodsPageBtns = () => {
  const goodsList = document.querySelector('.goods-list');
  goodsList.addEventListener('click', toggleCartlist);
}
