(function(global) {
    class TileMap {
        constructor(width, height, tileSize) {
            this.width = width;
            this.height = height;
            this.tileSize = tileSize;
            this.map = this.initializeMap();
            this.tiles = {
                'grass': new Image(),
                'field': new Image(),
                'road': new Image(),
                'tree': new Image(),
                'bush': new Image(),
                'hill': new Image(),
                'water': new Image(),
                'barn': new Image(),
                'silo': new Image()
            };
            this.tiles['grass'].src = 'path/to/grass.png';
            this.tiles['field'].src = 'path/to/field.png';
            this.tiles['road'].src = 'path/to/road.png';
            this.tiles['tree'].src = 'path/to/tree.png';
            this.tiles['bush'].src = 'path/to/bush.png';
            this.tiles['hill'].src = 'path/to/hill.png';
            this.tiles['water'].src = 'path/to/water.png';
            this.tiles['barn'].src = 'path/to/barn.png';
            this.tiles['silo'].src = 'path/to/silo.png';
        }

        initializeMap() {
            const rows = Math.floor(this.height / this.tileSize);
            const cols = Math.floor(this.width / this.tileSize);
            const map = [];
            for (let y = 0; y < rows; y++) {
                const row = [];
                for (let x = 0; x < cols; x++) {
                    row.push('grass');
                }
                map.push(row);
            }
            return map;
        }

        generateMap() {
            const wfc = new global.WaveFunctionCollapse(this);
            wfc.run();

            const aStar = new global.AStar(this.map);
            const roadGenerator = new global.RoadGenerator(this, aStar);
            roadGenerator.generateRoads();

            const riverGenerator = new global.RiverGenerator(this, aStar);
            riverGenerator.generateRivers();

            const decoration = new global.Decoration(this);
            decoration.placeDecorations();
        }

        draw(context) {
            for (let y = 0; y < this.map.length; y++) {
                for (let x = 0; x < this.map[y].length; x++) {
                    const tile = this.map[y][x];
                    if (this.tiles[tile].complete) {
                        context.drawImage(this.tiles[tile], x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                    } else {
                        console.error(`Image for tile ${tile} is not loaded`);
                    }
                }
            }
        }
    }

    global.TileMap = TileMap;

})(window);
