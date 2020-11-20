const { Router } = require('express');
const router = Router();
const itemModel = require('../models/models');
const _PARAM = {
  cat: 'category',
  subcat: 'subcategory',
  search: ['name', 'description', 'category', 'subcategory'],
};

const getItem = async (key, value) => {
  return await itemModel.find( {[key]: value} );
}

router.get('/card', async function (req, res) {
  console.log('req._parsedUrl.query: ', req._parsedUrl.query);
  const key = req._parsedUrl.query.split('=')[0];
  const value = decodeURI(req._parsedUrl.query.split('=')[1]);
  const items = await getItem(_PARAM[key], value);
  console.log('items: ', items);
  res.status(200).send(items);
});

module.exports = router;
