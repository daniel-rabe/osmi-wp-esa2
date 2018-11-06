#### URL

https://informatik.th-brandenburg.de/~rabedani/index.html

Wichtig: Python-Skript zur Datenspeicherung muss lokal gestartet sein und über http://localhost:5000 erreichbar sein

#### Framework für DOM-Manipulation
* React

#### State-Manager
* MobX

#### Backend
* Flask (Python), JSON-Datei

---

Ich habe Komponenten von Material-UI genutzt, diese haben bereits ein Layout, das ich nur wenig verändert habe.
Meine Layout Anpassungen sind zum Teil Inline, aber ich habe auch den JSS-Wrapper (withStyles) von Material-UI genutzt um beim Erzeugen der Komponenten CSS-Klassen zu generieren die als Style-Block in den html-head eingefügt werden.

---

##### Kurze Erklärung zu React

Mit React kann man Komponenten implementieren, diese sind, vereinfacht ausgedrückt, Klassen mit einer render-Funktion.

Wird die erstellte React-Komponente in den DOM eingebunden (mit Hilfe von react-dom) wird der Rückgabe-Wert der render-Funktion in den DOM eingefügt. (siehe index.tsx)

Die React-Komponenten haben Eigenschaften (props) und können einen Zustand (state) haben. Wenn sich eine Eigenschaft ändert wird die render funktion ausgeführt und das Element das sich bereits im DOM befindet mit dem Resultat der render-funktion verglichen und nur die veränderten teile neu gerendert. z.B. Wenn sich nur der Name der css-klasse ändert wird nicht eine neues DOM-Element mit dem neuen Klassennamen eingefügt sondern der Klassenname des bereits im DOM vorhandenen Elements geändert.

```
ReactDOM.render(
    <EigeneKomponente eigenschaft1="hallo"/>,
    document.getElementById('hierEinfuegen')
)
```

Der Rückgabewert der render-funktion kann eine normale HTML-Komponente (div,input, p etc) sein oder eine andere React-Komponente.

Bsp:

```
class EigeneKomponente {
    function render() {
        return <span>{this.props.eigenschaft1}</span>;
    }
}
```

Wenn man mehrere Komponenten zusammenfassen will kann man diese in der render-funktion in <React.Fragment> kapseln.

Bsp:

```
<React.Fragment>
    <div id="1"/>
    <EigeneKomponente eigenschaft1="foo"/>
    <div id="2"/>
</React.Fragment>
```

##### Hinweis zur Syntax

Diese Mischform von javascript und html Code nennt sich JSX, alternativ kann man auch nur javascript schreiben.

```
    JSX:
    function render() {
        return <div id="1"><div id="2"/></div>;
    }

    JS:
    function render() {
        return React.createElement(
            'div', # DOM-Element-Name oder React-Komponente
            {id: 1}, # props
            React.createElement('div', {id: 2}) # Child-Komponenten
        );
    }

```

##### Persistierung

Die Einträge werden in einer JSON Datei gespeichert, der Zugriff auf die Datei erfolgt über ein Python (flask) Skript (Python 2.7). 

Benötigte Module stehen in der requirements.txt.

Die URL zum laufenden Backend muss in der .env eingetragen werden.


##### Testen

```yarn test```

oder

```npm run text```