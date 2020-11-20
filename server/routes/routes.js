const { Router } = require('express');
const router = Router();
const Goods = require('../services/goods');
const goods = new Goods();

router.get('/', async function (req, res) {
  const key = req._parsedUrl.query.split('=')[0];
  const value = decodeURI(req._parsedUrl.query.split('=')[1]);
  const items = await goods.getItems(key, value);
  res.status(200).send(items);
});

module.exports = router;
