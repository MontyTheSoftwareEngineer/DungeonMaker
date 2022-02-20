function Room() {
    this.cells = []
    this.x
    this.y
    this.width
    this.height
    this.r
    this.g
    this.b
    this.addCell = function( index ) {
      this.cells.push( index );
    }
  
    this.checkHasCell = function( index ) {
      if ( this.cells.includes( index ) ) 
        return true;
      else
        return false;
    }
  }

function shiftRooms( movX, movY ) {
  console.log("Shifting...")
    for ( var roomIndex = 0; roomIndex < rooms.length; roomIndex++ ) {
        let currentRoom = rooms[roomIndex];
        currentRoom.x += movX;
        currentRoom.y += movY;
    }
}

function checkCanvasResize() {
    var resized = false;
    var leftMostPos = 0;
    var rightMostPos = 0;
    var upMostPos = 0;
    var downMostPos = 0;
    
    for ( var roomIndex = 0; roomIndex < rooms.length; roomIndex++ ) {
      var currentRoom = rooms[roomIndex];
        if ( currentRoom.x < 0 ) {
          var negDist = currentRoom.x
          if ( negDist < leftMostPos ) {
            leftMostPos = negDist
          }
        }
        if ( currentRoom.x + currentRoom.width > cols ) {
          var posDist = currentRoom.x + currentRoom.width
          if ( posDist > rightMostPos ) {
            rightMostPos = posDist
          }
        }
        if ( currentRoom.y < 0 ) {
          var upDiff = currentRoom.y 
          if ( upDiff < upMostPos ) {
            upMostPos = upDiff
          }
        }
        if ( currentRoom.y + currentRoom.height> rows ) {
          var downDiff = currentRoom.y + currentRoom.height
          if ( downDiff > downMostPos ) {
            downMostPos = downDiff
          }
        }
    }
    var newXDiff = Math.abs( leftMostPos ) + rightMostPos
    var newYDiff = Math.abs( upMostPos ) + downMostPos

    console.log( rightMostPos, leftMostPos, upMostPos, downMostPos )

    if ( newXDiff > 0 || newYDiff > 0 ) {

      resized = true

      console.log( "Old canvas size: ", currentCanvasWidth, "x", currentCanvasHeight)
      currentCanvasWidth += ( newXDiff * cellWidth )
      currentCanvasHeight += ( newYDiff * cellWidth )
      

      resizeCanvas(currentCanvasWidth, currentCanvasHeight )
      console.log( "New canvas size: ", currentCanvasWidth, "x", currentCanvasHeight)
      console.log( "Canvas resized...")
      setUpGrid()
      console.log( "Grid set up")
      
      if ( leftMostPos < 0 ) {
        shiftRooms( floor( newXDiff / 2 ), 0 )
      }

      if ( upMostPos < 0 ) {
        shiftRooms(  0, floor( newYDiff / 2) )
      }

      for ( var roomIndex = 0; roomIndex < rooms.length; roomIndex++ ) {
        var currentRoom = rooms[roomIndex];
        reMakeRoom( currentRoom )
      }
    }

    return resized;
}

function makeRandomRoom( minWidth, maxWidth, minHeight, maxHeight ) {
    var roomWidth = floor( random( minWidth, maxWidth ) );
    var roomHeight = floor( random( minHeight, maxHeight ) );
    var roomX = floor( random( cols / 2 - 20, cols / 2 + 20) );
    var roomY = floor( random( rows/2 - 10, rows/2 ) )
    // var newR = r;
    // var newG = g;
    // var newB = b;
    var newR = floor( random( 0, 255 ) )
    var newB = floor( random( 0, 255 ) )
    var newG = floor( random( 0, 255 ) )
  
    let room = new Room();
    room.x = roomX
    room.y = roomY
    room.width = roomWidth;
    room.height = roomHeight;
  
    room.r = newR
    room.g = newG
    room.b = newB
    for( var i = 0; i < roomWidth; i++ )
    {
      for ( var j = 0; j < roomHeight; j++ ) {
        var cell = grid[ index( roomX + i, roomY + j) ]
        if ( cell && cell != grid[0]){
          room.addCell( index( roomX + i, roomY + j) )
          cell.r = newR
          cell.g = newG
          cell.b = newB
          cell.visited = true;
          
          cell.walls[1] = true;
          cell.walls[2] = true;
          cell.walls[0] = true;
          cell.walls[3] = true;
        }
      }
    }
    rooms.push( room )
  }
  
  function reMakeRoom( currentRoom ) {
    for ( var cellIndex = 0; cellIndex < currentRoom.cells.length; cellIndex++ ) {
      var cell = grid[ currentRoom.cells[cellIndex] ]
      cell.visited = false;
      cell.walls[1] = false;
      cell.walls[2] = false;
      cell.walls[0] = false;
      cell.walls[3] = false;
    }
    currentRoom.cells = []
    for( var i = 0; i < currentRoom.width; i++ )
    {
      for ( var j = 0; j < currentRoom.height; j++ ) {
        var cell = grid[ index( currentRoom.x + i, currentRoom.y + j) ]
        if ( cell && cell != grid[0]){
          currentRoom.addCell( index( currentRoom.x + i, currentRoom.y + j) )
          cell.r = currentRoom.r
          cell.g = currentRoom.g
          cell.b = currentRoom.b
          cell.visited = true;
         
          cell.walls[1] = true;
          cell.walls[2] = true;
          cell.walls[0] = true;
          cell.walls[3] = true;
        }
      }
    }
  }
  
  
  function moveRooms( a, b ) {
    let aMidX = floor( a.x + ( a.width / 2 ) )
    let aMidY = floor( a.y + ( a.height / 2 ) )
    let bMidX = floor( b.x + ( b.width / 2 ) )
    let bMidY = floor( b.y + ( b.height / 2 ) )
    var moveFactor = 3;
  
    if ( aMidX - bMidX > 0 ) {
      a.x += moveFactor;
      b.x -= moveFactor;
    }
    else if ( aMidX - bMidX < 0 ) {
      a.x -= moveFactor;
      b.x += moveFactor;
    }
  
    if ( aMidY - bMidY > 0 ) {
      a.y += moveFactor;
      b.y -= moveFactor;
    }
    else if ( aMidY - bMidY < 0 ) {
      a.y -= moveFactor;
      b.y += moveFactor;
    }
    
    reMakeRoom( a );
    reMakeRoom( b );
  }
  
  function separateRooms() {
    var hadToSeparate = false;
    for ( var roomIndex = 0; roomIndex < rooms.length; roomIndex++ ) {
      let currentRoom = rooms[roomIndex];
      for ( var nextRoomIndex = roomIndex + 1; nextRoomIndex < rooms.length; nextRoomIndex++ )
      {
        let nextRoom = rooms[nextRoomIndex];
        let roomsCollide = false
        for ( var cellIndex = 0; cellIndex < currentRoom.cells.length; cellIndex++ ) {
  
          let cell = grid[ currentRoom.cells[ cellIndex ] ]
          cell.r = currentRoom.r
          cell.g = currentRoom.g
          cell.b = currentRoom.b
          cell.walls[1] = true;
          cell.walls[2] = true;
          cell.walls[0] = true;
          cell.walls[3] = true;
          cell.visited = true;
  
          if ( nextRoom.checkHasCell( currentRoom.cells[cellIndex] ) ) {
            roomsCollide = true;
          }
        }
  
        if ( roomsCollide ) {
          hadToSeparate = true;
          moveRooms( currentRoom, nextRoom );
        }
      }
    }
  
    return hadToSeparate;
  }
  
  function makePath( a, b ) {
      if ( !a || !b )
      return;
    let aMidX = floor( a.x + ( a.width / 2 ) )
    let aMidY = floor( a.y + ( a.height / 2 ) )
    let bMidX = floor( b.x + ( b.width / 2 ) )
    let bMidY = floor( b.y + ( b.height / 2 ) )

    let dir;
  
    let xDiff = aMidX - bMidX
    let yDiff = aMidY - bMidY
    if ( xDiff > 0 ) {
        for ( let i = 0; i < xDiff ; i++ ) {
          var cellIndex = index( aMidX - i, aMidY )
          let newCell = grid[ cellIndex ]
          if ( newCell && !newCell.visited && !a.checkHasCell( cellIndex ) && !b.checkHasCell( cellIndex ) ) {
              dir = "left"
            sprite = spritesheet.get( 5 * 16 + 5 * 1, 7 * 16 + 7 * 1, 16 ,16)
            newCell.showImage = true
            newCell.img = sprite
            newCell.visited = true
            newCell.r = 255
            newCell.g = 255
            newCell.b = 255
            newCell.walls[0] = true
            newCell.walls[1] = true
            newCell.walls[2] = true
            newCell.walls[3] = true
            return;
          }
        }
    }
    else if ( xDiff < 0 ) {
      for ( let i = 0; i < Math.abs( xDiff ) ; i++ ) {
        var cellIndex = index( aMidX + i, aMidY )
        var newCell = grid[ cellIndex ]
        if ( newCell && !newCell.visited && !a.checkHasCell( cellIndex ) && !b.checkHasCell( cellIndex )) {
            dir = "right"
          sprite = spritesheet.get( 5 * 16 + 5 * 1, 7 * 16 + 7 * 1, 16 ,16)
          newCell.showImage = true
          newCell.img = sprite
          newCell.visited = true
          newCell.r = 255
          newCell.g = 255
          newCell.b = 255
          newCell.walls[0] = true
          newCell.walls[1] = true
          newCell.walls[2] = true
          newCell.walls[3] = true
          return;
        }
      }
    }
  
    if ( yDiff > 0 ) {
      for ( let i = 0; i < yDiff ; i++ ) {
        var cellIndex = index( bMidX , aMidY - i)
        var newCell = grid[ cellIndex ]
        if ( newCell && !newCell.visited && !a.checkHasCell( cellIndex ) && !b.checkHasCell( cellIndex )) {
            if ( i == 0 && dir === "left")
            {
                sprite = spritesheet.get( 7 * 16 + 7 * 1, 8 * 16 + 8 * 1, 16 ,16)
                newCell.showImage = true
                newCell.img = sprite
            }
            else if ( i == 0 && dir === "right") {
                sprite = spritesheet.get( 8 * 16 + 8 * 1, 8 * 16 + 8 * 1, 16 ,16)
                newCell.showImage = true
                newCell.img = sprite
            }
            else {
                sprite = spritesheet.get( 6 * 16 + 6 * 1, 7 * 16 + 7 * 1, 16 ,16)
                newCell.showImage = true
                newCell.img = sprite
                newCell.visited = true
                newCell.r = 255
                newCell.g = 255
                newCell.b = 255
                newCell.walls[0] = true
                newCell.walls[1] = true
                newCell.walls[2] = true
                newCell.walls[3] = true
                return;
            }
        }
      }
    }
    else if ( yDiff < 0 ) {
  
      for ( let i = 0; i < Math.abs( yDiff ) ; i++ ) {
        var cellIndex = index( bMidX, aMidY + i) 
        var newCell = grid[ cellIndex ]
        if ( newCell && !newCell.visited && !a.checkHasCell( cellIndex ) && !b.checkHasCell( cellIndex )) {
            if ( i == 0 && dir === "left")
            {
                sprite = spritesheet.get( 7 * 16 + 7 * 1, 8 * 16 + 8 * 1, 16 ,16)
                newCell.showImage = true
                newCell.img = sprite
            }
            else if ( i == 0 && dir === "right") {
                sprite = spritesheet.get( 8 * 16 + 8 * 1, 8 * 16 + 8 * 1, 16 ,16)
                newCell.showImage = true
                newCell.img = sprite
            }
            else {
                sprite = spritesheet.get( 6 * 16 + 6 * 1, 7 * 16 + 7 * 1, 16 ,16)
                newCell.showImage = true
                newCell.img = sprite
                newCell.visited = true
                newCell.r = 255
                newCell.g = 255
                newCell.b = 255
                newCell.walls[0] = true
                newCell.walls[1] = true
                newCell.walls[2] = true
                newCell.walls[3] = true
                    return;
            }
        }
      }
    }
  }
  
  function connectRooms() {
    for ( var roomIndex = 0; roomIndex < rooms.length; roomIndex++ ) {
      var currentRoom = rooms[roomIndex];
      var nextBestRoom
      var bestRoom
      var bestRoomDistance = 1000
      var secondBestRoomDistance
      for ( var nextRoomIndex = roomIndex + 1; nextRoomIndex < rooms.length; nextRoomIndex++ )
      {
        var nextRoom = rooms[nextRoomIndex];
        if ( nextRoom ) {
          var dist = Math.sqrt( Math.pow( ( nextRoom.x - currentRoom.x), 2 ) + Math.pow( (nextRoom.y - currentRoom.y), 2) )
          if  ( dist < bestRoomDistance )
          {
            secondBestRoomDistance = dist;
            nextBestRoom = bestRoom
            bestRoom = nextRoom
            bestRoomDistance = dist
          }
        }
      }
  
      makePath( currentRoom, nextBestRoom )
      makePath( currentRoom, bestRoom )
    }
  }