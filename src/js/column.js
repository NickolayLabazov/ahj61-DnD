import Card from './card.js';
import CardNew from './cardNew.js';

export default class Column {
  constructor(parent, cont, name) {
    this.parent = parent;
    this.cont = cont;
    this.contDiv = 0;
    this.name = name;
    this.columnDiv = 0;
    this.addDiv = 0;
  }

  create() {
    this.columnDiv = document.createElement('div');
    this.parent.appendChild(this.columnDiv);
    this.columnDiv.setAttribute('class', 'columnDiv');
    this.nameDiv = document.createElement('div');
    this.columnDiv.appendChild(this.nameDiv);
    this.nameDiv.innerHTML = this.name;


    this.contDiv = document.createElement('div');
    this.contDiv.setAttribute('class', 'contDiv');
    this.columnDiv.appendChild(this.contDiv);
    this.contCreate();
    this.addDiv = document.createElement('div');
    this.addDiv.innerHTML = '+ Add another card';
    this.addDiv.setAttribute('class', 'addDiv');
    this.columnDiv.appendChild(this.addDiv);
    this.addListener();
  }

  contCreate() {
    for (const elem of this.cont) {
      const card = new Card(this.contDiv, elem, this);
      card.create();
    }
  }

  addListener() {
    this.addDiv.addEventListener('click', () => {
      const cardNew = new CardNew(this.contDiv);
      cardNew.create();
    });
  }

  delListener() {
    this.del.addEventListener('click', () => {
      this.parent.removeChild(this.form);
    });
  }

  removeCard(card) {
    this.contDiv.removeChild(card);
  }
}
