/*
Task 2
	https://javascript.info/custom-elements
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

	connectedCallback() {
		this.timer = setInterval(() => {
			this.date = new Date();
			this.firstChild.setAttribute('datetime', this.date);
			const tickEvent = new CustomEvent('tick', { detail: this.date });
			this.dispatchEvent(tickEvent);
		}, 1000);
	}

	disconnectedCallback() {
		clearInterval(this.timer);
	}
}
customElements.define("live-timer", LiveTimer);
document.getElementById("live-timer-id").addEventListener("tick", event => {
	console.log(event);
});