import GetData from './getData.js';
const getData = new GetData();



const loadData = () => {



  if (location.pathname.includes('cart')) {
    getData.getCartItems(cartlist, (cartItems) => console.log(cartItems))
  }
}

export default loadData;
