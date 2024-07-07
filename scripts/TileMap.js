// File: scripts/TileMap.js

class TileMap {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.map = this.initializeMap(width, height, tileSize);
        this.tiles = {
            grass: new Image(),
            field: new Image(),
            road: new Image(),
            tree: new Image(),
            bush: new Image(),
            hill: new Image(),
            barn: new Image(),
            silo: new Image(),
            water: new Image()
        };

        // Load images
        for (let key in this.tiles) {
            this.tiles[key].src = `assets/${key}.png`;
        }
    }

    initializeMap(width, height, tileSize) {
        const rows = Math.ceil(height / tileSize);
        const cols = Math.ceil(width / tileSize);
        const map = Array.from({ length: rows }, () => Array(cols).fill('grass'));
        return map;
    }

    generateMap() {
        const wfc = new WaveFunctionCollapse(this);
        wfc.run();
    }

    draw(context) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                let tile = this.map[y][x];
                context.drawImage(this.tiles[tile], x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
}
