var area = {
    canvas : document.createElement("canvas"),
    milliseconds : 20,
    keyUp : true,
    start : function() {
        this.canvas.width = gridColumns * block.width;
        this.canvas.height = gridRows * block.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateArea, this.milliseconds);

        window.addEventListener("keydown", function(e) {
            if (e.keyCode === 68 || e.keyCode === 39) {
                movePieceRight(actualTetrimino.pieces);
            }
            else if (e.keyCode === 65 || e.keyCode === 37) {
                movePieceLeft(actualTetrimino.pieces);
            }
            else if (e.keyCode === 87 || e.keyCode === 38) {
                rotatePiece(actualTetrimino.pieces);
            }
            else if (e.keyCode === 83 || e.keyCode === 40) {
                additionalTimeout = 250;
            }
            else if (e.keyCode === 32) {
                if (this.keyUp) {
                    this.keyUp = false;
                    actualTimeout = 0;
                }
            }
        });

        window.addEventListener("keyup", function(e) {
            if (e.keyCode === 83 || e.keyCode === 40) {
                additionalTimeout = 0;
            }

            if (e.keyCode === 32) {
                this.keyUp = true;
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