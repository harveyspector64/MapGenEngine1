// File: scripts/RoadGenerator.js

(function(global) {
    class RoadGenerator {
        constructor(tileMap, aStar) {
            this.tileMap = tileMap;
            this.aStar = aStar;
        }

        generateRoads() {
            const start = { x: Math.floor(Math.random() * this.tileMap.map[0].length), y: Math.floor(Math.random() * this.tileMap.map.length) };
            const end = { x: Math.floor(Math.random() * this.tileMap.map[0].length), y: Math.floor(Math.random() * this.tileMap.map.length) };
            const path = this.aStar.findPath(start, end);

            for (let node of path) {
                this.tileMap.map[node.y][node.x] = 'road';
            }

            // Allow roads to cross water
            this.allowRoadCrossingWater(path);
        }

        allowRoadCrossingWater(path) {
            for (let node of path) {
                if (this.tileMap.map[node.y][node.x] === 'water') {
                    this.tileMap.map[node.y][node.x] = 'road';
                }
            }
        }
    }

    // Expose RoadGenerator to the global object
    global.RoadGenerator = RoadGenerator;

})(window);
