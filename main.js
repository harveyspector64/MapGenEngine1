// File: main.js

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const tileMap = new TileMap(canvas.width, canvas.height, 32);
    tileMap.generateMap();
    console.log("Map generated");
    
    tileMap.tiles['grass'].onload = () => {
        console.log("Tiles loaded, drawing map");
        tileMap.draw(context);
    };
});

