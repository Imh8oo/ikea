const postData = {
  URL: 'https://jsonplaceholder.typicode.com/posts',

  sendCartItems(items) {
    this._postRequest(this.URL, items)
    .then( data => console.log(data))
    .catch( err => console.error(err));
  },

  async _postRequest(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}; Status: ${response.status}`);
    } else {
      return await response.json();
    }
  },
};

export default postData;
