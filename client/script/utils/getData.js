export default class GetData {
  constructor() {
    this.URL = 'database/dataBase.json';
    this.servurl = 'http://127.0.0.1:3000/card';
  };

  _PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'category', 'subcategory'],
  };

  _get = (handler) => {
    this._getRequest(this.URL)
    .then( data => handler(data))
    .catch( err => console.error(err));
  };

  _getRequest = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}; Status: ${response.status}`)
    } else {
      return await response.json();
    }
  };

  getItemById = (itemId, callback) => {
    if (typeof(itemId) === 'string') {
      this._get( data => {
        const item = data.find( dbItem => itemId === dbItem.id);
        if (item) {
          callback(item);
        } else {
          //NOTHING FOUND
        }
      });
    } else {
      throw new Error('The "itemId" must be a string');
    }
  };

  getItemsByCategory = async (prop, value, callback) => {
    console.log('value: ', value);
    console.log('prop: ', prop);
    this._getRequest(this.servurl + `?${prop}=${value}`)
    .then( data => console.log(data))
    .catch( err => console.error(err));
  };

  getItemsByName = (itemName, callback) => {
    if (typeof(itemName) === 'string') {
      this._get( data => {
        const items = data.filter( dbItem => {
          for (const prop in dbItem) {
            if (this._PARAM.search.includes(prop)
              && dbItem[prop].toLowerCase().includes(itemName.toLowerCase())) {
              return true;
            }
          }
        });
        console.log(Array.isArray(items));
        callback(items);
      });
    } else {
      throw new Error('The "itemName" must be a string');
    }
  };

  getWishlistItemsById = (wishlistIds, callback) => {
    if (Array.isArray(wishlistIds) || typeof(wishlistIds) === 'string') {
      this._get( data => {
        const wishlistItems = data.filter( dbItem => wishlistIds.includes(dbItem.id));
        console.log(Array.isArray(wishlistItems));
        callback(wishlistItems);
      });
    } else {
      throw new Error('The "wishlistIds" must be an array or a string');
    }
  };

  getCartItems = (cartItemsIds, callback) => {
    if (Array.isArray(cartItemsIds)) {
      this._get( data => {
        const cartItems = data.filter( dbItem => cartItemsIds.some( obj => {
          if (obj.id === dbItem.id) {
            const amount = (obj.count <= dbItem.count) ? obj.count : dbItem.count;
            dbItem.amount = amount;
            return obj;
          }
        }));
        callback(cartItems);
      });
    } else {
      throw new Error('The "cartItemsList" must be an array');
    }
  };

  /*getItemsByCategory = (prop, value, callback) => {
    if (typeof(prop) === 'string' && typeof(value) === 'string') {
      this._get( data => {
        const categoryItems = data.filter( dbItem => 
          value.toLowerCase() === dbItem[this._PARAM[prop]].toLowerCase());
          console.log(Array.isArray(categoryItems));
          callback(categoryItems);
      });
    } else {
      throw new Error('"prop" and "value" must be of type String');
    }
  };*/

  getAllCategories = (callback) => {
    this._get( data => {
      const categories = new Set();
      data.forEach(dbItem => categories.add(dbItem.category));
      callback(Array.from(categories));
    });
  };

  getAllSubcategories = (category, callback) => {
    if (typeof(category) === 'string') {
      category = category.toLowerCase();

      this._get( data => {
        const subcategories = new Set();
        data.forEach(dbItem => {
          if (dbItem.category.toLowerCase() === category) {
            subcategories.add(dbItem.subcategory);
          }
        });
        callback(Array.from(subcategories));
      });
    } else {
      throw new Error('"category" must be of type String');
    }
  };
};
