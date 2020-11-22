const itemModel = require('../models/models');

class Goods {
  _PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'category', 'subcategory'],
  };

  getItemsByCategory = async (queryObj) => {
    const [[key, value]] = Object.entries(queryObj);
    return await itemModel.find({ [this._PARAM[key]]: value });
  };

  getItemsByName = async (value) => {
    itemModel.createIndexes({ '$**': 'text' });
    return await itemModel.find({ $text: { $search: value } });
  };

  getItemsById = async (idsArray) => {
    let items = [];
    const docs = await itemModel.find({});

    idsArray.forEach( itemId => {
      docs.find( docsItem => {
        if (docsItem.id === itemId) {
          items.push(docsItem);
        }
      })
    });

    return items;
  };

  getItemById = async (itemId) => {
    return await itemModel.find({ id: itemId });
  }

  getAllCategories = async () => {
    let categories = [];
    const docs = await itemModel.find({});
    const data = new Set();
    docs.forEach( item => {
      data.add(item[this._PARAM.cat]);
    });
    categories = Array.from(data);
    return categories;
  };

  getAllSubcategories = async () => {
    let subcategories = {};
    const categories = await this.getAllCategories();

    for (let category of categories) {
      const docs = await itemModel.find({ [this._PARAM.cat]: category });
      const data = new Set();
      docs.forEach( item => {
        data.add(item[this._PARAM.subcat]);
      });
      subcategories[category] = Array.from(data);
    }

    return subcategories;
  };
};

module.exports = Goods;
