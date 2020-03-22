function Spot(i,j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;
	this.start = false;
	this.end = false;
	this.selected = false;

	if(random(1) < 0.3) {
		this.wall = true;
	}

	this.show = function(col) {
		fill(col);
		if(this.wall) {
			fill(0);
		}
		if(this.start) {
			fill(255, 255, 0);
		}
		if(this.end) {
			fill(107, 0, 255);
		}
		if(this.selected) {
			fill(0, 255, 0);
		}
		noStroke();
		rect(this.i * w, this.j * h, w - 1, h - 1);
	}

	this.addNeighbors = function(grid) {
		var i = this.i;
		var j = this.j;
		if(i < cols - 1) {
			this.neighbors.push(grid[i + 1][j]);
		}
		if(i > 0) {
			this.neighbors.push(grid[i - 1][j]);
		}
		if(j < rows - 1) {
			this.neighbors.push(grid[i][j + 1]);
		}
		if(j > 0) {
			this.neighbors.push(grid[i][j - 1]);
		}
		if(i > 0 && j > 0) {
			this.neighbors.push(grid[i - 1][j - 1]);
		}
		if(i < cols - 1 && j > 0) {
			this.neighbors.push(grid[i + 1][j - 1]);
		}
		if(i > 0 && j < rows - 1) {
			this.neighbors.push(grid[i - 1][j + 1]);
		}
		if(i < cols - 1 && j < rows - 1) {
			this.neighbors.push(grid[i + 1][j + 1]);
		}
	}

	this.isInBounds = function(x, y) {
		if(this.i * w < x && this.j * h < y && x < (this.i * w) + (w - 1) && y < (this.j * h) + (h - 1)) return true;
		return false;
	}
}
