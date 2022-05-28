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
        let icon = document.getElementById('dark-mode-btn-icon');

        if (this.isLight) {
            console.log(`Dark Theme: ${this.darkTheme}`);

            map.setStyle(this.darkTheme);

            icon.className = 'fa fa-lightbulb';

            button.value = "dark";
            this.isLight = false;
        } else {
            console.log(`Light Theme: ${this.lightTheme}`);

            map.setStyle(this.lightTheme);

            icon.className = 'fa fa-moon';

            button.value = "light";
            this.isLight = true;
        }
    }


    addIcon() {
        let icon = document.createElement('li');
        icon.id = 'dark-mode-btn-icon';

        if (this.isLight) {
            icon.className = 'fa fa-moon';
        } else {
            icon.className = 'fa fa-lightbulb';
        }

        return icon;
    }

    addButton() {
        let button = document.createElement('button');
        button.id = 'dark-mode-btn';
        button.className = 'maplibregl-ctrl';

        if (this.isLight) {
            button.value = 'light';
        } else {
            button.value = 'dark';
        }

        return button;
    }

    onAdd(map) {
        this._map = map;
        this._map.once('style.load', this.initialize);

        this._icon = this.addIcon();

        this._button = this.addButton();
        this._button.addEventListener('click', this.changeMode)

        this._button.appendChild(this._icon);

        return this._button;
    }

    onRemove() {
        this._select.parentNode.removeChild(this._button);
        this._map.off('style.load', this.initialize);
        this.map = undefined;
    }
}