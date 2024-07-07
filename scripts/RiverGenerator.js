// File: scripts/RiverGenerator.js

class RiverGenerator {
    constructor(tileMap, aStar) {
        this.tileMap = tileMap;
        this.aStar = aStar;
    }

    generateRivers() {
        const start = { x: 0, y: Math.floor(this.tileMap.map.length / 2) };
        const end = { x: this.tileMap.map[0].length - 1, y: Math.floor(this.tileMap.map.length / 2) };
        const path = this.aStar.findPath(start, end);

        for (let node of path) {
            this.tileMap.map[node.y][node.x] = 'water';
        }
    }
}
