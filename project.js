let cols, rows;
let w = 1;
let grid = [];
let stack = [];
let current;
let input1, input2, frate = 10, frateup, fratedown, stbutton, resbutton;
let dimensionset = 0, dimchosen = 0;
let h, l, hg, wd;
let hell0, instructions1,instructions2,instructions3;
let res = 0;

function setup() {
  //createCanvas(100,100);
  input1 = createInput();
  input2 = createInput();
  input1.position(20, 65);
  input2.position(input1.x + input1.width, 65)

  frateup = createButton('Speed+');
  fratedown = createButton('Speed-');



  stbutton = createButton('Generate');
  stbutton.position(input2.x + input2.width, 65);
  stbutton.mousePressed(greet);
  resbutton = createButton('Reset');
  resbutton.position(stbutton.x + stbutton.width, 65);
  resbutton.mousePressed(reset);
  hell0 = createElement('h1', 'Maze generator');
  hell0.position(20, 5);
  instructions1 = createElement('h4', "The number of rows goes in the first box and the columns in the second");
  instructions1.position(20, input1.y + input1.height);
  instructions2 = createElement('h4', "The numbers of rows and columns should be equal or greater than 2");
  instructions2.position(20, instructions1.y + instructions1.height);

  frateup.position(resbutton.x + resbutton.width, 65)
  fratedown.position(frateup.x + frateup.width, frateup.y);
  frateup.mousePressed(fup);
  fratedown.mousePressed(fdown);
  //background(50);
  frameRate(frate);
}

function draw() {

  if (dimensionset == 0 && dimchosen == 1) {

    //let colsInput = prompt("Enter number of columns:");
    //let rowsInput = prompt("Enter number of rows:");
    sethw();
    canvas = createCanvas(hg, wd);
    canvas.position(700, 30)
    background(55);
    cols = l; 
    rows = h;
    if (width > height) {
      w = height / rows;
    } else {
      w = width / cols;
    }


    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let cell = new Cell(i, j);
        grid.push(cell);
      }
    }

    dimensionset = 1;
    dimchosen = 0;
    current = grid[0];
  }
  if (dimensionset != 0) {
    background(200);

    for (let i = 0; i < grid.length; i++) {
      grid[i].show();
    }
    current.visited = true;
    current.highlight();
    let next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  checkNeighbors() {
    let neighbors = [];

    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  show() {
    let x = this.i * w;
    let y = this.j * w;

    stroke(255);

    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  }

  highlight() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 255, 0);
    rect(x, y, w, w);
  }
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }

}
function greet() {
  if (res == 0) {

    h = input1.value();
    l = input2.value();
    if (h > 1 && l > 1) {

      res = 1;
      dimensionset = 0;
      dimchosen = 1;
    } else {
      alert("Please enter a height and width bigger than 1");
    }
  }
}
function reset() {
  if (res == 1) {
    res = 0;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid.pop();
      }
    }
    resizeCanvas(0, 0);
  }
}
function sethw() {
  if (h > l) {
    hg = 950;
    wd = (950 / l) * h;alert(l)
  }
  if (h == l) {
    hg = 950;
    wd = 950;
  }
  if (h < l) {
    wd = 950;
    hg = (950 / h) * l;
  }
  
}

function fup() {
  if(frate<=100)
  {
    frate += 5;
  }
    frameRate(frate);

}
function fdown() {
  if (frate > 6) {
    frate -= 5;
    frameRate(frate);
  }
}