/* globals Set */

class Queue {
    constructor() {
        this.vals = [];
    }

    enqueue(value) {
        this.vals.push(value);
    }

    dequeue() {
        return this.vals.shift();
    }

    isEmpty() {
        return this.vals.length === 0;
    }
}

class Graph {
    constructor(nodesCount) {
        this._nodes = Array.from({ length: nodesCount + 1,
        }, () => []);
    }

    addEdge(x, y) {
        this.addDirectedEdge(x, y);
        this.addDirectedEdge(y, x);
    }

    addDirectedEdge(from, to) {
        this._nodes[from].push(to);
    }

    existPathBetween(from, to) {
        const used = new Set();
        
        const dfs = (vertex) => {
            this._nodes[vertex]
                .filter((next) => !used.has(next))
                .forEach((next) => {
                    used.add(next);
                    dfs(next);
                });
        };

        dfs(from);

        return used.has(to);
    }

    shortestPath (from, to) {
        const queue = new Queue();
        queue.enqueue({
            vertex: from,
            level: 0,
        });
        const used = new Set();
        used.add(from);

        while (!queue.isEmpty()) {
            const {
                vertex,
                level,
            } = queue.dequeue();

            for (let i = 0; i < this._nodes[vertex].length; i+=1) {
                const next = this._nodes[vertex][i];
                if (used.has(next)) {
                    continue;
                }

                if (next === to) {
                    return level + 1;
                }
                
                queue.enqueue({
                    vertex: next,
                    level: level + 1,
                });
                used.add(next);
            }
        }
    }
}

const graph = new Graph(8);
graph.addEdge(1, 6);
graph.addEdge(1, 8);
graph.addEdge(2, 3);
graph.addEdge(2, 4);
graph.addEdge(2, 6);
graph.addEdge(2, 8);
graph.addEdge(3, 6);
graph.addEdge(5, 2);
graph.addEdge(6, 8);

// graph._nodes.forEach((row) => console.log(row));

console.log(graph.existPathBetween(1, 3));
console.log(graph.existPathBetween(7, 8));
console.log(graph.shortestPath(1, 4));

