import settings from './settings.js';
/*const settings = {
  itemIsNewStockCount: 7,
  itemIDBodySimbolsNum: 3,
};*/

const userData = {
  _wishlist: ['idd055', 'idd045', 'idd023', 'idd099', 'idd076', 'idd100'],
  _cartlist: [
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
  ],

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

  toggleIdList(id, arr) {
    id = this.checkIdFormat(id);
    if (arr.includes(id)) {
      const index = arr.indexOf(id);
      arr.splice(index, 1);
    } else {
      arr.push(id);
    }
  },

  get wishlist() {
    return this._wishlist;
  },
  set wishlist(id) {
    this.toggleIdList(id, this._wishlist)
  },

  get cartlist() {
    return this._cartlist;
  },
  set cartlist(id) {
    this.toggleIdList(id, this._cartlist)
  },
}

export default userData;