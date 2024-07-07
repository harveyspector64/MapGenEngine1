document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize TileMap and start the generation process
    const tileMap = new TileMap(canvas.width, canvas.height, 32);
    tileMap.generateMap();

    // Drawing the map on the canvas
    tileMap.draw(context);
});
