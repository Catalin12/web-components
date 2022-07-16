/*
Task 3
	Sa se creeze un custom element numit "word-counter" care extinde <p> si vine in plus cu un buton "Show word count". La apasarea butonului apare numarul de cuvinte din text.
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

class WordCounter extends HTMLParagraphElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateCountWords.content.cloneNode(true));
	}

	revealCount() {
		const numberOfWords = this.shadowRoot.querySelector('p').innerText.split(" ").length;
		alert(`Textul contine ${numberOfWords} cuvinte.`);
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#reveal-count-button').addEventListener('click', () => this.revealCount());
	}
}
customElements.define('word-counter', WordCounter, { extends: 'p' });