// File: scripts/WaveFunctionCollapse.js

(function(global) {
    class WaveFunctionCollapse {
        constructor(tileMap) {
            this.tileMap = tileMap;
            this.patterns = this.generatePatterns();
        }

        generatePatterns() {
            // Define patterns based on the provided tiles and rules
            const patterns = {
                grass: ['field', 'road', 'tree', 'bush', 'hill', 'barn', 'silo', 'water'],
                field: ['grass', 'road', 'tree', 'bush'],
                road: ['grass', 'field', 'tree', 'bush'],
                tree: ['grass', 'field', 'road'],
                bush: ['grass', 'field', 'road'],
                hill: ['grass', 'field'],
                barn: ['grass', 'field'],
                silo: ['grass', 'field'],
                water: ['grass', 'field']
            };
            return patterns;
        }

        run() {
            const { width, height, tileSize, map } = this.tileMap;
            const rows = Math.ceil(height / tileSize);
            const cols = Math.ceil(width / tileSize);

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const tileChoices = this.getPossibleTiles(x, y);
                    const chosenTile = this.chooseTile(tileChoices);
                    map[y][x] = chosenTile;
                    console.log(`Placed ${chosenTile} at (${x}, ${y})`);
                }
            }

            // Ensure fields are organized
            this.organizeFields();
        }

        organizeFields() {
            const { map } = this.tileMap;
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
            const clusterCount = 10; // Number of clusters
            const clusterSize = 5; // Size of each cluster

            for (let i = 0; i < clusterCount; i++) {
                const startX = Math.floor(Math.random() * this.tileMap.map[0].length);
                const startY = Math.floor(Math.random() * this.tileMap.map.length);
                const cluster = [];

                for (let x = startX; x < startX + clusterSize; x++) {
                    for (let y = startY; y < startY + clusterSize; y++) {
                        cluster.push({ x, y });
                    }
                }

                clusters.push(cluster);
            }

            return clusters;
        }

        getPossibleTiles(x, y) {
            // Return possible tiles based on neighboring tiles
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
            const { map } = this.tileMap;
            const neighbors = [];

            if (y > 0) neighbors.push(map[y - 1][x]); // North
            if (x < map[0].length - 1) neighbors.push(map[y][x + 1]); // East
            if (y < map.length - 1) neighbors.push(map[y + 1][x]); // South
            if (x > 0) neighbors.push(map[y][x - 1]); // West

            return neighbors;
        }

        chooseTile(choices) {
            // Randomly choose a tile from the possible choices
            const randomIndex = Math.floor(Math.random() * choices.length);
            return choices[randomIndex];
        }

        isWithinBounds(x, y) {
            return x >= 0 && x < this.tileMap.map[0].length && y >= 0 && y < this.tileMap.map.length;
        }
    }

    // Expose WaveFunctionCollapse to the global object
    global.WaveFunctionCollapse = WaveFunctionCollapse;

})(window);
