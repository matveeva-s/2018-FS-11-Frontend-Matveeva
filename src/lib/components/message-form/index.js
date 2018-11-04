import shadowStyles from './shadow.css';

//const slotName = 'message-input';


const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<div class="header"></div>
		<div class="title">
		 <p align="left"> <img class="avatar" src="images/icon.png"> </p>
		  <p><span class="name"><strong> Jennifer </strong></span><br>
		     was online 2 hours ago </p>
		</div>
				  
		<div class="result"></div>
		<form-input name="message_text" placeholder="Write a message here..." slot="message-input">
			<span slot="icon"></span>
		</form-input>
	</form>
`;


class MessageForm extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._initElements();
		this._addHandlers();
	}

	static get observedAttributes() {
		return [
			"action",
			"method"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.form[attrName] = newVal;
	}

	_initElements () {
		var form = this.shadowRoot.querySelector('form');
		var message = this.shadowRoot.querySelector('.result');
		this._elements = {
			form: form,
			message: message
		};
	}

	_addHandlers () {
		this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
		this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
		//this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
	}

	_onSubmit (event) {
		this._elements.message.innerText = Array.from(this._elements.form.elements).map(
			el => el.value
		).join(', ');
		event.preventDefault();
		return false;
	}

	_onKeyPress (event) {
		if (event.keyCode == 13) {
			this._elements.form.dispatchEvent(new Event('submit'));
		}
	}
}

customElements.define('message-form', MessageForm);
