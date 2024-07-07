(function(global) {
    class RoadGenerator {
        constructor(tileMap, aStar) {
            this.tileMap = tileMap;
            this.aStar = aStar;
        }

        generateRoads() {
            const start = { x: Math.floor(Math.random() * this.tileMap.map[0].length), y: Math.floor(Math.random() * this.tileMap.map.length) };
            const end = { x: Math.floor(Math.random() * this.tileMap.map[0].length), y: Math.floor(Math.random() * this.tileMap.map.length) };
            const path = this.aStar.findCurvedPath(start, end);

            for (let node of path) {
                this.tileMap.map[node.y][node.x] = 'road';
            }

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

    global.RoadGenerator = RoadGenerator;

})(window);
