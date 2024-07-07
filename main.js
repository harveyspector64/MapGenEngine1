// File: main.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const tileMap = new window.TileMap(canvas.width, canvas.height, 32);

    let imagesLoaded = 0;
    const totalImages = Object.keys(tileMap.tiles).length;

    for (let key in tileMap.tiles) {
        tileMap.tiles[key].onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                tileMap.generateMap();

                const aStar = new window.AStar(tileMap.map);
                const roadGenerator = new window.RoadGenerator(tileMap, aStar);
                roadGenerator.generateRoads();

                const riverGenerator = new window.RiverGenerator(tileMap, aStar);
                riverGenerator.generateRivers();

                const decoration = new window.Decoration(tileMap);
                decoration.placeDecorations();

                tileMap.draw(context);
            }
        };
    }
});
