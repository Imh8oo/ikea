const { Router, json, urlencoded, text } = require('express');
const router = Router();
router.use(json());
router.use(text());
router.use(urlencoded({ extended: true }));
const Goods = require('../services/goods');
const goods = new Goods();

router.get('/goods/category', async (req, res) => {
  const items = await goods.getItemsByCategory(req.query);
  res.status(200).send(items);
});

router.get('/goods/name', async (req, res) => {
  const items = await goods.getItemsByName(req.query.s);
  res.status(200).send(items);
});

router.get('/categories', async (req, res) => {
  const items = await goods.getAllCategories();
  res.status(200).send(items);
});

router.get('/subcategories', async (req, res) => {
  const items = await goods.getAllSubcategories();
  res.status(200).send(items);
});

router.post('/goods/id', async (req, res) => {
  const items = await goods.getItemsById(req.body);
  res.status(200).send(items);
});

router.post('/item/id', async (req, res) => {
  const item = await goods.getItemById(req.body);
  res.status(200).send(item);
});

module.exports = router;
