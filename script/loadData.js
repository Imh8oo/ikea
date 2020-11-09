import GetData from './getData.js';
const getData = new GetData();

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



  if (location.pathname.includes('cart')) {
    getData.getCartItems(cartlist, (cartItems) => console.log(cartItems))
  }
}

export default loadData;
