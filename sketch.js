var cols;
var rows;
var w, h;
var type;
var grid = new Array(cols);
var start, end;
var begin = false;
var movingStart = false;
var movingEnd = false;

var astarfinder = new AstarFinder();

function randomizeBoard(percent) {
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			if(!grid[i][j].start && !grid[i][j].end) {
				grid[i][j].wall = false;
			}
		}
	}
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++) {
			if(!grid[i][j].start && !grid[i][j].end) {
				if(random(1) < percent) grid[i][j].wall = true;
			}
		}
	}
}

function removeFromArray(arr, elt) {
	for(var i = arr.length - 1; i >= 0; i--) {
		if(arr[i] == elt) arr.splice(i, 1);
	}
}

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
	var cWidth = windowWidth;
	var cHeight = windowHeight - document.getElementById('operations').clientHeight;
	createCanvas(cWidth, cHeight);

	cols = Math.ceil((cWidth / 10) / 2);
	rows = Math.ceil((cHeight / 10) / 2);

	w = width / cols;
	h = height / rows;

	type = 'A*';
	if(type == 'A*') {
		astarfinder.setup();
	}
}

function draw() {

	background(255);

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
					if(!movingStart && !movingEnd && !grid[i][j].start && !grid[i][j].end) {
						grid[i][j].wall = true;
					}
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