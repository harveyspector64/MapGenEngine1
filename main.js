// File: main.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize TileMap and start the generation process
    const tileMap = new TileMap(canvas.width, canvas.height, 32);

    // Ensure images are loaded before generating the map and drawing
    let imagesLoaded = 0;
    const totalImages = Object.keys(tileMap.tiles).length;

    for (let key in tileMap.tiles) {
        tileMap.tiles[key].onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                tileMap.generateMap();

                // Generate roads and rivers
                const aStar = new AStar(tileMap.map);
                const roadGenerator = new RoadGenerator(tileMap, aStar);
                roadGenerator.generateRoads();

                const riverGenerator = new RiverGenerator(tileMap, aStar);
                riverGenerator.generateRivers();

                // Place decorations
                const decoration = new Decoration(tileMap);
                decoration.placeDecorations();

                // Drawing the map on the canvas
                tileMap.draw(context);
            }
        };
    }
});
