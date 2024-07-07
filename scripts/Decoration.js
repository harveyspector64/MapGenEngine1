// File: scripts/Decoration.js

(function(global) {
    class Decoration {
        constructor(tileMap) {
            this.tileMap = tileMap;
        }

        placeDecorations() {
            const clusters = this.createTreeClusters();

            for (let cluster of clusters) {
                for (let { x, y } of cluster) {
                    if (this.isWithinBounds(x, y) && this.tileMap.map[y][x] === 'grass') {
                        this.tileMap.map[y][x] = 'tree';
                    }
                }
            }

            // Place single trees
            for (let y = 0; y < this.tileMap.map.length; y++) {
                for (let x = 0; x < this.tileMap.map[y].length; x++) {
                    if (this.tileMap.map[y][x] === 'grass' && Math.random() < 0.05) {
                        this.tileMap.map[y][x] = 'tree';
                    }
                }
            }

            // Place bushes
            for (let y = 0; y < this.tileMap.map.length; y++) {
                for (let x = 0; x < this.tileMap.map[y].length; x++) {
                    if (this.tileMap.map[y][x] === 'grass' && Math.random() < 0.03) {
                        this.tileMap.map[y][x] = 'bush';
                    }
                }
            }
        }

        createTreeClusters() {
            const clusters = [];
            const clusterCount = 10; // Number of clusters
            const clusterSize = 3; // Size of each cluster

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

        isWithinBounds(x, y) {
            return x >= 0 && x < this.tileMap.map[0].length && y >= 0 && y < this.tileMap.map.length;
        }
    }

    // Expose Decoration to the global object
    global.Decoration = Decoration;

})(window);
