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
            var posDist = currentRoom.x + currentRoom.width - cols
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
            var downDiff = currentRoom.y + currentRoom.height - rows 
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
          shiftRooms( floor( -leftMostPos ), 0 )
        }
  
        if ( upMostPos < 0 ) {
          shiftRooms(  0, floor( -upMostPos) )
        }
  
        for ( var roomIndex = 0; roomIndex < rooms.length; roomIndex++ ) {
          var currentRoom = rooms[roomIndex];
          reMakeRoom( currentRoom )
        }
      }
  
      return resized;
  }