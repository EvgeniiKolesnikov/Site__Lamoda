'use strict';

export class Storage {
  constructor() {
    console.log('Storage');
    this.name = 'cart-lamoda';
    // this.clear();
  }

  clear() {
    console.log('Clear storage');
    localStorage.clear(); 
  }

  get(name) {
    // name = 'cart-lamoda'
    return JSON?.parse(localStorage.getItem(name)) || [];
  }

  set(name, data) { 
    // 'cart-lamoda',  db.json
    localStorage.setItem(name, JSON.stringify(data)); 
    // this.refresh();
  }

  log(name) {
    console.log(`${name} = `, this.get(name));
  }
}
