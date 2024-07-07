(function(global) {
    class WaveFunctionCollapse {
        constructor(tileMap) {
            this.tileMap = tileMap;
            this.patterns = this.generatePatterns();
        }

        generatePatterns() {
            const patterns = {
                'grass': ['grass', 'road', 'tree', 'bush', 'hill'],
                'field': ['field', 'road'],
                'road': ['grass', 'road', 'field'],
                'tree': ['grass', 'tree'],
                'bush': ['grass', 'bush']
            };
            return patterns;
        }

        generateMap() {
            const rows = this.tileMap.map.length;
            const cols = this.tileMap.map[0].length;
            const map = this.tileMap.map;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const tileChoices = this.getPossibleTiles(x, y);
                    const chosenTile = this.chooseTile(tileChoices);
                    map[y][x] = chosenTile;
                    console.log(`Placed ${chosenTile} at (${x}, ${y})`);
                }
            }

            this.organizeFields();
        }

        organizeFields() {
            const map = this.tileMap.map;
            const fieldClusters = this.createFieldClusters();

            for (let cluster of fieldClusters) {
                for (let { x, y } of cluster) {
                    if (this.isWithinBounds(x, y)) {
                        map[y][x] = 'field';
                    }
                }
            }
        }

        createFieldClusters() {
            const clusters = [];
            const clusterCount = 5;
            const clusterWidth = 5;
            const clusterHeight = 3;

            for (let i = 0; i < clusterCount; i++) {
                const startX = Math.floor(Math.random() * (this.tileMap.map[0].length - clusterWidth));
                const startY = Math.floor(Math.random() * (this.tileMap.map.length - clusterHeight));
                const cluster = [];

                for (let x = startX; x < startX + clusterWidth; x++) {
                    for (let y = startY; y < startY + clusterHeight; y++) {
                        cluster.push({ x, y });
                    }
                }

                clusters.push(cluster);
            }

            return clusters;
        }

        getPossibleTiles(x, y) {
            const neighbors = this.getNeighbors(x, y);
            let possibleTiles = Object.keys(this.patterns);

            for (const neighbor of neighbors) {
                if (neighbor) {
                    possibleTiles = possibleTiles.filter(tile => this.patterns[neighbor].includes(tile));
                }
            }

            return possibleTiles;
        }

        getNeighbors(x, y) {
            const map = this.tileMap.map;
            const neighbors = [];

            if (y > 0) neighbors.push(map[y - 1][x]);
            if (x < map[0].length - 1) neighbors.push(map[y][x + 1]);
            if (y < map.length - 1) neighbors.push(map[y + 1][x]);
            if (x > 0) neighbors.push(map[y][x - 1]);

            return neighbors;
        }

        chooseTile(choices) {
            const randomIndex = Math.floor(Math.random() * choices.length);
            return choices[randomIndex];
        }

        isWithinBounds(x, y) {
            return x >= 0 && x < this.tileMap.map[0].length && y >= 0 && y < this.tileMap.map.length;
        }
    }

    global.WaveFunctionCollapse = WaveFunctionCollapse;

})(window);
