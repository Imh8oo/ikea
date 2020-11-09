export default class GetData {
  constructor() {
    this.URL = 'database/dataBase.json';
  }

  _PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'category', 'subcategory'],
  }

  _get = (handler) => {
    fetch(this.URL)
    .then( response => response.json())
    .then( data => handler(data))
    .catch( err => console.log(err));
  }

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
  }

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
  }

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
  }

  getCartItems = (cartItemsIds, callback) => {
    if (Array.isArray(cartItemsIds)) {
      this._get( data => {
        const cartItems = data.filter( dbItem => cartItemsIds.some( obj => obj.id === dbItem.id) );
        console.log(Array.isArray(cartItems));
        callback(cartItems);
      });
    } else {
      throw new Error('The "cartItemsList" must be an array');
    }
  }

  getItemsByCategory = (prop, value, callback) => {
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
  }

  getAllCategories = (callback) => {
    this._get( data => {
      const categories = new Set();
      data.forEach(dbItem => categories.add(dbItem.category));
      callback(Array.from(categories));
    });
  }

  /*getAllCategories = (callback) => {
    this._get( data => {
      const categories = data.reduce((arr, dbItem) => {
        if (!arr.includes(dbItem.category)) {
          arr.push(dbItem.category);
        }
        return arr;
      }, []);
      callback(categories);
    });
  }*/

  /*getAllSubcategories = (category, callback) => {
    if (typeof(category) === 'string') {
      category = category.toLowerCase();
      this._get( data => {
        const subcategories = data
        .filter( dbItem => dbItem.category.toLowerCase() === category)
        .reduce((arr, dbItem) => {
          if (!arr.includes(dbItem.subcategory)) {
            arr.push(dbItem.subcategory);
          }
          return arr;
        }, []);
        callback(subcategories);
      });
    } else {
      throw new Error('"category" must be of type String');
    }
  }*/

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
  }
}
