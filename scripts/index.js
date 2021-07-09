'use strict';

import { Location } from "./location.js";
import { CartModal} from "./cartModal.js";
import { GetGoodsService } from './getGoodsService.js';
import { GoodsList } from "./goodsList.js";
import { CardGood } from "./cardGood.js";

console.log('index');

let getGoodsService = new GetGoodsService();
new Location();
new CartModal();
new GoodsList(getGoodsService);
new CardGood(getGoodsService);
