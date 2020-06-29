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
            if (e.keyCode === keyCodeName.D || e.keyCode === keyCodeName.RIGHT_ARROW) {
                movePieceRight(actualTetrimino.pieces);
            }
            else if (e.keyCode === keyCodeName.A || e.keyCode === keyCodeName.LEFT_ARROW) {
                movePieceLeft(actualTetrimino.pieces);
            }
            else if (e.keyCode === keyCodeName.W || e.keyCode === keyCodeName.UP_ARROW) {
                rotatePiece(actualTetrimino.pieces);
            }
            else if (e.keyCode === keyCodeName.S || e.keyCode === keyCodeName.DOWN_ARROW) {
                additionalTimeout = 250;
            }
            else if (e.keyCode === keyCodeName.SPACE) {
                if (this.keyUp) {
                    this.keyUp = false;
                    actualTimeout = 0;
                }
            }
        });

        window.addEventListener("keyup", function(e) {
            if (e.keyCode === keyCodeName.S || e.keyCode === keyCodeName.DOWN_ARROW) {
                additionalTimeout = 0;
            }

            if (e.keyCode === keyCodeName.SPACE) {
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