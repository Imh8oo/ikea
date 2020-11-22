export default class GetData {
  constructor() {
    this.URL = 'http://127.0.0.1:3000/';
  };

  _getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}; Status: ${response.status}`)
    } else {
      return await response.json();
    }
  };

  _postJSON = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}; Status: ${response.status}`);
    } else {
      return await response.json();
    }
  };

  _postText = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: data
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}; Status: ${response.status}`);
    } else {
      return await response.json();
    }
  };

  getItemById = async (itemId) => {
    if (typeof(itemId) === 'string') {
      return await this._postText(this.URL + 'item/id', itemId);
    } else {
      throw new Error('The "itemId" must be a string');
    }
  };

  getItemsById = async (idsArray) => {
    if (Array.isArray(idsArray)) {
      return await this._postJSON(this.URL + 'goods/id', idsArray);
    } else {
      throw new Error('The "wishlistIds" must be an array');
    }
  };

  getAllCategories = async () => await this._getData(this.URL + 'categories');

  getAllSubcategories = async () => await this._getData(this.URL + 'subcategories');

  getItemsByName = async (itemName) => {
    if (typeof(itemName) === 'string') {
      return await this._getData(this.URL + `goods/name?s=${itemName}`);
    } else {
      throw new Error('The "itemName" must be a string');
    }
  };

  getItemsByCategory = async (prop, value) => {
    if (typeof(prop) === 'string' && typeof(value) === 'string') {
      return await this._getData(this.URL + `goods/category?${prop}=${value}`);
    } else {
      throw new Error('"prop" and "value" must be of type String');
    }
  };
};
