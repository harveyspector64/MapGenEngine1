// File: scripts/AStar.js

(function(global) {
    class AStar {
        constructor(grid) {
            this.grid = grid;
        }

        findPath(start, end) {
            // Implement the A* pathfinding algorithm
            let openSet = [];
            let closedSet = [];
            let path = [];
            let startNode = new Node(start.x, start.y);
            let endNode = new Node(end.x, end.y);
            openSet.push(startNode);

            while (openSet.length > 0) {
                let currentNode = openSet.reduce((prev, curr) => (prev.f < curr.f ? prev : curr));

                if (currentNode.equals(endNode)) {
                    let temp = currentNode;
                    path.push(temp);
                    while (temp.previous) {
                        path.push(temp.previous);
                        temp = temp.previous;
                    }
                    return path.reverse();
                }

                openSet = openSet.filter(node => !node.equals(currentNode));
                closedSet.push(currentNode);

                let neighbors = this.getNeighbors(currentNode);

                for (let neighbor of neighbors) {
                    if (closedSet.includes(neighbor) || neighbor.isObstacle(this.grid)) continue;

                    let tentativeG = currentNode.g + 1;

                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    } else if (tentativeG >= neighbor.g) {
                        continue;
                    }

                    neighbor.g = tentativeG;
                    neighbor.h = this.heuristic(neighbor, endNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = currentNode;
                }
            }

            return []; // No path found
        }

        getNeighbors(node) {
            let neighbors = [];
            let { x, y } = node;

            if (y > 0) neighbors.push(new Node(x, y - 1));
            if (x < this.grid[0].length - 1) neighbors.push(new Node(x + 1, y));
            if (y < this.grid.length - 1) neighbors.push(new Node(x, y + 1));
            if (x > 0) neighbors.push(new Node(x - 1, y));

            return neighbors;
        }

        heuristic(a, b) {
            // Manhattan distance
            return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
        }
    }

    class Node {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.g = 0;
            this.h = 0;
            this.f = 0;
            this.previous = null;
        }

        equals(other) {
            return this.x === other.x && this.y === other.y;
        }

        isObstacle(grid) {
            return grid[this.y][this.x] === 'water';
        }
    }

    // Expose AStar to the global object
    global.AStar = AStar;

})(window);
