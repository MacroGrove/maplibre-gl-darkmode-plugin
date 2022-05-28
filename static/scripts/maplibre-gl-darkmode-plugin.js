class MapLibreDarkMode {

    constructor(options) {
        options = Object.assign({}, options);

        if (!(this instanceof MapLibreDarkMode)) {
            throw new Error('Instantiation Error: MapLibreDarkMode needs to be called with the new keyword.');
        }

        // Varables
        this.isLight = options.isLight;
        this.lightTheme = options.lightTheme || 'https://tiles.stadiamaps.com/styles/alidade_smooth.json';
        this.darkTheme = options.darkTheme || 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json';
        this.currentTheme = this.isLight ? this.lightTheme : this.darkTheme;

        // Methods
        this.initialize = this.initialize.bind(this);
        this.changeMode = this.changeMode.bind(this);
        this.addButton = this.addButton.bind(this);
    }

    initialize() {
        console.log(`Initialize: ${this.isLight}`);
        map.setStyle(this.currentTheme);
    }

    changeMode() {
        console.log('Changing mode');
        let button = document.getElementById('dark-mode-btn');

        if (this.isLight) {
            console.log(`Dark Theme: ${this.darkTheme}`);
            map.setStyle(this.darkTheme);
            button.value = "dark";
            button.textContent = "Light Mode";
            this.isLight = false;
        } else {
            console.log(`Light Theme: ${this.lightTheme}`);
            map.setStyle(this.lightTheme);
            button.value = "light";
            button.textContent = "Dark Mode";
            this.isLight = true;
        }
    }

    addButton() {
        let button = document.createElement('button');
        button.className = 'maplibregl-ctrl';
        button.id = 'dark-mode-btn';

        if (this.isLight) {
            button.textContent = "Dark Mode";
            button.value = 'light';
        } else {
            button.textContent = "Light Mode";
            button.value = 'dark';
        }

        return button;
    }

    onAdd(map) {
        this._map = map;
        this._map.once('style.load', this.initialize);

        this._button = this.addButton();
        this._button.addEventListener('click', this.changeMode)

        return this._button;
    }

    onRemove() {
        this._select.parentNode.removeChild(this._button);
        this._map.off('style.load', this.initialize);
        this.map = undefined;
    }
}