'use strict';

import generateHeader from './domElements/generateHeader.js';
import generateFooter from './domElements/generateFooter.js';
import gC from './domElements/generateCatalog.js';
import { generateSubCatalog } from './domElements/generateSubCatalog.js';
import loadData from './loadData.js';
import generateGoodsPage from './domElements/generateGoodsPage.js'
import generateItemPage from './domElements/generateItemPage.js';

generateHeader();
generateFooter();
gC();
generateSubCatalog();
loadData();
generateGoodsPage();
generateItemPage();
