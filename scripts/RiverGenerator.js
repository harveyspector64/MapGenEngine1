(function(global) {
    class RiverGenerator {
        constructor(tileMap, aStar) {
            this.tileMap = tileMap;
            this.aStar = aStar;
        }

        generateRivers() {
            const rows = this.tileMap.map.length;
            const cols = this.tileMap.map[0].length;
            const start = { x: 0, y: Math.floor(Math.random() * rows) };
            const end = { x: cols - 1, y: Math.floor(Math.random() * rows) };
            const path = this.aStar.findCurvedPath(start, end);

            for (let node of path) {
                this.tileMap.map[node.y][node.x] = 'water';
            }

            this.addMeanders(path);
            this.addLakesAndPonds();
        }

        addMeanders(path) {
            for (let i = 1; i < path.length - 1; i++) {
                const node = path[i];
                if (Math.random() < 0.3) {
                    const direction = Math.random() > 0.5 ? 1 : -1;
                    if (this.isWithinBounds(node.x + direction, node.y)) {
                        this.tileMap.map[node.y][node.x + direction] = 'water';
                    }
                    if (this.isWithinBounds(node.x, node.y + direction)) {
                        this.tileMap.map[node.y + direction][node.x] = 'water';
                    }
                }
            }
        }

addLakesAndPonds() {
    const noise = new global.PerlinNoise(Date.now());
    for (let y = 0; y < this.tileMap.map.length; y++) {
        for (let x = 0; x < this.tileMap.map[0].length; x++) {
            if (noise.noise(x / 10, y / 10) > 0.5) {
                this.tileMap.map[y][x] = 'water';
            }
        }
    }
}

        }

        isWithinBounds(x, y) {
            return x >= 0 && x < this.tileMap.map[0].length && y >= 0 && y < this.tileMap.map.length;
        }
    }

    global.RiverGenerator = RiverGenerator;

})(window);
