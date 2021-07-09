'use strict';

import { Location } from "./location.js";
import { CartModal} from "./cartModal.js";
import { GetGoodsService } from './getGoodsService.js';
import { GoodsList } from "./goodsList.js";
import { CardGood } from "./cardGood.js";
import { Storage } from "./storage.js";

console.log('index');

let getGoodsService = new GetGoodsService();
let storage = new Storage();
new Location();
new CartModal(storage);
new GoodsList(getGoodsService);
new CardGood(getGoodsService, storage);
