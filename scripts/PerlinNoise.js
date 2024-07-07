(function(global) {
    class PerlinNoise {
        constructor(seed) {
            this.seed = seed;
        }

        noise(x, y) {
            // Simple Perlin noise function for demonstration
            return (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        }
    }

    global.PerlinNoise = PerlinNoise;

})(window);
