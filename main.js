// File: main.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize TileMap and start the generation process
    const tileMap = new TileMap(canvas.width, canvas.height, 32);
    const aStar = new AStar(tileMap.map);

    tileMap.generateMap();
    
    // Generate roads and rivers
    const roadGenerator = new RoadGenerator(tileMap, aStar);
    roadGenerator.generateRoads();

    const riverGenerator = new RiverGenerator(tileMap, aStar);
    riverGenerator.generateRivers();

    // Place decorations
    const decoration = new Decoration(tileMap);
    decoration.placeDecorations();

    // Drawing the map on the canvas
    tileMap.draw(context);
});
