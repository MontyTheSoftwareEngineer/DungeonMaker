var cols, rows;
var cellWidth = 15
var grid = []
var rooms = []
var roomCount = 5
var lootDropDenom = 50

var currentCanvasWidth
var currentCanvasHeight

var c

var spritesheet
var sprite
function preload() {
  spritesheet = loadImage( 'roguelikeSheet_transparent.png' )
}

var r,g,b;
function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function setUpGrid() {
  cols = floor(currentCanvasWidth/cellWidth);
  rows = floor(currentCanvasHeight/cellWidth);
  grid = [];
  let baseOffset = floor( random( 0,1 ) ) 
  var sprite = spritesheet.get( 5 * 16 + 5 * 1, baseOffset * 16 + baseOffset, 16, 16 );
  var lootSprite = spritesheet.get( 37 * 16 + 37 * 1, 9 * 16 + 9, 16, 16 )

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      cell.baseImage = sprite
      cell.loogImg = lootSprite
      grid.push(cell);
    }
  }
}

function setup() {
  r = floor( random( 0, 255 ) )
  g = floor( random( 0, 255 ) )
  b = floor( random( 0, 255 ) )

  frameRate(5);
  currentCanvasWidth = windowWidth;
  currentCanvasHeight = windowHeight;
  c = createCanvas( currentCanvasWidth, currentCanvasHeight );
  
  setUpGrid();
}

function mouseClicked() {
  //saveCanvas( c, 'map', 'png')
}
  
function draw() {
  background(51);

  for ( var cell = 0; cell < grid.length; cell++ ) {
    grid[cell].show();
  }

  if ( rooms.length < roomCount ) {
    makeRandomRoom( 5,15,5,15 )
    return;
  }
  if ( separateRooms() ) {
    return;
  }

  if ( checkCanvasResize() ) {
    return;
  }
  
  connectRooms();
  
  spritifyRooms()

  createBackScape();
  
}