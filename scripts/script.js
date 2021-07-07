const headerCityButton = document.querySelector(".header__city-button");
let goodsTitle = document.querySelector('.goods__title');
const navigationLinks = document.querySelectorAll('.navigation__link');
let hash = location.hash.substring(1);

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
const cartModalClose = () => cartOverlay.classList.remove('cart-overlay-open');


const getData = async () => {
  const data = await fetch('db.json');
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`)
  }
}

const getGoods = (callback, value) => {
  getData()
    .then(data => {
      if (value) {
        callback(data.filter(item => item.category === value));
      } else {
        callback(data);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

subheaderCart.addEventListener('click', cartModalOpen);
cartOverlay.addEventListener('click', e => {
  const target = e.target;
  // или так if (target.classList.contains('cart__btn-close')) {
  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {   
    cartModalClose();
    enableScroll();
  }
});

subheaderCart.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    cartModalClose();
    enableScroll();
    e.target.blur();
  }
});


const refreshLinks = () => {
  for (const link of navigationLinks) {
    if (link.href.indexOf('#' + hash) !== -1) {
      link.style = `border-bottom: 2px solid black;`
      goodsTitle.textContent = link.textContent;
    } else {
      link.style = ``;
    }
  }
}

try {
  console.log(hash);
  const goodsList = document.querySelector('.goods__list');
  if (!goodsList) {
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
    goodsList.textContent = ``;
    console.log(data);
    data.forEach(item => {
      const card = createCard(item);
      goodsList.append(card);
    });
  }

  getGoods(renderGoodsList, hash);
  refreshLinks();
  
  window.addEventListener('hashchange', () => {
    hash = location.hash.substring(1);
    refreshLinks();
    getGoods(renderGoodsList, hash);
  })

} catch (error) {
  console.warn(error);
}




