function startGame() {
    area.start();
    generateGridPositions();
    loadPieces();
    movePieceDown(actualTetrimino.pieces);
}