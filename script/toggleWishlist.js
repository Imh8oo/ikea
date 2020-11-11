import userData from './userData.js';

const addToWishlist = (e) => {
  userData.wishlist = e.target.closest('button').dataset.idd;
  console.log('userData.wishlist: ', userData.wishlist);
}

const toggleWishlist = () => {
  const addToWishlistBtn = document.querySelector('.btn-add-wishlist');
  addToWishlistBtn.addEventListener('click', addToWishlist);
}

export default toggleWishlist;
