'use strict';

export class CartModal {
  constructor() {
    console.log('cartModal');

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
  }

  cartModalOpen() {
    this.cartOverlay.classList.add('cart-overlay-open');
    this.disableScroll();
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