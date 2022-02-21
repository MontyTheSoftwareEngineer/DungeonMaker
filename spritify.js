var doneRooms = new Map();

function createBackScape() {
    for ( var cellIndex = 0; cellIndex < grid.length; cellIndex++ )
    {
        var cell = grid[ cellIndex ]
        cell.showBaseImage = true
    }
}

function spritifyRooms() {
    for ( var roomIndex = 0; roomIndex < rooms.length; roomIndex++ )
    {
        if ( doneRooms.has( roomIndex ) )
        {
            let currentRoom = rooms[roomIndex]
            let roomType = doneRooms.get( roomIndex )
            skinRoom( currentRoom, roomType)
        }
        else {
            let currentRoom = rooms[roomIndex]
            let roomType = floor( random( 0, 9 ) )
            doneRooms.set( roomIndex, roomType )
            skinRoom( currentRoom, roomType )
        }
    }
}

function skinRoom( currentRoom, roomType ) {
    let xSpriteSheetOffset = 0;
    let ySpriteSheetOffset = 0;

    if ( roomType === 1 ) {
        //sand room
        xSpriteSheetOffset = 5;
        ySpriteSheetOffset = 6;
    }
    else if ( roomType === 2 ) {
        //dirt room
        xSpriteSheetOffset = 5;
        ySpriteSheetOffset = 0;
    }
    else if ( roomType === 3 ) {
        //purple room
        xSpriteSheetOffset = 0;
        ySpriteSheetOffset = 6;
    }
    else if ( roomType === 4 ) {
        //red room
        xSpriteSheetOffset = 0;
        ySpriteSheetOffset = 3;
    }
    else if ( roomType === 5 ) {
        //lake room
        xSpriteSheetOffset = 0;
        ySpriteSheetOffset = -15;
    }
    else if ( roomType === 6 ) {
        //house room
        houseRoom( currentRoom )
    }
    if ( roomType !== 6 ) {
        var topLeftCorner = grid[ index( currentRoom.x, currentRoom.y ) ]

        if ( topLeftCorner ) {
            sprite = spritesheet.get( ( 2 + xSpriteSheetOffset ) * 16 + ( 2 + xSpriteSheetOffset ) * 1, ( 15 + ySpriteSheetOffset ) * 16 + ( 15 + ySpriteSheetOffset ), 16, 16 )
            topLeftCorner.showImage = true;
            topLeftCorner.img = sprite
            topLeftCorner.visited = true
        }

        var topRightCorner = grid[ index( currentRoom.x + currentRoom.width - 1, currentRoom.y ) ]

        if ( topRightCorner ) {
            
            sprite = spritesheet.get( ( 4 + xSpriteSheetOffset )* 16 + ( 4 + xSpriteSheetOffset ) * 1, ( 15 + ySpriteSheetOffset ) * 16 + ( 15 + ySpriteSheetOffset ), 16, 16 )
            topRightCorner.showImage = true;
            topRightCorner.img = sprite
            topRightCorner.visited = true
        }

        var botLeftCorner = grid[ index( currentRoom.x, currentRoom.y + currentRoom.height - 1 ) ] 
        if ( botLeftCorner ) {
            sprite = spritesheet.get( ( 2 + xSpriteSheetOffset ) * 16 + ( 2 + xSpriteSheetOffset ) * 1, ( 17 + ySpriteSheetOffset )* 16 + ( 17 + ySpriteSheetOffset ) * 1, 16, 16 )
            botLeftCorner.showImage = true;
            botLeftCorner.img = sprite
            botLeftCorner.visited = true
        }

        var botRightCorner = grid[ index( currentRoom.x + currentRoom.width - 1, currentRoom.y+ currentRoom.height - 1 ) ] 
        if ( botRightCorner ) {
            sprite = spritesheet.get( ( 4 + xSpriteSheetOffset ) * 16 + ( 4 + xSpriteSheetOffset ) * 1, ( 17 + ySpriteSheetOffset ) * 16 + ( 17 + ySpriteSheetOffset ) * 1, 16, 16 )
            botRightCorner.showImage = true;
            botRightCorner.img = sprite
            botRightCorner.visited = true
        }

        for ( var i = 1; i < currentRoom.width - 1; i++ )
        {
            var currentCell = grid[ index( currentRoom.x + i, currentRoom.y ) ]
            if ( currentCell && !currentCell.showImage ) {
                sprite = spritesheet.get( ( 3 + xSpriteSheetOffset )* 16 + ( 3 + xSpriteSheetOffset ) * 1, ( 15 + ySpriteSheetOffset ) * 16 + ( 15 + ySpriteSheetOffset ), 16, 16 )
                currentCell.showImage = true;
                currentCell.img = sprite
                currentCell.visited = true
                //return;
            }
        }

        for ( var i = 1; i < currentRoom.width - 1; i++ )
        {
            var currentCell = grid[ index( currentRoom.x + i, currentRoom.y + currentRoom.height - 1) ]
            if ( currentCell && !currentCell.showImage ) {
                sprite = spritesheet.get( ( 3 + xSpriteSheetOffset ) * 16 + ( 3 + xSpriteSheetOffset ) * 1, ( 17 + ySpriteSheetOffset ) * 16 + ( 17 + ySpriteSheetOffset ), 16, 16 )
                currentCell.showImage = true;
                currentCell.img = sprite
                currentCell.visited = true
                //return;
            }
        }

        for ( var i = 1; i < currentRoom.height - 1; i++ )
        {
            var currentCell = grid[ index( currentRoom.x, currentRoom.y + i) ]
            if ( currentCell && !currentCell.showImage ) {
                sprite = spritesheet.get( ( 2 + xSpriteSheetOffset ) * 16 + ( 2 + xSpriteSheetOffset ) * 1, ( 16 + ySpriteSheetOffset ) * 16 + ( 16 + ySpriteSheetOffset ), 16, 16 )
                currentCell.showImage = true;
                currentCell.img = sprite
                currentCell.visited = true
                //return;
            }
        }

        for ( var i = 1; i < currentRoom.height - 1; i++ )
        {
            var currentCell = grid[ index( currentRoom.x + currentRoom.width - 1, currentRoom.y + i) ]
            if ( currentCell && !currentCell.showImage ) {
                sprite = spritesheet.get(  ( 4 + xSpriteSheetOffset ) * 16 +  (4 + xSpriteSheetOffset ) * 1, ( 16 + ySpriteSheetOffset ) * 16 + ( 16 + ySpriteSheetOffset ), 16, 16 )
                currentCell.showImage = true;
                currentCell.img = sprite
                currentCell.visited = true
                //return;
            }
        }

        for ( var i = 1; i < currentRoom.cells.length; i++ )
        {
            var currentCell = grid[ currentRoom.cells[i] ]
            if ( currentCell && !currentCell.showImage ) {
                if ( roomType === 0 || roomType === 6 || roomType === 7 || roomType === 8 ) {
                    let flowers = floor( random( 0, 8) )
                    if ( flowers === 1 ) {
                        sprite = spritesheet.get( 3 * 16 + 3 * 1, 13 * 16 + 13, 16, 16 )
                    }
                    else if ( flowers === 2 ) {
                        sprite = spritesheet.get( 3 * 16 + 3 * 1, 10 * 16 + 10, 16, 16 )
                    }
                    else if ( flowers === 3 ) {
                        sprite = spritesheet.get( 3 * 16 + 3 * 1, 7 * 16 + 7, 16, 16 )
                    }
                    else {
                        sprite = spritesheet.get( 3 * 16 + 3 * 1, 16 * 16 + 16, 16, 16 )
                    }
                }
                else {
                    sprite = spritesheet.get( ( 3 + xSpriteSheetOffset ) * 16 + ( 3 + xSpriteSheetOffset ) * 1, ( 16 + ySpriteSheetOffset ) * 16 + ( 16 + ySpriteSheetOffset ), 16, 16 )
                }

                let showLootBox = floor( random( 0,lootDropDenom ) )
                if ( showLootBox === 1 && roomType != 5 )
                    currentCell.showLootBox = true;
                currentCell.showImage = true;
                currentCell.img = sprite
                currentCell.visited = true

                if ( roomType === 5 ) {
                    //water decorator
                    let decorator = floor( random( 0,8 ) )
                    if ( decorator === 1 )
                    {
                        sprite = spritesheet.get( 25 * 16 + 25 * 1, 11 * 16 + 11, 16, 16 )
                        currentCell.imgDecorator = sprite;
                        currentCell.showImageDecorator = true;
                    }
                    else if ( decorator == 2 ) {
                        sprite = spritesheet.get( 26 * 16 + 26 * 1, 11 * 16 + 11, 16, 16 )
                        currentCell.imgDecorator = sprite;
                        currentCell.showImageDecorator = true;
                    }
                }

                //return;
            }
        }
    }
}
