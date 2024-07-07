class TileMap {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.map = [];
        this.tiles = {
            grass: new Image(),
            field: new Image(),
            dirt: new Image(),
            road: new Image(),
            tree: new Image(),
            bushy_grass: new Image(),
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

    generateMap() {
        // Implement Wave Function Collapse to generate the map
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
