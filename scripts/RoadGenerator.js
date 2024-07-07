(function(global) {
    class RoadGenerator {
        constructor(tileMap, aStar) {
            this.tileMap = tileMap;
            this.aStar = aStar;
        }

        generateRoads() {
            const keyPoints = this.findKeyPoints();
            for (let i = 0; i < keyPoints.length - 1; i++) {
                const start = keyPoints[i];
                const end = keyPoints[i + 1];
                const path = this.aStar.findCurvedPath(start, end);

                for (let node of path) {
                    this.tileMap.map[node.y][node.x] = 'road';
                }
            }
        }

        findKeyPoints() {
            const points = [];
            for (let y = 0; y < this.tileMap.map.length; y++) {
                for (let x = 0; x < this.tileMap.map[0].length; x++) {
                    if (this.tileMap.map[y][x] === 'barn' || this.tileMap.map[y][x] === 'silo') {
                        points.push({ x, y });
                    }
                }
            }
            return points;
        }
    }

    global.RoadGenerator = RoadGenerator;

})(window);
