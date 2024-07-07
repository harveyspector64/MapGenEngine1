(function(global) {
    class Decoration {
        constructor(tileMap) {
            this.tileMap = tileMap;
        }

        placeDecorations() {
            const treeClusters = this.createTreeClusters();
            const bushClusters = this.createBushClusters();

            for (let cluster of treeClusters) {
                for (let { x, y } of cluster) {
                    if (this.isWithinBounds(x, y) && this.tileMap.map[y][x] === 'grass') {
                        this.tileMap.map[y][x] = 'tree';
                    }
                }
            }

            for (let cluster of bushClusters) {
                for (let { x, y } of cluster) {
                    if (this.isWithinBounds(x, y) && this.tileMap.map[y][x] === 'grass') {
                        this.tileMap.map[y][x] = 'bush';
                    }
                }
            }
        }

        createTreeClusters() {
            return this.createClusters('tree', 10, 5, 5);
        }

        createBushClusters() {
            return this.createClusters('bush', 10, 3, 3);
        }

        createClusters(type, clusterCount, clusterWidth, clusterHeight) {
            const clusters = [];

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

        isWithinBounds(x, y) {
            return x >= 0 && x < this.tileMap.map[0].length && y >= 0 && y < this.tileMap.map.length;
        }
    }

    global.Decoration = Decoration;

})(window);
