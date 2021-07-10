'use strict';

export class CardGood {
  storageKey = 'cart-lamoda';

  constructor(getGoodsService, storage, updateCountCart) {
    console.log('CardGood');
    this.getGoodsService = getGoodsService;
    this.storage = storage;
    this.updateCountCart = updateCountCart;

    this.cardGood = document.querySelector('.card-good');
    this.hash = location.hash.substring(1);
    this.load();
  }

  load() {
    try {
      // Загрузка страницы товара
      if (!this.cardGood) {
        throw 'This is not a card-good page'
      }
          
      const cardGoodImage =         document.querySelector('.card-good__image');
      const cardGoodBrand =         document.querySelector('.card-good__brand');
      const cardGoodTitle =         document.querySelector('.card-good__title');
      const cardGoodPrice =         document.querySelector('.card-good__price');
      const cardGoodColor =         document.querySelector('.card-good__color');
      const cardGoodColorList =     document.querySelector('.card-good__color-list');
      const cardGoodSizes =         document.querySelector('.card-good__sizes');
      const cardGoodSizesList =     document.querySelector('.card-good__sizes-list');
      const cardGoodBuy =           document.querySelector('.card-good__buy');
      const cardGoodSelectWrapper = document.querySelectorAll('.card-good__select__wrapper');

      const generateList = (data) => 
        data.reduce((html, item, i) => html + 
        `<li class="card-good__select-item" data-id="${i}">${item}</li>`, '');

      const renderCardGood = ([{brand, name, cost, color, sizes, id, photo}]) => {
        const data = {brand, name, cost, id};

        cardGoodImage.src = `goods-image/${photo}`;
        cardGoodImage.alt = `${brand} ${name}`;
        cardGoodBrand.textContent = brand;
        cardGoodTitle.textContent = name;
        cardGoodPrice.textContent = `${cost} ₽`;
        if (color) {
          cardGoodColor.textContent = color[0];
          cardGoodColor.dataset.id = 0;
          cardGoodColorList.innerHTML = generateList(color);
        } else {
          cardGoodColor.style.display = 'none';
        }
        if (sizes) {
          cardGoodSizes.textContent = sizes[0];
          cardGoodSizes.dataset.id = 0;
          cardGoodSizesList.innerHTML = generateList(sizes);
        } else {
          cardGoodSizes.style.display = 'none';
        }
        
        // Push item in a basket
        if (this.storage.get(`${this.storageKey}`).some(item => item.id === id)) {
          cardGoodBuy.classList.add('delete');
          cardGoodBuy.textContent = 'Удалить из корзины';
        }

        // Push item in a basket
        cardGoodBuy.addEventListener('click', () => {
          if (cardGoodBuy.classList.contains('delete')) {
            this.deleteItemCart(id);
            cardGoodBuy.classList.remove('delete');
            cardGoodBuy.textContent = 'Добавить в корзину';
            return;
          }

          if (color) data.color = cardGoodColor.textContent;
          if (sizes) data.size = cardGoodSizes.textContent;

          cardGoodBuy.classList.add('delete');
          cardGoodBuy.textContent = 'Удалить из корзины';

          const cardData = this.storage.get(`${this.storageKey}`);
          cardData.push(data);
          this.storage.set(`${this.storageKey}`, cardData);
          this.updateCountCart.updateCountCart();
        });
      };

      cardGoodSelectWrapper.forEach(item => {
        item.addEventListener('click', e => {
          const target = e.target;
          if (target.closest('.card-good__select')) {
            target.classList.toggle('card-good__select__open');
          }
          if (target.closest('.card-good__select-item')) {
            const cardGoodSelect = item.querySelector('.card-good__select');
            cardGoodSelect.textContent = target.textContent;
            cardGoodSelect.dataset.id = target.dataset.id;
            cardGoodSelect.classList.remove('card-good__select__open');
          }
        })
      })

      this.getGoodsService.getGoods(renderCardGood, 'id', this.hash);

    } catch (error) {
      console.warn(error);
    }
  }

  deleteItemCart = id => {
    const cartItems = this.storage.get(`${this.storageKey}`);
    const newCartItems = cartItems.filter(item => item.id !== id);
    this.storage.set(`${this.storageKey}`, newCartItems);
    this.updateCountCart.updateCountCart();
  }

}