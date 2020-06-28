const gridColumns = 10;
const gridRows = 15;

const pieceDirection = {
    RIGHT: 0,
    BOTTOM: 1,
    LEFT: 2,
    TOP: 3
}

var actualTimeout = 300;
var additionalTimeout = 0;
var gridPositions = [];

var actualTetrimino = {
    pieces: [],
    positions: [],
    actualPosition: 0,
};

const block = {
    pixelBlock: 1,
    width: 43 * this.pixelBlock,
    height: 43 * this.pixelBlock,
    lineWidth: 2,
    lineColor: "white",
    backColor: "rgb(100, 99, 99)",
}

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
    for(let indexRow = 0; indexRow < gridRows; indexRow++) {
        for (let indexColumn = 0; indexColumn < gridColumns; indexColumn++) {
            listComponents.push(new component(indexComponent, block.width, block.height, block.lineWidth, block.lineColor, block.backColor, (indexColumn * block.width), (indexRow * block.height)));  
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
        let piece = new component(indexComponent, block.width, block.height, block.lineWidth, block.lineColor, tetrimino.backColor, setColumnPosition(tetrimino.diagram[index][1]), setRowPosition(tetrimino.diagram[index][0]));
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
            actualTimeout = 300;
            savePiece(pieces);
            movePieceDown(actualTetrimino.pieces);
        }
    }, actualTimeout - additionalTimeout);
}

function rotatePiece(pieces) {
    const actualPositionTetrimino = actualTetrimino.actualPosition;
    const positionsActualTetrimino = actualTetrimino.positions[actualPositionTetrimino];
    const oldPiecesPosition = pieces;

    let rotate = true;
    for (let index = 0; index < pieces.length; index++) {
        const newColumnPosition = getColumnPosition(pieces[index].x) + positionsActualTetrimino[index][1];
        const newRowPosition = getRowPosition(pieces[index].y) + positionsActualTetrimino[index][0];
        
        if (gridPositions[newRowPosition][newColumnPosition] === 0) {
            pieces[index].x = setColumnPosition(newColumnPosition);
            pieces[index].y = setRowPosition(newRowPosition);
        }
        else {
            index = pieces.length;
            rotate = false;
            pieces = oldPiecesPosition;
        }
    }
    actualTetrimino.actualPosition = (actualPositionTetrimino < (actualTetrimino.positions.length -1) && rotate) ? (actualTetrimino.actualPosition + 1) : 0;
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
        generateNewPiece();
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

function setColumnPosition(pos) {
    return pos * block.width;
}

function setRowPosition(pos) {
    return pos * block.height;
}

function logGrid() {
    // console.clear();
    for (let idxRow = 0; idxRow < gridPositions.length; idxRow++) {
        let stringCol = idxRow + ": ";
        for (let idxCol = 0; idxCol < gridPositions[idxRow].length; idxCol++) {
            stringCol += "[" + gridPositions[idxRow][idxCol] + "] ";
        }
        //console.log(stringCol);
    }
}