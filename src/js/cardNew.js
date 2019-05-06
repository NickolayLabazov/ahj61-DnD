import Card from './card';
import Trollo from './trollo.js';

export default class CardNew {
  constructor(parent) {
    this.parent = parent;
    this.text = '';
    this.form = 0;
    this.input = 0;
    this.button = 0;
    this.del = 0;
  }

  create() {
    this.form = document.createElement('form');
    this.parent.appendChild(this.form);
    this.form.setAttribute('class', 'form');
    this.input = document.createElement('textarea');
    this.input.setAttribute('class', 'textar');
    this.input.setAttribute('rows', '8');
    const buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('class', 'buttonDiv');
    this.button = document.createElement('button');
    this.form.appendChild(this.input);
    this.form.appendChild(buttonDiv);
    buttonDiv.appendChild(this.button);
    this.button.innerHTML = 'Add card';
    this.button.setAttribute('class', 'buttonAdd');
    this.del = document.createElement('div');
    this.del.setAttribute('class', 'del');
    buttonDiv.appendChild(this.del);
    this.del.innerHTML = '&#10060';
    this.addListener();
    this.delListener();
  }

  addListener() {
    this.button.addEventListener('click', () => {
      event.preventDefault();
      this.text = this.input.value;
      const card = new Card(this.parent, this.text);
      card.create();
      this.parent.removeChild(this.form);
      Trollo.contUpdate();
    });
  }

  delListener() {
    this.del.addEventListener('click', () => {
      this.parent.removeChild(this.form);
    });
  }
}
