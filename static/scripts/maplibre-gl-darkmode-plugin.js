class MapLibreDarkMode {

    constructor(options) {

        options = Object.assign({}, options);

        if (!(this instanceof MapLibreDarkMode)) {
            throw new Error('Instantiation Error: MapLibreDarkMode needs to be called with the new keyword.');
        }

        // Booleans
        this.isLight = options.isLight || true;

        // Methods
        this.addButton = this.addButton.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }

    /**
     * 
     */
    changeMode() {
        console.log("change!");
        let style = this._map.getStyle();
        let button = document.getElementsByClassName("maplubregl-ctrl");

        if (this.isLight) {
            button.innerHTML = "light mode";
            style = "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json"
            this.isLight = false;
        } else {
            button.innerHTML = "light mode";
            style = "https://tiles.stadiamaps.com/styles/alidade_smooth.json"
            this.isLight = true;
        }

        this._map.setStyle(Object.assign({}, style));
    }

    // initialize() {

    // }

    addButton() {
        let button = document.createElement('button');
        button.innerHTML = "dark mode";
        button.className = "maplubregl-ctrl";
        button.onclick = function () {
            this.changeMode();
        };

        return button;
    }

    /**
     * 
     * @param {*} map 
     */
    onAdd(map) {
        this._map = map;

        this._button = this.addButton();
        // this._button.addEventListener('click', this.changeMode);

        return this._button;
    }

    /**
     * 
     */
    onRemove() {
        this._select.parentNode.removeChild(this._button);
        this.map = undefined;
    }
}