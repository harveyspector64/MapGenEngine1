// File: scripts/RoadGenerator.js

class RoadGenerator {
    constructor(tileMap, aStar) {
        this.tileMap = tileMap;
        this.aStar = aStar;
    }

    generateRoads() {
        const start = { x: 0, y: 0 };
        const end = { x: this.tileMap.map[0].length - 1, y: this.tileMap.map.length - 1 };
        const path = this.aStar.findPath(start, end);

        for (let node of path) {
            this.tileMap.map[node.y][node.x] = 'road';
        }
    }
}
