// File: scripts/Decoration.js

class Decoration {
    constructor(tileMap) {
        this.tileMap = tileMap;
    }

    placeDecorations() {
        for (let y = 0; y < this.tileMap.map.length; y++) {
            for (let x = 0; x < this.tileMap.map[y].length; x++) {
                if (this.tileMap.map[y][x] === 'grass' && Math.random() < 0.1) {
                    this.tileMap.map[y][x] = 'tree';
                } else if (this.tileMap.map[y][x] === 'grass' && Math.random() < 0.05) {
                    this.tileMap.map[y][x] = 'bush';
                }
            }
        }
    }
}
