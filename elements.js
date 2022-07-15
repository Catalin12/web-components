/*
Task 1
*/

const templateAvatar = document.createElement('template');
templateAvatar.innerHTML = `
  <style>
	.user-avatar img {
		width: 100px;
		border-radius: 50%;
	}
	</style>
	<div class="user-avatar">
		<img />
	</div>
`;
class UserAvatar extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateAvatar.content.cloneNode(true));
		this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
	}
}
window.customElements.define('user-avatar', UserAvatar);

/*
Task 2
*/
class TimeFormatted extends HTMLElement {
	render() {
		let date = new Date(this.getAttribute('datetime') || Date.now());

		this.innerHTML = new Intl.DateTimeFormat("default", {
			year: this.getAttribute('year') || undefined,
			month: this.getAttribute('month') || undefined,
			day: this.getAttribute('day') || undefined,
			hour: this.getAttribute('hour') || undefined,
			minute: this.getAttribute('minute') || undefined,
			second: this.getAttribute('second') || undefined,
			timeZoneName: this.getAttribute('time-zone-name') || undefined,
		}).format(date);
	}
	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
	}
	static get observedAttributes() {
		return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
	}
	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}
}
customElements.define("time-formatted", TimeFormatted);

class LiveTimer extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<time-formatted hour="numeric" minute="numeric" second="numeric"></time-formatted>`;
	}
	updateTimer() {
		this.date = new Date();
		this.firstChild.setAttribute('datetime', this.date);
		const tickEvent = new CustomEvent('tick', { detail: this.date });
		this.dispatchEvent(tickEvent);
		console.log(tickEvent.detail);
	}
	connectedCallback() {
		this.timer = setInterval(() => this.updateTimer(), 1000);
	}
	disconnectedCallback() {
		clearInterval(this.timer);
	}
}
customElements.define("live-timer", LiveTimer);

/*
Task 3
*/
const templateCountWords = document.createElement('template');
templateCountWords.innerHTML = `
	<style>
		.word-counter p {
			border-style: solid;
			border-width: 1px;
		}
	</style>
	<div class="word-counter">
		<p>Acesta este un simplu text.</p>
		<button id="reveal-count-button">Count words</button>
	</div>
`;
class WordCount extends HTMLParagraphElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateCountWords.content.cloneNode(true));
	}
	revealCount() {
		let numberOfWords = this.shadowRoot.querySelector('p').innerText.split(" ").length;
		alert(`Textul contine ${numberOfWords} cuvinte.`);
	}
	connectedCallback() {
		this.shadowRoot.querySelector('#reveal-count-button').addEventListener('click', () => this.revealCount());
	}
}
customElements.define('word-counter', WordCount, { extends: 'p' });