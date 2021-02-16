class UserCard extends HTMLElement {
    constructor(){
        super();
        this.innerHTML = `Mon HTML`;
    }
}

window.customElements.define('user-card', UserCard);