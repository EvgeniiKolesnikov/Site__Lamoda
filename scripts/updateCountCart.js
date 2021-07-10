'use strict'

export class UpdateCountCart {
  storageKey = 'cart-lamoda';
  constructor(storage) {
    console.log('UpdateCountCart');
    this.storage = storage;

    this.subheaderCart = document.querySelector(".subheader__cart");
  }

  updateCountCart() {
    if (this.storage.get(`${this.storageKey}`).length) {
      this.subheaderCart.textContent = 
        this.storage.get(`${this.storageKey}`).length + ' товара';
    } else {
      this.subheaderCart.textContent = 'Корзина';
    }
  }
}