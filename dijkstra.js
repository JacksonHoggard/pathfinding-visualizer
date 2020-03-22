function Dijkstra() {
	this.path = [];
	this.q = [];

	this.heuristic = function(a, b) {
		var d = dist(a.i, a.j, b.i, b.j);
		return d;
	}

	this.setup = function() {
		// Making a 2D array
		for(var i = 0; i < cols; i++) {
			grid[i] = new Array(rows);
		}

		for(var i = 0; i < cols; i++) {
			for(var j = 0; j < rows; j++) {
				grid[i][j] = new Spot(i, j);
			}
		}

		for(var i = 0; i < cols; i++) {
			for(var j = 0; j < rows; j++) {
				grid[i][j].addNeighbors(grid);
			}
		}

		for(var i = 0; i < cols; i++) {
			for(var j = 0; j < rows; j++) {
				grid[i][j].d = 5000;
				grid[i][j].previous = undefined;
				this.q.push(grid[i][j]);
			}
		}

		start = grid[0][0];
		start.d = 0;
		end = grid[cols - 1][rows - 1];
	}

	this.pathfind = function() {
		if(begin) {
			if(this.q.length > 0) {
				var low = 0;
				for(var i = 0; i < this.q.length; i++) {
					if(this.q[i].d < this.q[low].d) low = i;
				}
				var current = this.q[low];
				removeFromArray(this.q, current);

				for(var i = 0; i < current.neighbors.length; i++) {
					if(this.q.includes(current.neighbors[i])) {
						var alt = current.d + this.heuristic(current, current.neighbors[i]);
						if(alt < current.neighbors[i].d) {
							current.neighbors[i].d = alt;
							current.neighbors[i].previous = current;
						}
					}
				}
			}
		}
	}

	this.draw = function() {
		for(var i = 0; i < this.q.length; i++) {
			this.q[i].show(color(255, 0, 0));
		}
	}

}