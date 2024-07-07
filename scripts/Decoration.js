(function(global) {
    class Decoration {
        constructor(tileMap) {
            this.tileMap = tileMap;
        }

        placeDecorations() {
            this.placeClusters('tree', 10, 5);
            this.placeClusters('bush', 8, 3);
        }

        placeClusters(tileType, clusterCount, clusterSize) {
            const map = this.tileMap.map;

            for (let i = 0; i < clusterCount; i++) {
                const startX = Math.floor(Math.random() * (map[0].length - clusterSize));
                const startY = Math.floor(Math.random() * (map.length - clusterSize));

                for (let x = startX; x < startX + clusterSize; x++) {
                    for (let y = startY; y < startY + clusterSize; y++) {
                        if (this.isWithinBounds(x, y)) {
                            map[y][x] = tileType;
                        }
                    }
                }
            }
        }

        isWithinBounds(x, y) {
            return x >= 0 && x < this.tileMap.map[0].length && y >= 0 && y < this.tileMap.map.length;
        }
    }

    global.Decoration = Decoration;

})(window);
