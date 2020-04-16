/*
I used these two youtube videos:
https://www.youtube.com/watch?v=L-Lsfu4ab74
https://www.youtube.com/watch?v=_cXuvTQl090
for the majority of the javascript (which I'm not good at), and then added CSS for a background image of Choate (which isn't very practical but I couldn't
get the strokes to stop repeating with a regular background color regardless, so might as well make it look nice). I also changed some colors in
javasript. If I had more time on this project, I would probably try to create a visual coordinate plane and have an input field for exact numbers so that
the program could actually be useful, but I couldn't get that to work yet. 
*/
var data = [];
var m = 0;
var b = 0;


function setup() {
  createCanvas(500, 500);
}

function gradientDescent() {
  var learning_rate = 0.1;
  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;
    var guess = m * x + b;
    var error = y - guess;
    m = m + (error * x) * learning_rate;
    b = b + (error) * learning_rate;
  }
}
function drawLine() {
  var x1 = 0;
  var y1= m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;
  
  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  // color of line
  stroke(250,239,182);
  strokeWeight(1.5);

  line(x1, y1, x2, y2);
}
function mousePressed() {
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  var point = createVector(x, y);
  data.push(point);
}
function draw() {

  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    //fill color of a point
    fill(155, 168, 235);
    //color of point outline
    stroke(255);
    ellipse(x, y, 4, 4);
  }
  if (data.length > 1) {
    gradientDescent();
    drawLine();
  }
}
© 2020 GitHub, Inc.
