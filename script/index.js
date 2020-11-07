'use strict';

import generateHeader from './generateHeader.js';
//import './generateFooter.js';
import generateFooter from './generateFooter.js';
import gC from './generateCatalog.js';
import gSC from './generateSubCatalog.js';
import { catalog } from './catalog.js';
import loadData from './loadData.js';

generateHeader();
generateFooter();
gC();
gSC();
catalog();
loadData();
