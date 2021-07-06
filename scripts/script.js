const headerCityButton = document.querySelector(".header__city-button");

// localStorage.clear('lamoda-location')
headerCityButton.textContent = localStorage.getItem('lamoda-location') || 'Ваш город?';
headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите ваш город');
  if (city) {
    headerCityButton.textContent = city;
    localStorage.setItem('lamoda-location', city)
  }
})

// block scroll
const disableScroll = () => {
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
};

const enableScroll = () => {
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.dbScrollY
  })
};

// A modal window
const subheaderCart = document.querySelector(".subheader__cart");
const cartOverlay = document.querySelector(".cart-overlay");

const cartModalOpen = () => {
  cartOverlay.classList.add('cart-overlay-open');
  disableScroll();
}
subheaderCart.addEventListener('click', cartModalOpen);

const cartModalClose = () => cartOverlay.classList.remove('cart-overlay-open');
cartOverlay.addEventListener('click', e => {
  const target = e.target;
  // или так if (target.classList.contains('cart__btn-close')) {
  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {   
    cartModalClose();
    enableScroll();
  }
});

subheaderCart.addEventListener('keyup', e => {
  if (e.key === 'Escape') {
    cartModalClose();
    enableScroll();
    e.target.blur();
  }
});
