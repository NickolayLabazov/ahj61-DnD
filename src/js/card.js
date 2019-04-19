import Trollo from './trollo.js';

export default class Card {
  constructor(parent, text, column) {
    this.parent = parent;
    this.column = column;
    this.text = text;
    this.cardDiv = 0;
    this.del = 0;
    this.move = null;
    this.up = null;
    this.down = null;
    this.x = null;
    this.y = null;
    this.parentMove = null;
    this.cardMove = null;
    this.SiblingMove = null;
    this.moveDo = false;
  }

  create() {
    this.cardDiv = document.createElement('div');
    this.cardDiv.setAttribute('class', 'cardDiv');
    this.cardDiv.innerHTML = this.text;
    this.parent.appendChild(this.cardDiv);
    this.cardDiv.setAttribute('draggable', 'false');
    this.addListener();
  }

  addListener() {
    this.cardDiv.addEventListener('mouseenter', () => {
      if (!this.moveDo) {
        this.del = document.createElement('div');
        this.del.setAttribute('class', 'del');
        this.cardDiv.appendChild(this.del);
        this.del.innerHTML = '&#10060';
        this.delListener();
      }
    });

    this.cardDiv.addEventListener('mouseleave', () => {
      if (!this.moveDo) {
        this.cardDiv.removeChild(this.del);
        document.body.removeEventListener('mousemove', this.move);
        document.body.removeEventListener('mouseup', this.up);
      }
    });

    this.move = (e) => {
      event.preventDefault();
      this.cardDiv.style.top = `${e.clientY - this.y}px`;
      this.cardDiv.style.left = `${e.clientX - this.x}px`;
    };

    this.up = (e) => {
      event.preventDefault();
      document.body.removeEventListener('mousemove', this.move);
      this.cardDiv.style.display = 'none';
      const elem = document.elementFromPoint(e.clientX, e.clientY);
      this.cardDiv.style.display = 'block';
      this.cardDiv.style.position = 'relative';
      this.cardDiv.style.top = '0px';
      this.cardDiv.style.left = '0px';
      if (elem.classList.contains('cardDiv')) {
        elem.parentNode.insertBefore(this.cardDiv, elem);
      } else {
        this.parentMove.insertBefore(this.cardMove, this.SiblingMove);
      }
      this.parentMove = null;
      this.cardMove = null;
      this.SiblingMove = null;

      Trollo.contUpdate();
      this.moveDo = false;
      this.del = document.createElement('div');
      this.del.setAttribute('class', 'del');
      this.cardDiv.appendChild(this.del);
      this.del.innerHTML = '&#10060';
    };
    this.down = (e) => {
      event.preventDefault();
      this.moveDo = true;
      this.cardDiv.removeChild(this.del);
      const width = this.cardDiv.offsetWidth;
      const top = this.cardDiv.offsetTop - 5;
      const left = this.cardDiv.offsetLeft - 5;
      this.cardDiv.style.width = `${width}px`;
      this.parentMove = this.cardDiv.parentNode;
      this.cardMove = this.cardDiv;
      this.SiblingMove = this.cardDiv.nextSibling;
      document.body.appendChild(this.cardDiv);
      this.cardDiv.style.position = 'absolute';
      this.cardDiv.style.top = `${top}px`;
      this.cardDiv.style.left = `${left}px`;
      this.cardDiv.style.zIndex = 1000;
      this.x = e.clientX - left;
      this.y = e.clientY - top;
      document.body.addEventListener('mousemove', this.move);
      document.body.addEventListener('mouseup', this.up);
    };

    this.cardDiv.addEventListener('mousedown', this.down);
  }

  delListener() {
    this.del.addEventListener('click', (e) => {
      e.stopPropagation();
      this.cardDiv.parentNode.removeChild(this.cardDiv);
    }, true);

    this.del.addEventListener('mouseup', (e) => {
      e.stopPropagation();
    }, true);

    this.del.addEventListener('mousedown', (e) => {
      e.stopPropagation();
    }, true);
  }
}
