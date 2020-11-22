const postData = {
  URL: 'https://jsonplaceholder.typicode.com/posts',

  sendCartItems(items, handler) {
    this._postRequest(this.URL, items)
    .then( data => console.log(data))
    .then(handler)
    .catch( err => console.error(err));
  },

  async _postRequest(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}; Status: ${response.status}`);
    } else {
      return await response.json();
    }
  },
};

export default postData;
