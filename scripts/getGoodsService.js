export class GetGoodsService  {
  #data = 'db.json';

  constructor() {
    console.log('getGoodsService')
  }

  async getData() {
    const data = await fetch(`${this.#data}`, {mode: 'cors'});
    if (data.ok) {
      return await data.json();
    } else {
      throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`)
    }
  }

  getGoods (callback, prop, value) {
    this.getData()
      .then(data => {
        if (value) {
          callback(data.filter(item => item[prop] === value));
        } else {
          callback(data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}