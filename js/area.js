const widthArea = gridColumns * block.width;
const heightArea = gridRows * block.height;
let milliseconds = 20; // 20 milliseconds equals 50 times per second.

let autorizeFunction = true;

var area = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = widthArea;
        this.canvas.height = heightArea;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateArea, milliseconds);

        window.addEventListener("keydown", function(e) {
            if (e.keyCode === 68 || e.keyCode === 39) {
                movePieceRight(actualPiece);
            }
            else if (e.keyCode === 65 || e.keyCode === 37) {
                movePieceLeft(actualPiece);
            }
            else if (e.keyCode === 87 || e.keyCode === 38) {
                movePieceUp(actualPiece);
            }
            else if (e.keyCode === 83 || e.keyCode === 40) {
                movePieceDown(actualPiece);
            }
            else if (e.keyCode === 32) {
                if (autorizeFunction) {
                    autorizeFunction = false;
                    putPieceDown(actualPiece);
                }
            }
        });

        window.addEventListener("keyup", function(e) {
            if (e.keyCode === 32) {
                autorizeFunction = true;
            }
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateArea() {
    area.clear();

    for(let indexComp = 0; indexComp < listComponents.length; indexComp++) {
        listComponents[indexComp].update();
    }
}