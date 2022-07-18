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
		const numberOfWords = document.querySelector("p").getAttribute("text").split(" ").length;
		alert(`Textul contine ${numberOfWords} cuvinte.`);
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#reveal-count-button').addEventListener('click', () => this.revealCount());
		this.shadowRoot.querySelector('.word-counter').textContent = document.querySelector("p").getAttribute("text");
	}
}
customElements.define('word-counter', WordCounter, { extends: 'p' });