'use strict';

import generateHeader from './generateHeader.js';
import generateFooter from './generateFooter.js';
import gC from './generateCatalog.js';
import { generateSubCatalog } from './generateSubCatalog.js';
import loadData from './loadData.js';

generateHeader();
generateFooter();
gC();
generateSubCatalog();
loadData();
