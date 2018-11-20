import shadowStyles from './shadow.css';

let oldMessage;
let oldFile;
let oldImage;

const template = `
  <style>${shadowStyles.toString()}</style>
  <form>
    <div class="header"></div>
    <div class="title">
      <p align="left"> <img class="avatar" src="../../src/lib/components/message-form/images/avatar.png" style="margin: auto; padding-right: 10px"></p>
      <p><span class="name"><strong> Jennifer </strong></span><br>was online 2 hours ago </p>
    </div>
    <div class = "result-scroll">		  
      <div id="result" class="result"></div>
    </div>
    <div><label for="addFile">
      <input id="addFile" class="addFileButton" type="file">
    </label></div>
    <div><label for="addImage">
      <input id="addImage" class="addImageButton" type="file" multiple accept="image/*">
    </label></div>
    <form-input name="message_text" placeholder="Write a message here..." slot="message-input">
      <span slot="icon"></span>
    </form-input>
  </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [
      'action',
      'method',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.form[attrName] = newVal;
  }

  _initElements() {
    const form = this.shadowRoot.querySelector('form');
    const message = this.shadowRoot.querySelector('.result');
    const file = this.shadowRoot.querySelector('.addFile');
    this._elements = {
      form,
      message,
      file,
    };
  }

  _addHandlers() {
    this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
    this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
    this._elements.form.addEventListener('clickAddFile', this._onAddFile.bind(this));
    this._elements.form.addEventListener('clickAddImage', this._onAddImage.bind(this));
  }

  _onAddFile(event) {
    const name = Array.from(this._elements.form.elements).map(el => el.value)[0];
    const newFileDiv = document.createElement('div');
    newFileDiv.className = 'cloud';
    newFileDiv.innerHTML = `<font color = 'black'>Added file:</font>` + name.slice(12);
    this._elements.message.appendChild(newFileDiv);
  }

  _onAddImage(event) {
    const newImage = document.createElement('img');
    const name = Array.from(this._elements.form.elements).map(el => el.value)[1].slice(12);
    const url = URL.createObjectURL(this.shadowRoot.getElementById('addImage').files[0]);
    newImage.className = 'preview';
    newImage.src = url;
    this._elements.message.appendChild(newImage);
    this.SendImage(url,name);
    console.log(url, name);
  }

  _onSubmit(event) {
    const text = Array.from(this._elements.form.elements).map(el => el.value);
    const file = text[0];
    const image = text[1];
    const message = text[2];
    if ((file.length + image.length + message.length) === 0 || message === oldMessage) {
      return false;
    }
    if (file.length !== 0 && file !== oldFile) {
      this._elements.form.dispatchEvent(new Event('clickAddFile'));
    }
    if (image.length !== 0 && image !== oldImage) {
      this._elements.form.dispatchEvent(new Event('clickAddImage'));
    }
    const newMessageDiv = document.createElement('div');
    newMessageDiv.className = 'cloud';
    newMessageDiv.innerText = message;
    this._elements.message.appendChild(newMessageDiv);
    this.SendMessage(message);
    oldMessage = message;
    oldFile = file;
    oldImage = image;
    event.preventDefault();
    return false;
  }

  SendImage(url, name) {
    var formData = new FormData();
    formData.append("image", url, name);
    const myInit = {
      method: 'POST',
      body: formData
    };
    const myRequest = new Request('http://127.0.0.1:8081/message');
    fetch(myRequest, myInit).then(response => console.log(response));
  }
  SendMessage(message) {
    var formData = new FormData();
    formData.append("message", message);
    const myInit = {
        method: 'POST',
        body: formData
    };
    const myRequest = new Request('http://127.0.0.1:8081/message');
    fetch(myRequest, myInit).then(response => console.log(response));
  }
  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._elements.form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
