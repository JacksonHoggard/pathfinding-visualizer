function AstarFinder() {
	this.openSet = [];
	this.closedSet = [];
	this.path = [];

	this.heuristic = function(a, b) {
		var d = dist(a.i, a.j, b.i, b.j);
		return d;
	}
	
	this.setup = function() {
		this.openSet = [];
		this.closedSet = [];

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

		start = grid[0][0];
		end = grid[cols - 1][rows - 1];
		start.start = true;
		end.end = true;
		start.wall = false;
		end.wall = false;

		this.openSet.push(start);
	}

	this.pathFind = function() {
		if(begin) {
			if(this.openSet.length > 0) {

				var low = 0;
				for(var i = 0; i < this.openSet.length; i++) {
					if(this.openSet[i].f < this.openSet[low].f) low = i;
				}
				var current = this.openSet[low];

				if(current == end) {
					// DONE
					begin = false;
					return;
				}

				removeFromArray(this.openSet, current)
				this.closedSet.push(current);

				var neighbors = current.neighbors;
				for(var i = 0; i < neighbors.length; i++) {
					var neighbor = neighbors[i];

					if(!this.closedSet.includes(neighbor) && !neighbor.wall) {
						var tempG = current.g + 1;

						var newPath = false;
						if(this.openSet.includes(neighbor)) {
							if(tempG < neighbor.g) {
								neighbor.g = tempG;
							}
						} else {
							neighbor.g = tempG;
							newPath = true;
							this.openSet.push(neighbor);
						}

						if(newPath) {
							neighbor.h = this.heuristic(neighbor, end);
							neighbor.f = neighbor.g + neighbor.h;
							neighbor.previous = current;
						}
					}
				}

				// go
			} else {
				begin = false;
				return;
				// no solution
			}

			// find the path
			this.path = [];
			var temp = current;
			this.path.push(temp);
			while(temp.previous) {
				this.path.push(temp.previous);
				temp = temp.previous;
			}
		}
	}

	this.draw = function() {
		for(var i = 0; i < this.closedSet.length; i++) {
			this.closedSet[i].show(color(255, 105, 97));
		}

		for(var i = 0; i < this.openSet.length; i++) {
			this.openSet[i].show(color(139, 227, 208));
		}

		var temp = this.path[0];
		for(var i = 1; i < this.path.length; i++) {
			stroke(0, 0, 255);
			strokeWeight(10);
			line(temp.i * w + (w/2), temp.j * h + (h/2), this.path[i].i * w + (w/2), this.path[i].j * h + (h/2));
			temp = this.path[i];
		}
	}
}