class Tile {
  // Position is the (x,y) coords of the "obvious" corner.
  // Types 0-3 inclusive are triangles, either red or blue and either upwards or inverted.
  // Types 4-6 are the various forms of the rhombus.
  constructor(pos, flavour, length, immortal) {
    this.pos = pos;
    this.flavour = flavour;
    this.length = length;
    this.immortal = immortal;
    this.compute();
  }

  compute() {
    this.centroid = [0,0];
    if (this.flavour == 0 || this.flavour == 2) { // Coords for either form of upwards pointing triangle.
      this.corners = [[this.pos[0],this.pos[1]],
                        [this.pos[0] + this.length*0.5, this.pos[1] + this.length*0.866025403],
                        [this.pos[0] + this.length, this.pos[1]]];
    }
    if (this.flavour == 1 || this.flavour == 3) { // Coords for downwards pointing triangles.
      this.corners = [[this.pos[0] + this.length*0.5, this.pos[1] + this.length*0.866025403],
                      [this.pos[0] + this.length, this.pos[1]],
                      [this.pos[0] + this.length*1.5, this.pos[1] + this.length*0.866025403]];
    }
    
    if (this.flavour == 4) { // Coords for rhombus which looks like /0/ (red top and bottom edges)
      this.corners = [[this.pos[0],this.pos[1]],
                      [this.pos[0] + this.length*0.5, this.pos[1] + this.length*0.866025403],
                      [this.pos[0] + this.length*1.5, this.pos[1] + this.length*0.866025403],
                      [this.pos[0] + this.length, this.pos[1]]];
    }
    
    if (this.flavour == 5) { // Coords for rhombus which looks like <>
      this.corners = [[this.pos[0] + this.length, this.pos[1]],
                      [this.pos[0] + this.length*0.5, this.pos[1] + this.length*0.866025403],
                      [this.pos[0] + this.length, this.pos[1] + this.length*1.732050807],
                      [this.pos[0] + this.length*1.5, this.pos[1] + this.length*0.866025403]];
    }
    
    if (this.flavour == 6) { // Coords for rhombus which looks like \0\
      this.corners = [[this.pos[0],this.pos[1]],
                      [this.pos[0] + this.length*0.5, this.pos[1] - this.length*0.866025403],
                      [this.pos[0] + this.length*1.5, this.pos[1] - this.length*0.866025403],
                      [this.pos[0] + this.length, this.pos[1]]];
    }
    
    this.incorners = Array(this.corners.length);
    for (var i = 0; i < this.corners.length; i++) {
      this.centroid[0] += this.corners[i][0];
      this.centroid[1] += this.corners[i][1];
    }
    this.centroid[0] /= this.corners.length;
    this.centroid[1] /= this.corners.length;
    for (var i = 0; i < this.corners.length; i++) {
      this.incorners[i] = [(4*this.corners[i][0] + this.centroid[0])/5,(4*this.corners[i][1] + this.centroid[1])/5];
    }
  }
  
  drawShape() {
    if (this.flavour < 4) {
      if (this.flavour < 2) {
        fill(255,0,0);
      }
      if (this.flavour > 1) {
        fill(0,0,255);
      }
      triangle(this.corners[0][0],this.corners[0][1],this.corners[1][0],this.corners[1][1],this.corners[2][0],this.corners[2][1]);
      fill(255);
      triangle(this.incorners[0][0],this.incorners[0][1],this.incorners[1][0],this.incorners[1][1],this.incorners[2][0],this.incorners[2][1])
    }
    if (this.flavour == 4 || this.flavour == 5) {
      fill(255,0,0);
      quad(this.corners[0][0], this.corners[0][1], this.incorners[0][0], this.incorners[0][1], this.incorners[3][0], this.incorners[3][1],this.corners[3][0], this.corners[3][1]);
      quad(this.corners[1][0], this.corners[1][1], this.incorners[1][0], this.incorners[1][1], this.incorners[2][0], this.incorners[2][1],this.corners[2][0], this.corners[2][1]);
      fill(0,0,255);
      quad(this.corners[0][0], this.corners[0][1], this.incorners[0][0], this.incorners[0][1], this.incorners[1][0], this.incorners[1][1],this.corners[1][0], this.corners[1][1]);
      quad(this.corners[2][0], this.corners[2][1], this.incorners[2][0], this.incorners[2][1], this.incorners[3][0], this.incorners[3][1],this.corners[3][0], this.corners[3][1]);
      fill(255);
    }
    if (this.flavour == 6) {
      fill(0,0,255);
      quad(this.corners[0][0], this.corners[0][1], this.incorners[0][0], this.incorners[0][1], this.incorners[3][0], this.incorners[3][1],this.corners[3][0], this.corners[3][1]);
      quad(this.corners[1][0], this.corners[1][1], this.incorners[1][0], this.incorners[1][1], this.incorners[2][0], this.incorners[2][1],this.corners[2][0], this.corners[2][1]);
      fill(255,0,0);
      quad(this.corners[0][0], this.corners[0][1], this.incorners[0][0], this.incorners[0][1], this.incorners[1][0], this.incorners[1][1],this.corners[1][0], this.corners[1][1]);
      quad(this.corners[2][0], this.corners[2][1], this.incorners[2][0], this.incorners[2][1], this.incorners[3][0], this.incorners[3][1],this.corners[3][0], this.corners[3][1]);
      fill(255);
    }
  }
  
  inside() {
    var x = mouseX-this.pos[0];
    var y = mouseY-this.pos[1];
    if (this.flavour < 4) {
      if (this.flavour == 0 || this.flavour == 2) {
        if (y >= 0 && (x*1.732050807-y) >= 0 && (x*1.732050807+y) <= this.length*1.732050807) {
          return true;
        }
        return false;
      }
      if (this.flavour == 1 || this.flavour == 3) {
        if (y <= this.length*0.866025403 && (x*1.732050807+y) >= this.length*1.732050807 && (x*1.732050807-y) <= this.length*1.732050807) {
          return true;
        }
        return false;
      }
    }
    if (this.flavour == 4) {
      if (y >= 0 && (x*1.732050807-y) >= 0 && y <= this.length*0.866025403 && (x*1.732050807-y) <= this.length*1.732050807) {
        return true;
      }
      return false;
    }
    if (this.flavour == 5) {
      if ((x*1.732050807+y) >= this.length*1.732050807 && (x*1.732050807+y) <= this.length*3.464101615 && (x*1.732050807-y) >= 0 && (x*1.732050807-y) <= this.length*1.732050807) {
          return true;
      }
      return false;
    }
    if (this.flavour == 6) {
      if (y <= 0 && (x*1.732050807+y) >= 0 && (x*1.732050807+y) <= this.length*1.732050807 && y >= -this.length*0.866025403) {
          return true;
      }
      return false;
    }
  }
}