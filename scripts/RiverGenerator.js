// File: scripts/RiverGenerator.js

class RiverGenerator {
    constructor(tileMap, aStar) {
        this.tileMap = tileMap;
        this.aStar = aStar;
    }

    generateRivers() {
        const rows = this.tileMap.map.length;
        const cols = this.tileMap.map[0].length;
        const start = { x: 0, y: Math.floor(rows / 2) };
        const end = { x: cols - 1, y: Math.floor(rows / 2) };
        const path = this.aStar.findPath(start, end);

        for (let node of path) {
            this.tileMap.map[node.y][node.x] = 'water';
        }

        // Add meandering effect
        this.addMeanders(path);
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

    isWithinBounds(x, y) {
        return x >= 0 && x < this.tileMap.map[0].length && y >= 0 && y < this.tileMap.map.length;
    }
}
