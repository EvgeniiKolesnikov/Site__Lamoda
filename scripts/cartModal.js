'use strict';

export class CartModal {
  storageKey = 'cart-lamoda';

  constructor(storage) {
    console.log('cartModal');
    this.storage = storage;

    this.cartListGoods = document.querySelector('.cart__list-goods');
    this.cartTotalCost = document.querySelector('.cart__total-cost');
    this.subheaderCart = document.querySelector(".subheader__cart");
    this.cartOverlay = document.querySelector(".cart-overlay");

    this.subheaderCart.addEventListener('click', e => this.cartModalOpen());
    this.subheaderCart.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.cartModalClose();
        this.enableScroll();
        e.target.blur();
      }
    });
    
    this.cartOverlay.addEventListener('click', e => {
      const target = e.target;
      // или так if (target.classList.contains('cart__btn-close')) {
      if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {   
        this.cartModalClose();
        this.enableScroll();
      }
    });

    this.cartListGoods.addEventListener('click', e => { 
      if (e.target.matches('.btn-delete')) {
        this.deleteItemCart(e.target.dataset.id);
        this.renderCart();
      }
    })
  }

  renderCart() {
    this.cartListGoods.textContent = '';
    let totalPrice = 0;

    const cartItems = this.storage.get(`${this.storageKey}`);

    cartItems.forEach((item, i) => {
      let html =
      `<tr>
        <td>${i+1}</td>
        <td>${item.brand} ${item.name}</td>
        ${item.color ? `<td>${item.color}</td>` : `<td>-</td>`} 
        ${item.size ? `<td>${item.size}</td>` : `<td>-</td>`} 
        <td>${item.cost} &#8381;</td>
        <td><button class="btn-delete" data-id="${item.id}">&times;</button></td>
      </tr>`;
      totalPrice += item.cost;
      this.cartListGoods.innerHTML += html;
    });

    this.cartTotalCost.textContent = totalPrice + ' ₽';
  }

  deleteItemCart = id => {
    const cartItems = this.storage.get(`${this.storageKey}`);
    const newCartItems = cartItems.filter(item => item.id !== id);
    this.storage.set(`${this.storageKey}`, newCartItems);
  }

  cartModalOpen() {
    this.cartOverlay.classList.add('cart-overlay-open');
    this.disableScroll();
    this.renderCart();
  }

  cartModalClose() {
    this.cartOverlay.classList.remove('cart-overlay-open');
  }

  disableScroll() {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
      document.body.dbScrollY = window.scrollY;
      document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
  }

  enableScroll() {
    document.body.style.cssText = '';
    window.scroll({
      top: document.body.dbScrollY
    })
    return this;
  }
}