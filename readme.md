# Web Component

Dans un template html:
```html
<user-card></user-card>
```
lier ce template a un fichier javascript dans lequel on construit une Class pour `HTMLElement`
```js
class UserCard extends HTMLElement {
    constructor(){
        // apppel le contructeur de la class parente
        super();
    }
}
```
IL est possible de lui ajouter du HTML directement dans le constructeur par :

Noter l'emploi des `backticks` pour pouvoir passer des variables
```js
this.innerHTML = `Mon HTML`;
```

Pour l'injecter dans le DOM, employer la method :
```js
window.customElements.define('user-card', UserCard);
```
Elle prend deux parametres, le nom du tag et le nom de la classe à associer.

## Atteindre un attribut
Dans le js :

```js
this.innerHTML = `${this.getAttribute('name')}`;
```
Dans le html :
```html
<user-card name="Ronan"></user-card>
```
## Définition du style

quand on associe un style de cette manière globale il est ajouté de manière globale et affecte tous les éléments :
```js
this.innerHTML = `<style>h3 {color: blue;}</style><h3>${this.getAttribute('name')}</h3>`;
```
Dans le html : 
```html
<style>
    h3 {
        color: red;
    }
</style>
```

## Shadow Dom

Pour encapsuler, dans le fichier `.js` il suffit de préciser qu'on attache un shadow Dom
```js
this.attachShadow({mode: 'open'});
```

Il faut également définir le `shadow root` et l'ajouter à l'élément.
Ici la variable template (qui contiendra le code interne au custom element) doit être définie.

```js
this.attachShadow({mode: 'open'});
this.shadowRoot.appendChild(template.content.cloneNode(true));
```
La méthode `content.cloneNode()` renvoie une copie du nœud sur lequel elle a été appelée.

true : si les enfants du noeud doivent aussi être clonés.

Création de `template`:
```js 
const template = document.createElement('template');
template.innerHTML = `
<style>
    h3 {
        color: coral;
    }
</style>
<div class="user-card">
    <h3></h3>
</div>
`;

class UserCard extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
    
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('user-card', UserCard);
```

Ici dans :

```js
template.innerHTML = `
<style>
    h3 {
        color: coral;
    }
</style>
<div class="user-card">
    <h3></h3>
</div>
`;
```
Passer par `this` ne fonctionnera plus car nous sommes en dehors de la classe. 

Pour y remedier il suffit de travailler avec un `querySelector();` sur le `shadowRoot` donc la classe.
```js
this.shadowRoot.appendChild(template.content.cloneNode(true));
this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
```
De cette manière le style devient indépendant de celui du template.

Dans l'inspecteur du navigateur, il est bien visible que nous avons un shadow-root:
```bash
<user-card name="Ronan">
    #shadow-root (open)
    <style>
        h3 {
            color: coral;
        }
    </style>
    <div class="user-card"></div>
</user-card>
```

