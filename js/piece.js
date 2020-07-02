const gridColumns = 10;
const gridRows = 15;

const pixelBlock = 1;

const block = {
    width: 43 * pixelBlock,
    height: 43 * pixelBlock,
    lineWidth: 2,
    lineColor: "white",
    backColor: "rgb(100, 99, 99)",
}

var actualTimeout = 500;
var additionalTimeout = 0;
var gridPositions = [];

var actualTetrimino = {
    pieces: [],
    positions: [],
    actualPosition: 0,
};

var canSavePiece = true;

function generateGridPositions() {
    let columnPositon = [];
    gridPositions = [];

    for (let indexRow = 0; indexRow < gridRows; indexRow++) {
        columnPositon = [];
        for (let indexColumn = 0; indexColumn < gridColumns; indexColumn++) {
            columnPositon.push(0);
        }
        gridPositions.push(columnPositon);
    }
}

function loadPieces() {
    // grid
    for(let indexRow = 0; indexRow < gridRows; indexRow++) {
        for (let indexColumn = 0; indexColumn < gridColumns; indexColumn++) {
            listComponents.push(new component(indexComponent, block.width, block.height, block.lineWidth, block.lineColor, block.backColor, setColumnPosition(indexColumn), setRowPosition(indexRow), "", false));  
            indexComponent++;
        }
    }
    generateNewPiece();
}

function generateNewPiece(idxTetrimino = -1) {
    let tetrimino = (idxTetrimino != -1) ? tetriminos[idxTetrimino] : tetriminos[Math.floor((Math.random() * (tetriminos.length)) + 0)];
    actualTetrimino.pieces = [];
    actualTetrimino.positions = tetrimino.positions;
    actualTetrimino.actualPosition = 0;

    for (let index = 0; index < tetrimino.diagram.length; index++) {
        let piece = new component(indexComponent, block.width, block.height, block.lineWidth, block.lineColor, tetrimino.backColor, setColumnPosition(tetrimino.diagram[index][grid.COLUMN]), setRowPosition(tetrimino.diagram[index][grid.ROW]));
        actualTetrimino.pieces.push(piece);
        listComponents.push(piece);
        indexComponent++;
    }
}

function movePieceLeft(pieces) {
    if (!collid(pieces, pieceDirection.LEFT)) {
        pieces.map(piece => {
            piece.x -= block.width;
        })
    }
}

function movePieceRight(pieces) {
    if (!collid(pieces, pieceDirection.RIGHT)) {
        pieces.map(piece => {
            piece.x += block.width;
        });
    }
}

function movePieceDown(pieces) {
   	setTimeout(() => {
		if (!collid(pieces, pieceDirection.BOTTOM)) {
          	pieces.map(piece => {
           		piece.y += block.height;
      		});
       		movePieceDown(pieces);
       	}
        else {
            additionalTimeout = 0;
            actualTimeout = 500;
			if (canSavePiece) {
                savePiece(pieces);
            }
            movePieceDown(actualTetrimino.pieces);
        }
    }, actualTimeout - additionalTimeout);
}

function rotatePiece(pieces) {
    const actualPositionTetrimino = actualTetrimino.actualPosition;
    const positionsActualTetrimino = actualTetrimino.positions[actualPositionTetrimino];

    let rotate = false;
    let newPositions = [];

    for (let index = 0; index < pieces.length; index++) {
        const newColumnPosition = getColumnPosition(pieces[index].x) + positionsActualTetrimino[index][grid.COLUMN];
        const newRowPosition = getRowPosition(pieces[index].y) + positionsActualTetrimino[index][grid.ROW];

        if (gridPositions[newRowPosition] !== undefined && gridPositions[newRowPosition][newColumnPosition] === 0) {
                newPositions.push([setRowPosition(newRowPosition), setColumnPosition(newColumnPosition)]);
                rotate = true;
        }
        else {
            index = pieces.length;
            rotate = false;
        }
    }

    if (rotate) {
        for (let index = 0; index < pieces.length; index++) {
            pieces[index].x = newPositions[index][grid.COLUMN];
            pieces[index].y = newPositions[index][grid.ROW];
        }
        actualTetrimino.actualPosition = (actualPositionTetrimino < actualTetrimino.positions.length - 1) ? (actualTetrimino.actualPosition + 1) : 0;
    }
}

function collid(pieces, direction) {
    let colid = false;
    
    let leftMostPiece = getLeftMostPiece(pieces);
    let rightMostPiece = getRightMostPiece(pieces);
    let lowestPiece = getLowestPiece(pieces);
    
    let rowPosition = getRowPosition(lowestPiece.y);
    let columnLeftPosition = getColumnPosition(leftMostPiece.x);
    let columnRightPosition = getColumnPosition(rightMostPiece.x);

    let appendColumn = 0;
    let appendRow = 0;

    switch(direction) {
        case pieceDirection.LEFT:
            if (columnLeftPosition === 0) {
                colid = true
            }
            else {
                appendColumn = -1;
            }
            break;

        case pieceDirection.RIGHT:
            if (columnRightPosition == (gridColumns - 1)) {
                colid = true;
            }
            else {
                appendColumn = 1;
            }
            break;

        case pieceDirection.BOTTOM:
            if (rowPosition == (gridRows - 1)) {
                colid = true;
            }
            else {
                appendRow = 1;
            }
            break;

        case pieceDirection.TOP:
            if (rowPosition === 0) {
                colid = true;
            }
            else {
                appendRow = -1;
            }
            break;
    }

    if (!colid) {
        for (let idxRow = 0; idxRow < pieces.length; idxRow++) {
            if (gridPositions[getRowPosition(pieces[idxRow].y) + appendRow][getColumnPosition(pieces[idxRow].x) + appendColumn] == 1) {
                idxRow = pieces.length;
                colid = true; 
            }
        }
    }
    return colid;
}

function savePiece(pieces) {
    pieces.map(piece => {
        gridPositions[getRowPosition(piece.y)][getColumnPosition(piece.x)] = 1;
    });

    // let's check if the first row contains some pieces
    if (gridPositions[0].some(col => col == 1)) {
        resetPieces();
    }
    else {
        checkRow();
        generateNewPiece();
    }
}

function checkRow() {
    gridPositions.map((row, index) => {
        if (row.filter(col => col == 1).length == gridColumns) {
            removePieces(index);
        }
    });
}

function removePieces(row) {
    let y = getY(row);
    for (let idxCol = 0; idxCol < gridColumns; idxCol++) {
        let index = listComponents.findIndex(cpt => cpt.removable == true && cpt.y == y && cpt.x == getX(idxCol));
        if (index !== -1) {
            listComponents.splice(index, 1);
            gridPositions[row][idxCol] = 0;

            // now we need to check if we have pieces above of this row and move them
            let decreaseRows = 1;
            let actualRow = 0;

            let cpt = undefined;
            do {
                cpt = listComponents.filter(cpt => cpt.removable == true && cpt.y == getY(row - decreaseRows) && cpt.x == getX(idxCol))[0];
                if (cpt !== undefined) {
                    cpt.y = getY(row - actualRow);
                    
                    gridPositions[row - decreaseRows][idxCol] = 0;
                    gridPositions[row - actualRow][idxCol] = 1;
                    
                    decreaseRows++;
                    actualRow++;
                }
            } while (cpt !== undefined);
        }
    }
}

function resetPieces() {
    listComponents = [];
    indexComponent = 0;

    generateGridPositions();
    loadPieces();
}

function getColumnPosition(x) {
    return x / block.width;
}

function getRowPosition(y) {
    return y / block.height;
}


function getX(col) {
    return col * block.width;
}

function getY(row) {
    return row * block.height;
}

function getLeftMostPiece(pieces) {
    let leftMostPiece;

    pieces.map(piece => {
        let columnPiece = getColumnPosition(piece.x);
        if (leftMostPiece == undefined) {
            leftMostPiece = piece;
        }
        else if (columnPiece < getColumnPosition(leftMostPiece.x)) {
            leftMostPiece = piece;
        }    
    });
    return leftMostPiece;
}

function getRightMostPiece(pieces) {
    let rightMostPiece;

    pieces.map(piece => {
        let columnPiece = getColumnPosition(piece.x);
        if (rightMostPiece == undefined) {
            rightMostPiece = piece;
        }
        else if (columnPiece > getColumnPosition(rightMostPiece.x)) {
            rightMostPiece = piece;
        }
    });
    
    return rightMostPiece;
}

function getLowestPiece(pieces) {
    let lowestPiece;

    pieces.map(piece => {
        let rowPiece = getRowPosition(piece.y);
        if (lowestPiece == undefined) {
            lowestPiece = piece;
        }
        else if (rowPiece > getRowPosition(lowestPiece.y)) {
            lowestPiece = piece;
        }
    });
    return lowestPiece;
}

function setColumnPosition(col) {
    return col * block.width;
}

function setRowPosition(row) {
    return row * block.height;
}

function logGrid() {
    // console.clear();
    for (let idxRow = 0; idxRow < gridPositions.length; idxRow++) {
        let stringCol = idxRow + ": ";
        for (let idxCol = 0; idxCol < gridPositions[idxRow].length; idxCol++) {
            stringCol += "[" + gridPositions[idxRow][idxCol] + "] ";
        }
        console.log(stringCol);
    }
}
