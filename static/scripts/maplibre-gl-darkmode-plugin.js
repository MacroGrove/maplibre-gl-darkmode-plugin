class MapLibreDarkMode {
    /**
      * 
      * @param {*} map 
      */
    onAdd(map) {
        this._map = map;
        this._map.on('load', function () {
            document.getElementById('mode')
                .addEventListener('click', function (event) {
                    const style = event.target.value;
                    let isLight = true;
                    console.log("clicks");
                    if (style === "alidade_smooth") {
                        isLight = false;
                    }

                    this._map.setStyle(`https://tiles.stadiamaps.com/styles/${isLight ? 'alidade_smooth_dark' : 'alidade_smooth'}}.json`)
                });
        });

        // this._button = this.addButton();
        // this._button.addEventListener('click', this.changeMode);

        // return this._button;
    }

    /**
     * 
     */
    onRemove() {
        this._select.parentNode.removeChild(this._button);
        this.map = undefined;
    }
}