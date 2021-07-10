'use strict'

export class UpdateCountCart {
  storageKey = 'cart-lamoda';
  constructor(storage) {
    console.log('UpdateCountCart');
    this.storage = storage;

    this.subheaderCart = document.querySelector(".subheader__cart");
  }

  // возвращает только слово
	declOfNum = (n, titles) => {
		return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
			0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
	}

  updateCountCart() {
    if (this.storage.get(`${this.storageKey}`).length) {
      this.subheaderCart.textContent = 
      this.declOfNum(
        this.storage.get(`${this.storageKey}`).length,
        ['товар', 'товара', 'товаров']);
    } else {
      this.subheaderCart.textContent = 'Корзина';
    }
  }
}