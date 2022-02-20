function Cell(i, j) {
    let baseOffset = floor( random( 0,1 ) ) 
    this.i = i;
    this.j = j;
    this.r = r;
    this.g = g;
    this.b = b;
    this.img;
    this.showBaseImage = false;
    this.baseImage;
    this.loogImg;
    this.imgDecorator;
    this.showImageDecorator = false;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.showImage = false;
    this.showLootBox = false;
  
    this.show = function() {
      var x = this.i * cellWidth;
      var y = this.j * cellWidth;

      if ( this.visited && this.showImage ) {
          image( this.baseImage, x, y, cellWidth, cellWidth )
          image( this.img, x, y, cellWidth, cellWidth )
          if ( this.showImageDecorator ) {
            image( this.imgDecorator, x, y, cellWidth, cellWidth )
          }
          else if ( this.showLootBox ) {
            image( this.loogImg, x, y, cellWidth, cellWidth )
          }
      }
      else {
            if ( this.showBaseImage )
                image( this.baseImage, x, y, cellWidth, cellWidth )
            else {
                stroke(255);
                if (this.walls[0]) {
                    line(x, y, x + cellWidth, y);
                }
                if (this.walls[1]) {
                    line(x + cellWidth, y, x + cellWidth, y + cellWidth);
                }
                if (this.walls[2]) {
                    line(x + cellWidth, y + cellWidth, x, y + cellWidth);
                }
                if (this.walls[3]) {
                    line(x, y + cellWidth, x, y);
                }
            
                if (this.visited) {
                    noStroke();
                    fill(this.r, this.g, this.b, 100);
                    rect(x, y, cellWidth, cellWidth);
                }
                else {
                    this.walls[0] = false
                    this.walls[1] = false
                    this.walls[2] = false
                    this.walls[3] = false
                    noStroke();
                    fill( 0,0,0,100)
                    rect( x, y, cellWidth, cellWidth)
                }
            }
        }
    }
}
  