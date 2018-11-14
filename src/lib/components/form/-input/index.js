import styles from './index.css';
import shadowStyles from './shadow.css';

const template = `
  <style>${shadowStyles.toString()}</style>
  <input/>
  <slot name="icon"></slot>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [
      'name',
      'placeholder',
      'value',
      'disabled',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.input[attrName] = newVal;
  }

  _initElements() {
    const hiddenInput = document.createElement('input');
    const input = this.shadowRoot.querySelector('input');
    this.appendChild(hiddenInput);

    this._elements = {
      input,
      hiddenInput,
    };
  }

  _addHandlers() {
    this._elements.input.addEventListener('input', this._onInput.bind(this));
    this._elements.input.addEventListener('submit', this._onSubmit.bind(this));
    this._elements.input.addEventListener('keypress', this._onKeyPress.bind(this));
  }

  _onSubmit(event) {
    this._elements.input.value = '';
    // event.preventDefault();
    // this._elements.hiddenInput.value = this._elements.input.value;
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._elements.input.dispatchEvent(new Event('submit'));
    }
  }

  _onInput() {
    this._elements.hiddenInput.value = this._elements.input.value;
  }
}

customElements.define('form-input', FormInput);
