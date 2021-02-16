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

## Les Slots

dans le template on ajoute un tag `<img>` et une div pour wrapper des infos et un bouton + du style.
```js
template.innerHTML = `
<style>
    h3 {
        color: coral;
    }
    .user-card {
        margin: 2rem 1rem;
        padding: 1rem .5rem;
        border: 1px solid #000;
        text-align: center;
        width: 20rem;
    }
</style>
<div class="user-card">
    <img/>
    <div>
        <h3></h3>
        <div class="info">
            <p>Email :</p>
            <p>Phone :</p>
        </div>
        <button id="toggle-info">Masquer les infos</button>
    </div>
</div>
`;
```
On peut ainsi faire passer des infos par le biais de l'utilisation des slots.
Dans le html il faut créer dans le composant des div avec l'attribut slot:
```html
...
<div slot="email">john@gmail.com</div>
<div slot="phone">06 00 00 00 00</div>
...
```
```js
template.innerHtml = `
    ...
    <div class="user-card">
        <img/>
        <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email" /></p>
                <p><slot name="phone" /></p>
            </div>
            <button id="toggle-info">Masquer les infos</button>
        </div>
    </div>
    ...
`;
```
## Les events

### lifecycle hooks

A partir du moment où le custom element est créé jsqu'au moment où il est détruit, plusieurs choses peuvent se passer entre ces deux étapes.
<ol>
    <li>l'élément est inséré dans le DOM.</li>
    <li>Il est mis à jour par un ou plusieurs évènements.</li>
    <li>L' élément est peurt être effacé du DOM.</li>
</ol>


Tous les étapes ci-dessus sont appelées le `cycle de vie de l’élément`, et on peut se connecter aux événements clés de sa vie avec un certain nombre de fonctions de rappel, appelées : <u>Custom Element Reactions</u>

Les `Custom Element Reactions sont appelées` avec une attention particulère` afin d'éviter que le code ne soit exécuté au milieu d'un autre processus.` 

Elles sont donc retardées jusqu'à ce que toutes les étapes intermédiares soient executées. Elles semblent donc être exécutée de manière synchrone. Afin de garantir que les hooks soient appelés dans le même ordre que leur déclencheur, `chaque Custom Element bénéficie d'une file d'attente dédiée`.

On a alors pas besoin d'inventer un systeme pour constuire et déconstruire des éléments. Ceci est supoorté de manièere native par les navigateurs.

`connectedCallback` est appelé lorsque l'élément personnalisé est connecté pour la première fois au DOM du document.

`disconnectedCallback ` est appelé lorsque l'élément personnalisé est déconnecté du DOM du document.




