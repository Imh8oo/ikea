import GetData from './getData.js';
const getData = new GetData();
const wishlistIds = ['idd055', 'idd045', 'idd023', 'idd099', 'idd076'];
const cartlist = [
  {
    id: 'idd027',
    count: 1,
  },
  {
    id: 'idd014',
    count: 1,
  },
  {
    id: 'idd082',
    count: 2,
  },
];

const loadData = () => {
  if (location.search) {
    const searchStr = decodeURI(location.search);
    const searchValue = searchStr.split('=')[1];
    const prop = searchStr.split('=')[0].substring(1);

    if (prop === 's') {
      getData.getItemByName(searchValue, (item) => console.log(item));
    } else if (prop === 'wishlist') {
      getData.getWishlistItemsById(wishlistIds, (wishlistItems) => console.log(wishlistItems));
    } else if (prop === 'cat' || prop === 'subcat') {
      getData.getItemsByCategory(prop, searchValue, (categoryItems) => console.log(categoryItems));
    }
  }

  if (location.hash) {
    const itemId = location.hash.substring(1);
    getData.getItemById(itemId, (item) => console.log(item));
  }

  if (location.pathname.includes('cart')) {
    getData.getCartItems(cartlist, (cartItems) => console.log(cartItems))
  }
}

export default loadData;
