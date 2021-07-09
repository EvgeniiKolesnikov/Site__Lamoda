'use strict';

export class GoodsList {
  constructor(getGoodsService) {
    console.log('GoodsList')
    this.getGoodsService = getGoodsService;

    this.goodsList = document.querySelector('.goods__list');
    this.goodsTitle = document.querySelector('.goods__title');
    this.navigationLinks = document.querySelectorAll('.navigation__link');
    this.hash = location.hash.substring(1);
    this.load();
  }

  load() {
    // Загрузка страниц категорий
    try {
      if (!this.goodsList) {
        throw 'This is not a goods page'
      }
      const createCard = ({brand, category, color, cost, id, name, photo, preview, sizes}) => {
        // const {brand, category, color, cost, id, name, photo, preview, sizes} = data;
        const li = document.createElement('li');
        li.classList.add('goods__item');
        li.innerHTML = `
          <article class="good">
            <a class="good__link-img" href="card-good.html#${id}">
              <img class="good__img" src="goods-image/${preview}" alt="">
            </a>
            <div class="good__description">
              <p class="good__price">${cost} &#8381;</p>
              <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
              ${sizes ? 
                `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes?.join(' ')}</span></p>` 
                : ``}
              <a class="good__link" href="card-good.html#${id}">Подробнее</a>
            </div>
          </article>
        `;
        return li;
      };

      const renderGoodsList = data => {
        this.goodsList.textContent = ``;
        // console.log(data);
        data.forEach(item => {
          const card = createCard(item);
          this.goodsList.append(card);
        });
      }

      this.getGoodsService.getGoods(renderGoodsList, 'category', this.hash);
      this.refreshLinks();

      window.addEventListener('hashchange', () => {
        this.hash = location.hash.substring(1);
        this.refreshLinks();
        this.getGoodsService.getGoods(renderGoodsList, 'category', this.hash);
      })
    } catch (error) {
      console.warn(error);
    }
  }    

  refreshLinks = () => {
    for (const link of this.navigationLinks) {
      if (link.href.includes(location.hash)) {
        link.style = `border-bottom: 2px solid black;`
        this.goodsTitle.textContent = link.textContent;
      } else {
        link.style = ``;
      }
    }
  }

  changeTitle = () => {
    goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
  }
  
}