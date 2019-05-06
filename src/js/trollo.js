import Column from './column.js';

export default class Trollo {
  constructor(parent) {
    this.storage = null;
    this.parent = parent;
    this.todo = 0;
    this.inProg = 0;
    this.done = 0;
    this.todoCont = ['1', '2', '3'];
    this.inProgCont = ['4', '5', '6'];
    this.doneCont = ['7', '8', '9'];
    this.trolloDiv = 0;
  }

  create() {
    if (localStorage.getItem('todo') !== null) {
      this.todoCont = JSON.parse(localStorage.getItem('todo'));
      this.inProgCont = JSON.parse(localStorage.getItem('inProg'));
      this.doneCont = JSON.parse(localStorage.getItem('done'));
    }
    this.trolloDiv = document.createElement('div');
    this.parent.appendChild(this.trolloDiv);
    this.trolloDiv.setAttribute('class', 'trolloDiv');
    this.todo = new Column(this.trolloDiv, this.todoCont, 'Todo');
    this.todo.create();
    this.inProg = new Column(this.trolloDiv, this.inProgCont, 'In progress');
    this.inProg.create();
    this.done = new Column(this.trolloDiv, this.doneCont, 'Done');
    this.done.create();
  }

  static contUpdate() {
    this.todoCont = [];
    this.inProgCont = [];
    this.doneCont = [];
    const column = document.querySelectorAll('.columnDiv');
    const todo = column[0].querySelectorAll('.cardDiv');
    for (const card of todo) {
      try {
        const del = card.querySelector('.del');
        del.parentNode.removeChild(del);
      } catch (e) {}
      this.todoCont.push(card.textContent);
    }

    const inProgCont = column[1].querySelectorAll('.cardDiv');
    for (const card of inProgCont) {
      try {
        const del = card.querySelector('.del');
        del.parentNode.removeChild(del);
      } catch (e) {}
      this.inProgCont.push(card.textContent);
    }

    const done = column[2].querySelectorAll('.cardDiv');
    for (const card of done) {
      try {
        const del = card.querySelector('.del');
        del.parentNode.removeChild(del);
      } catch (e) {}
      this.doneCont.push(card.textContent);
    }
    localStorage.setItem('todo', JSON.stringify(this.todoCont));
    localStorage.setItem('inProg', JSON.stringify(this.inProgCont));
    localStorage.setItem('done', JSON.stringify(this.doneCont));
  }
}
