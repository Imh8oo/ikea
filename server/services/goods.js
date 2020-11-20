const itemModel = require('../models/models');

class Goods {
  _PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'category', 'subcategory'],
  };

  getItems = async (key, value) => {
    console.log('value: ', value);
    console.log('key: ', key);
    return await itemModel.find( {[this._PARAM[key]]: value} );
  }

};

module.exports = Goods;
