var curLocalDate = new Date();
var oldSecond = curLocalDate.getSeconds();
const lessenSecond = 2;

var area = {
    canvas : document.createElement("canvas"),
    milliseconds : 20,
    keySpaceUp : true,
    keyUpArrowUp : true,
    start : function() {
        this.canvas.width = gridColumns * block.width;
        this.canvas.height = gridRows * block.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateArea, this.milliseconds);

        window.addEventListener("keydown", function(e) {            
            if (e.keyCode === keyCodeName.D || e.keyCode === keyCodeName.RIGHT_ARROW) {
                canSavePiece = false;
                oldSecond = curLocalDate.getSeconds();
                movePieceRight(actualTetrimino.pieces);           
            } 
            
            if (e.keyCode === keyCodeName.A || e.keyCode === keyCodeName.LEFT_ARROW) {
                canSavePiece = false;
                oldSecond = curLocalDate.getSeconds();
                movePieceLeft(actualTetrimino.pieces);                
            }

            if (e.keyCode === keyCodeName.W || e.keyCode === keyCodeName.UP_ARROW) {
                canSavePiece = false;
                if (this.keyArrowUp) {
                    this.keyArrowUp = false;
                    rotatePiece(actualTetrimino.pieces);
                }               
            }
            
            if (e.keyCode === keyCodeName.S || e.keyCode === keyCodeName.DOWN_ARROW) {
                additionalTimeout = actualTimeout - (actualTimeout * 0.05);
            }
            
            if (e.keyCode === keyCodeName.SPACE) {
                if (this.keySpaceUp) {
                    this.keySpaceUp = false;
                    oldSecond = curLocalDate.getSeconds() - lessenSecond;
					actualTimeout = 0;
                }
            }
        });

        window.addEventListener("keyup", function(e) {
            if (e.keyCode === keyCodeName.D || e.keyCode === keyCodeName.RIGHT_ARROW ||
                e.keyCode === keyCodeName.A || e.keyCode === keyCodeName.LEFT_ARROW ||
                e.keyCode === keyCodeName.W || e.keyCode === keyCodeName.UP_ARROW) {
            }

            if (e.keyCode === keyCodeName.W || e.keyCode === keyCodeName.UP_ARROW) {
                this.keyArrowUp = true;
            }

            if (e.keyCode === keyCodeName.S || e.keyCode === keyCodeName.DOWN_ARROW) {
                additionalTimeout = 0;
            }

            if (e.keyCode === keyCodeName.SPACE) {
                this.keySpaceUp = true;
            }
        });
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateArea() {
    area.clear();

    curLocalDate = new Date();

    if (oldSecond === (curLocalDate.getSeconds() - lessenSecond)) {
        canSavePiece = true;
    }

    for(let indexComp = 0; indexComp < listComponents.length; indexComp++) {
        listComponents[indexComp].update();
    }
}
