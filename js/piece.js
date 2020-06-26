const pixelBlock = 1;
const gridColumns = 10;
const gridRows = 10;
var indexComponent = 0;

var gridPositions = [];

var actualPiece;
var previousPieces = [];

const block = {
    width: pixelBlock * 43,
    height: pixelBlock * 43,
    lineWidth: 2,
    lineColor: "white",
    backColor: "rgb(100, 99, 99)",
}

const tetriminos = [I, J, L, O, S, T, Z];

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

function generateNewPiece() {
    let tetrimino = tetriminos[Math.floor((Math.random() * (tetriminos.length - 1)) + 0)];
    actualPiece = [];
    for (let index = 0; index < tetrimino.diagram.length; index++) {
        let piece = new component(indexComponent, block.width, block.height, block.lineWidth, block.lineColor, tetrimino.backColor, setColumnPosition(tetrimino.diagram[index][1]), setRowPosition(tetrimino.diagram[index][0]));
        actualPiece.push(piece);
        listComponents.push(piece);
        indexComponent++;
    }
}

function movePieceLeft(piece) {
    if (!collid(piece, "left")) {
        piece.map(p => {
            p.x -= block.width;
        })
    }
}

function movePieceRight(piece) {
    if (!collid(piece, "right")) {
        piece.map(p => {
            p.x += block.width;
        });
    }
}

function movePieceDown(piece) {
    if (!collid(piece, "down")) {
        piece.map(p => {
            p.y += block.height;
        });
    }
    else {
        savePiece(piece); 
    }
}

// temp
function movePieceUp(piece) {
    piece.map(p => {
        p.y -= block.height;
    });
}

function collid(piece, direction) {
    let colid = false;
    
    let leftMostPiece = getLeftMostPiece(piece);
    let rightMostPiece = getRightMostPiece(piece);
    let lowestPiece = getLowestPiece(piece);
    
    let rowPosition = getRowPosition(lowestPiece.y);
    let columnLeftPosition = getColumnPosition(leftMostPiece.x);
    let columnRightPosition = getColumnPosition(rightMostPiece.x);

    let positions = [];
    let appendColumn = 0;
    let appendRow = 0;

    switch(direction) {
        case "left":
            if (columnLeftPosition == 0) {
                colid = true
            }
            else {
                appendColumn = -1;
            }
            break;

        case "right":
            if (columnRightPosition == (gridColumns - 1)) {
                colid = true;
            }
            else {
                appendColumn = 1;
            }
            break;

        case "down":
            // let's check if we can go down!!
            if (rowPosition == (gridRows - 1)) {
                colid = true;
            }
            else {
                appendRow = 1;
            }
            break;
    }

    if (!colid) {
        for (let idxRow = 0; idxRow < piece.length; idxRow++) {
            positions.push(gridPositions[getRowPosition(piece[idxRow].y) + appendRow][getColumnPosition(piece[idxRow].x) + appendColumn] == 0);
        }
        colid = positions.some(p => p === false) ? true : false;
    }

    return colid;
}

function putPieceDown(piece) {
    let leaveWhile = false;

    do {
        if (collid(piece, "down")) {
            leaveWhile = true;
        }
        else {
            movePieceDown(piece);
        }
    } while(!leaveWhile);
    
    // temp
    console.clear();
    for (let idxRow = 0; idxRow < gridPositions.length; idxRow++) {
        let stringCol = idxRow + ": ";
        for (let idxCol = 0; idxCol < gridPositions[idxRow].length; idxCol++) {
            stringCol += "[" + gridPositions[idxRow][idxCol] + "] ";
        }
        console.log(stringCol);
    }
}

function savePiece(piece) {
    piece.map(p => {
        gridPositions[getRowPosition(p.y)][getColumnPosition(p.x)] = 1;
    });
    generateNewPiece();
}

function resetPieces() {
    previousPieces = [];
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

function getLeftMostPiece(piece) {
    let leftMostPiece;

    piece.map(p => {
        let columnPiece = getColumnPosition(p.x);
        if (leftMostPiece == undefined) {
            leftMostPiece = p;
        }
        else if (columnPiece < getColumnPosition(leftMostPiece.x)) {
            leftMostPiece = p;
        }    
    });
    return leftMostPiece;
}

function getRightMostPiece(piece) {
    let rightMostPiece;

    piece.map(p => {
        let columnPiece = getColumnPosition(p.x);
        if (rightMostPiece == undefined) {
            rightMostPiece = p;
        }
        else if (columnPiece > getColumnPosition(rightMostPiece.x)) {
            rightMostPiece = p;
        }
    });
    
    return rightMostPiece;
}

function getLowestPiece(piece) {
    let lowestPiece;

    piece.map(p => {
        let rowPiece = getRowPosition(p.y);
        if (lowestPiece == undefined) {
            lowestPiece = p;
        }
        else if (rowPiece > getRowPosition(lowestPiece.y)) {
            lowestPiece = p;
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