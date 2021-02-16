# Web Compoenent

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
IL est possible de lui ajouter du HTML directement dans le consytructeur par :

Noter l'emploi des `backticks` pour pouvoir passer des variables
```js
this.innerHTML = `Mon HTML`;
```

Pour l'injecter dans le DOM, employer la method :
```js
windows.customElements.define('user-card', UserCard)
```
Elle prend deux parametres, le nom du tag et le nom de la classe a associer.
