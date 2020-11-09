'use strict';

import generateHeader from './generateHeader.js';
import generateFooter from './generateFooter.js';
import gC from './generateCatalog.js';
import { generateSubCatalog } from './generateSubCatalog.js';
import loadData from './loadData.js';
import generateGoodsPage from './generateGoodsPage.js'
import generateItemPage from './generateItemPage.js';

generateHeader();
generateFooter();
gC();
generateSubCatalog();
loadData();
generateGoodsPage();
generateItemPage();
