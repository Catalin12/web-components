/*
Task 1
	Sa se creeze o componenta "avatar" care afiseaza o imagine cu forma circulara.
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
