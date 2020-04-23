
let model;

let previous_pen = 'down';

let x, y;

let strokePath;
let seedStrokes = [];


let canvas;

function setup() {
  canvas = createCanvas(640, 480);
  canvas.hide();
  background(230,230,250);
  model = ml5.sketchRNN('hand', modelReady);


  let button = select('#clear');
  button.mousePressed(clearDrawing);
}


function modelReady() {
  canvas.show();

  canvas.mouseReleased(startSketchRNN);
  select('#status').html('Start Drawing a Hand');
}


function clearDrawing() {
  background(230,230,250);

  seedStrokes = [];

  model.reset();
}


function startSketchRNN() {
  x = mouseX;
  y = mouseY;
  model.generate(seedStrokes, gotStroke);
}

function draw() {

  if (mouseIsPressed) {
    stroke(255,255,224);
    strokeWeight(3.0);
    line(pmouseX, pmouseY, mouseX, mouseY);
    let userStroke = {
      dx: mouseX - pmouseX,
      dy: mouseY - pmouseY,
      pen: 'down'
    };
    seedStrokes.push(userStroke);
  }

  if (strokePath) {
    if (previous_pen == 'down') {
      stroke(50);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    x += strokePath.dx;
    y += strokePath.dy;
    previous_pen = strokePath.pen;
    
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}


function gotStroke(err, s) {
  strokePath = s;
}
