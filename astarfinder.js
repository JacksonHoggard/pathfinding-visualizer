function AstarFinder() {
	this.openSet = [];
	this.closedSet = [];
	this.path = [];

	this.heuristic = function(a, b) {
		var d = dist(a.i, a.j, b.i, b.j);
		return d;
	}

	this.removeFromArray = function(arr, elt) {
		for(var i = arr.length - 1; i >= 0; i--) {
			if(arr[i] == elt) arr.splice(i, 1);
		}
	}
	
	this.setup = function() {
		console.log('A*');

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

		console.log(grid);
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

				this.removeFromArray(this.openSet, current)
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
			this.closedSet[i].show(color(255, 0, 0));
		}

		for(var i = 0; i < this.openSet.length; i++) {
			this.openSet[i].show(color(0, 255, 0));
		}

		for(var i = 0; i < this.path.length; i++) {
			this.path[i].show(color(0, 0, 255));
		}
	}
}