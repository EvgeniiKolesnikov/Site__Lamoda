export class Location  {
  constructor() {
    console.log('Location')
    this.init();
  }

  init() {
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
  }
}