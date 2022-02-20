function houseRoom( currentRoom ) {

    var topLeftCorner = grid[ index( currentRoom.x, currentRoom.y ) ]

    if ( topLeftCorner ) {
        sprite = spritesheet.get( ( 16 ) * 16 + ( 16 ) * 1, ( 12 ) * 16 + ( 12 ), 16, 16 )
        topLeftCorner.showImage = true;
        topLeftCorner.img = sprite
        topLeftCorner.visited = true
    }

    var topRightCorner = grid[ index( currentRoom.x + currentRoom.width - 1, currentRoom.y ) ]

    if ( topRightCorner ) {
        
        sprite = spritesheet.get( ( 17 ) * 16 + ( 17 ) * 1, ( 12 ) * 16 + ( 12 ), 16, 16 )
        topRightCorner.showImage = true;
        topRightCorner.img = sprite
        topRightCorner.visited = true
    }

    var botLeftCorner = grid[ index( currentRoom.x, currentRoom.y + currentRoom.height - 1 ) ] 
    if ( botLeftCorner ) {
        sprite = spritesheet.get( ( 16 ) * 16 + ( 16 ) * 1, ( 13 ) * 16 + ( 13 ), 16, 16 )
        botLeftCorner.showImage = true;
        botLeftCorner.img = sprite
        botLeftCorner.visited = true
    }

    var botRightCorner = grid[ index( currentRoom.x + currentRoom.width - 1, currentRoom.y+ currentRoom.height - 1 ) ] 
    if ( botRightCorner ) {
        sprite = spritesheet.get( ( 17 ) * 16 + ( 17 ) * 1, ( 13 ) * 16 + ( 13 ), 16, 16 )
        botRightCorner.showImage = true;
        botRightCorner.img = sprite
        botRightCorner.visited = true
    }

    for ( var i = 1; i < currentRoom.width - 1; i++ )
    {
        var currentCell = grid[ index( currentRoom.x + i, currentRoom.y ) ]
        if ( currentCell && !currentCell.showImage ) {
            sprite = spritesheet.get( ( 14 ) * 16 + ( 14 ) * 1, ( 12 ) * 16 + ( 12 ), 16, 16 )
            currentCell.showImage = true;
            currentCell.img = sprite
            currentCell.visited = true
            return;
        }
    }

    for ( var i = 1; i < currentRoom.width - 1; i++ )
    {
        var currentCell = grid[ index( currentRoom.x + i, currentRoom.y + currentRoom.height - 1) ]
        if ( currentCell && !currentCell.showImage ) {
            sprite = spritesheet.get( ( 14 ) * 16 + ( 14 ) * 1, ( 12 ) * 16 + ( 12 ), 16, 16 )
            currentCell.showImage = true;
            currentCell.img = sprite
            currentCell.visited = true
            return;
        }
    }

    for ( var i = 1; i < currentRoom.height - 1; i++ )
    {
        var currentCell = grid[ index( currentRoom.x, currentRoom.y + i) ]
        if ( currentCell && !currentCell.showImage ) {
            sprite = spritesheet.get( ( 15 ) * 16 + ( 15 ) * 1, ( 13 ) * 16 + ( 13 ), 16, 16 )
            currentCell.showImage = true;
            currentCell.img = sprite
            currentCell.visited = true
            return;
        }
    }

    for ( var i = 1; i < currentRoom.height - 1; i++ )
    {
        var currentCell = grid[ index( currentRoom.x + currentRoom.width - 1, currentRoom.y + i) ]
        if ( currentCell && !currentCell.showImage ) {
            sprite = spritesheet.get( ( 15 ) * 16 + ( 15 ) * 1, ( 13 ) * 16 + ( 13 ), 16, 16 )
            currentCell.showImage = true;
            currentCell.img = sprite
            currentCell.visited = true
            return;
        }
    }

    for ( var i = 1; i < currentRoom.cells.length; i++ )
    {
        var currentCell = grid[ currentRoom.cells[i] ]
        if ( currentCell && !currentCell.showImage ) {
            sprite = spritesheet.get( ( 6 ) * 16 + ( 6 ) * 1, ( 2 ) * 16 + ( 2 ), 16, 16 )

            let showLootBox = floor( random( 0,lootDropDenom ) )
            if ( showLootBox === 1 )
                currentCell.showLootBox = true;
            currentCell.showImage = true;
            currentCell.img = sprite
            currentCell.visited = true

            return;
        }
    }
}
