var bar = 173;
var leng = 100;
var nny = 0;
var nnx = 0;
var ny = 0;

var scn = [new Tile([100,bar],0,leng, true), new Tile([150,bar],1,leng, true), new Tile([300,bar],2,leng, true), new Tile([350,bar],3,leng, true), new Tile([500,bar],4,leng, true), new Tile([625,bar],5,leng, true), new Tile([800,bar + 87],6,leng, true)];
// Scene array of objects

var dragPoint = null;


function setup() {
  createCanvas(1100, 1100);
  
  button = createButton('Clear Board');
  button.position(975,bar + 25);
  button.mousePressed(() => {
    scn = [new Tile([100,bar],0,leng, true), new Tile([150,bar],1,leng, true), new Tile([300,bar],2,leng, true), new Tile([350,bar],3,leng, true), new Tile([500,bar],4,leng, true), new Tile([625,bar],5,leng, true), new Tile([800,bar + 87],6,leng, true)];
  });
  
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}

function draw() {
  background(255);
  
  fill(0)
  textSize(50);
  text('Intersection Puzzle Playground',200,50);
  textSize(20);
  stroke(0);
  text('Left-click and drag the shapes to make a puzzle. Right-click pieces to delete them or click the button to clear the whole board in one go.', 125,80,800);
  strokeWeight(1);
  fill(255);
  stroke(255);
  
  for (var i = 0; i < scn.length; i++) {
    scn[i].drawShape();
  }

}

function mousePressed() {
  for(let i = scn.length - 1; i >= 0; i--) {
    if(scn[i].inside()) {
      if (mouseButton == LEFT) {
        if (!(scn[i].immortal)) {
          dragPoint = scn.splice(i, 1)[0];
        }
        else {
          dragPoint = new Tile(scn[i].pos, scn[i].flavour, scn[i].length, false);
        }
        // bring the drag point to the front
        scn.push(dragPoint);
        break;
      }
      if (mouseButton == RIGHT && !(scn[i].immortal)) {
        scn.splice(i,1);
      }
    }
  }
}

function mouseDragged() {
  if (dragPoint) {
    nearest();
    if (dragPoint.flavour == 0 || dragPoint.flavour == 2 || dragPoint.flavour == 4 || dragPoint.flavour == 6) {
      dragPoint.pos = [nnx, nny];
      dragPoint.compute();
    }
    if (dragPoint.flavour == 1 || dragPoint.flavour == 3) {
      dragPoint.pos = [nnx-leng, nny];
      dragPoint.compute();
    }
    if (dragPoint.flavour == 5) {
      dragPoint.pos = [nnx- leng/2, nny - leng*0.866025403];
      dragPoint.compute();
    }
  }
}

function mouseReleased() {
  dragPoint = null;
}

function nearest() {
  ny = Math.round(mouseY/leng/0.8660250);
  nny = ny*leng*0.866025403;
  
  if (ny % 2 == 0) {
    nnx = Math.round(mouseX/leng)*leng;
  }
  else {
    nnx = Math.round((mouseX-leng/2)/leng)*leng + leng/2;
  }
}
