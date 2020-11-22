const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;
 
const goodsItem = new Schema({
  author: ObjectId,
  category: String,
  subcategory: String,
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: String,
  img: Array,
  id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
},
{ collation: { locale: 'ru', strength: 1 } }
);

const itemModel = model('goods', goodsItem);

module.exports = itemModel;
