import settings from './settings.js';

const storage = {
  _wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
  _cartlist: JSON.parse(localStorage.getItem('cartlist')) || [],

  checkBitDepth (num) {
    switch(true) {
      case (num < 10):
        return ('idd00' + num);
      case (num < 100):
        return ('idd0' + num);
      case (num < 1000):
        return ('idd' + num);
      case (num >= 10 * settings.itemIDBodySimbolsNum):
        throw new Error('ID format is incorrect');
    }
  },

  checkIdFormat (id) {
    if (id.includes('#') && id.indexOf('#') === 0) {
      id = id.slice(1);
    }

    switch(true) {
      case (id.length === 3 + settings.itemIDBodySimbolsNum):
        if (id.includes('idd') && typeof(+id.slice(3) === 'number')) {
          return id;
        } else if (id.includes('id')) {
          const idNumbers = +id.slice(2);
          if (typeof(idNumbers) === 'number' && idNumbers < Math.pow(10, settings.itemIDBodySimbolsNum)) {
            return this.checkBitDepth(idNumbers);
          } else {
            throw new Error('ID format is incorrect');
          }
        } else if (typeof(+id) === 'number' && +id < Math.pow(10, settings.itemIDBodySimbolsNum)) {
          return this.checkBitDepth(+id);
        } else {
          throw new Error('ID format is incorrect');
        }
      case (id.length < 3 + settings.itemIDBodySimbolsNum):
        if (id.includes('id')) {
          const idNumbers = +id.slice(2);
          if (typeof(idNumbers) === 'number' && idNumbers < Math.pow(10, settings.itemIDBodySimbolsNum)) {
            return this.checkBitDepth(idNumbers);
          }
        } else if (typeof(+id) === 'number' && +id < Math.pow(10, settings.itemIDBodySimbolsNum)) {
          return this.checkBitDepth(+id);
        } else {
          throw new Error('ID format is incorrect');
        }
      case (id.length > 3 + settings.itemIDBodySimbolsNum):
        throw new Error('ID format is incorrect');
    }
  },

  //WISHLIST FUNCTIONS
  get wishlist() {
    return this._wishlist;
    
  },

  set wishlist(id) {
    id = this.checkIdFormat(id);
    if (this._wishlist.includes(id)) {
      const index = this._wishlist.indexOf(id);
      this._wishlist.splice(index, 1);
      localStorage.setItem('wishlist', JSON.stringify(this._wishlist));
    } else {
      this._wishlist.push(id);
      localStorage.setItem('wishlist', JSON.stringify(this._wishlist));
    }
  },

  //CART FUNCTIONS
  get cartlist() {
    return this._cartlist;
  },

  getСartlistItemIndex(id) {
    return this._cartlist.findIndex( item => item.id === id);
  },

  getСartlistItemById(id) {
    return this._cartlist.find( item => item.id === id);
  },

  increaseСartlistItemCount(id) {
    id = this.checkIdFormat(id);
    const itemIndex = this.getСartlistItemIndex(id);

    if (itemIndex >= 0) {
      this._cartlist[itemIndex].count++;
      localStorage.setItem('cartlist', JSON.stringify(this._cartlist));
    } else {
      this._cartlist.push({
        id,
        count: 1,
      });
      localStorage.setItem('cartlist', JSON.stringify(this._cartlist));
    }
  },

  reduceСartlistItemCount(id) {
    id = this.checkIdFormat(id);
    

    if (this._cartlist[itemIndex].count > 1) {
      this._cartlist[itemIndex].count--;
      localStorage.setItem('cartlist', JSON.stringify(this._cartlist));
    } else {
      this._cartlist.splice(itemIndex, 1);
      localStorage.setItem('cartlist', JSON.stringify(this._cartlist));
    }
  },

  removeItemFromCartlist(id) {
    id = this.checkIdFormat(id);
    const itemIndex = this.getСartlistItemIndex(id);
    this._cartlist.splice(itemIndex, 1);
    localStorage.setItem('cartlist', JSON.stringify(this._cartlist));
  },
}

export default storage;
