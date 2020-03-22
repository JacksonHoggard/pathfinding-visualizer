var cols = 50;
var rows = 50;
var w, h;
var type;
var grid = new Array(cols);
var start, end;
var begin = false;
var movingStart = false;
var movingEnd = false;

var astarfinder = new AstarFinder();

function clearBoard(newType) {
	type = newType;
	begin = false;
	if(type == 'A*') {
		astarfinder.setup();
		astarfinder.path = [];
	}
}

function resetAlgorithm() {
	if(type = 'A*') {
		astarfinder.openSet = [];
		astarfinder.openSet.push(start);
	}
}

function setup() {
	createCanvas(800, 800);

	w = width / cols;
	h = height / rows;

	type = 'A*';
	if(type = 'A*') {
		astarfinder.setup();
	}
}

function draw() {

	background(0);

	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}
	if(type == 'A*') {
		if(begin) astarfinder.pathFind();
		astarfinder.draw();
	}
}

function mousePressed() {
	if(!begin) {
		for(var i = 0; i < cols; i++) {
			for(var j = 0; j < rows; j++) {
				if(grid[i][j].isInBounds(mouseX, mouseY)) {
					if(grid[i][j].start == true) movingStart = true;
					if(grid[i][j].end == true) movingEnd = true;
				}
			}
		}
	}
}

function mouseDragged() {
	if(!begin) {
		for(var i = 0; i < cols; i++) {
			for(var j = 0; j < rows; j++) {
				if(grid[i][j].isInBounds(mouseX, mouseY)) {
					grid[i][j].selected = true;
				} else {
					grid[i][j].selected = false;
				}
			}
		}
	}
}

function mouseReleased() {
	if(!begin) {
		for(var i = 0; i < cols; i++) {
			for(var j = 0; j < rows; j++) {
				if(grid[i][j].selected == true) {
					if(movingStart) {
						start.start = false;
						start = grid[i][j];
						start.start = true;
						start.wall = false;
						resetAlgorithm();
					}
					if(movingEnd) {
						end.end = false;
						end = grid[i][j];
						end.end = true;
						end.wall = false;
					}
				}
				grid[i][j].selected = false;
			}
		}
		movingStart = false;
		movingEnd = false;
	}
}