const cells = document.querySelectorAll('.cell');
const pieces = document.querySelectorAll('.piece');
const chooseWhite = document.getElementById('choose-white');
const chooseBlack = document.getElementById('choose-black');
const chooseSideContainer = document.querySelector('.choose-side-container');
const boardEl = document.querySelector('.board');
const movesBoard = document.querySelector('.moves-board');
const numbersContainer = document.querySelector('.numbers-container');
const lettersContainer = document.querySelector('.letters-container');
const numbers = document.querySelectorAll('.number');
const letters = document.querySelectorAll('.letter');
const pointsEl = document.querySelector('.points');
let whitePointsEl = document.getElementById('white-points');
let blackPointsEl = document.getElementById('black-points');
const container = document.querySelector('.container');
let joined = [...numbers, ...letters];
let boardColor = '';
let clickedEl = null;
let piecesArr = null;
let turn = 1;
let lastCellWithPiece = null;
let pieceMovedTo = null;
let board = [];
let whitePieces = ['P', 'R', 'N', 'B', 'Q', 'K'];
let blackPieces = ['p', 'r', 'n', 'b', 'q', 'k'];
let whitePiecesClasses = ['wpawn', 'wrook', 'wknight', 'wbishop', 'wqueen', 'wking'];
let blackPiecesClasses = ['bpawn', 'brook', 'bknight', 'bbishop', 'bqueen', 'bking'];
let botColor = null;
let castle = ['K', 'Q', 'k', 'q'];
let boardMoves = [];
let checked = false;
let whiteKing = null;
let blackKing = null;
let canKingMove = false;
let castleWhiteQueen = null;
let castleWhiteKing = null;
let castleBlackQueen = null;
let castleBlackKing = null;
let enPassantCell = '-';
let canBeCapturedByEnPassant = null;
let canCaptureEnPassant = null;
let kingMoves = [];
let whiteScore = 0;
let blackScore = 0;

const boardSelector = (isWhite) => {
    chooseSideContainer.style.display = 'none';
    boardEl.style.display = 'flex';
    movesBoard.style.display = 'block';
    pointsEl.style.display = 'flex';
    board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    if(!isWhite){
        boardEl.style.flexFlow = 'row-reverse wrap-reverse';
        numbersContainer.style.flexDirection = 'column';
        lettersContainer.style.flexDirection = 'row-reverse';
        boardColor = 'black';
        joined.forEach((item) => {
            item.classList.add('reverse');
        });
    } else {
        boardColor = 'white';
        joined.forEach((item) => {
            item.classList.add('coordinate');
        });
    }
    enableDragging();
}

function cellIDToBoardIndices(cID){
    if(cID == 'a8'){
        return [0, 0];
    }
    else if(cID == 'b8'){
        return [0, 1];
    }
    else if(cID == 'c8'){
        return [0, 2];
    }
    else if(cID == 'd8'){
        return [0, 3];
    }
    else if(cID == 'e8'){
        return [0, 4];
    }
    else if(cID == 'f8'){
        return [0, 5];
    }
    else if(cID == 'g8'){
        return [0, 6];
    }
    else if(cID == 'h8'){
        return [0, 7];
    }
    else if(cID == 'a7'){
        return [1, 0];
    }
    else if(cID == 'b7'){
        return [1, 1];
    }
    else if(cID == 'c7'){
        return [1, 2];
    }
    else if(cID == 'd7'){
        return [1, 3];
    }
    else if(cID == 'e7'){
        return [1, 4];
    }
    else if(cID == 'f7'){
        return [1, 5];
    }
    else if(cID == 'g7'){
        return [1, 6];
    }
    else if(cID == 'h7'){
        return [1, 7];
    }
    else if(cID == 'a6'){
        return [2, 0];
    }
    else if(cID == 'b6'){
        return [2, 1];
    }
    else if(cID == 'c6'){
        return [2, 2];
    }
    else if(cID == 'd6'){
        return [2, 3];
    }
    else if(cID == 'e6'){
        return [2, 4];
    }
    else if(cID == 'f6'){
        return [2, 5];
    }
    else if(cID == 'g6'){
        return [2, 6];
    }
    else if(cID == 'h6'){
        return [2, 7];
    }
    else if(cID == 'a5'){
        return [3, 0];
    }
    else if(cID == 'b5'){
        return [3, 1];
    }
    else if(cID == 'c5'){
        return [3, 2];
    }
    else if(cID == 'd5'){
        return [3, 3];
    }
    else if(cID == 'e5'){
        return [3, 4];
    }
    else if(cID == 'f5'){
        return [3, 5];
    }
    else if(cID == 'g5'){
        return [3, 6];
    }
    else if(cID == 'h5'){
        return [3, 7];
    }
    else if(cID == 'a4'){
        return [4, 0];
    }
    else if(cID == 'b4'){
        return [4, 1];
    }
    else if(cID == 'c4'){
        return [4, 2];
    }
    else if(cID == 'd4'){
        return [4, 3];
    }
    else if(cID == 'e4'){
        return [4, 4];
    }
    else if(cID == 'f4'){
        return [4, 5];
    }
    else if(cID == 'g4'){
        return [4, 6];
    }
    else if(cID == 'h4'){
        return [4, 7];
    }
    else if(cID == 'a3'){
        return [5, 0];
    }
    else if(cID == 'b3'){
        return [5, 1];
    }
    else if(cID == 'c3'){
        return [5, 2];
    }
    else if(cID == 'd3'){
        return [5, 3];
    }
    else if(cID == 'e3'){
        return [5, 4];
    }
    else if(cID == 'f3'){
        return [5, 5];
    }
    else if(cID == 'g3'){
        return [5, 6];
    }
    else if(cID == 'h3'){
        return [5, 7];
    }
    else if(cID == 'a2'){
        return [6, 0];
    }
    else if(cID == 'b2'){
        return [6, 1];
    }
    else if(cID == 'c2'){
        return [6, 2];
    }
    else if(cID == 'd2'){
        return [6, 3];
    }
    else if(cID == 'e2'){
        return [6, 4];
    }
    else if(cID == 'f2'){
        return [6, 5];
    }
    else if(cID == 'g2'){
        return [6, 6];
    }
    else if(cID == 'h2'){
        return [6, 7];
    }
    else if(cID == 'a1'){
        return [7, 0];
    }
    else if(cID == 'b1'){
        return [7, 1];
    }
    else if(cID == 'c1'){
        return [7, 2];
    }
    else if(cID == 'd1'){
        return [7, 3];
    }
    else if(cID == 'e1'){
        return [7, 4];
    }
    else if(cID == 'f1'){
        return [7, 5];
    }
    else if(cID == 'g1'){
        return [7, 6];
    }
    else if(cID == 'h1'){
        return [7, 7];
    }
}

function boardIndicesTocellID(rowIndex, colIndex){
    if(colIndex == 0){
        return `a${8 - rowIndex}`
    }
    else if(colIndex == 1){
        return `b${8 - rowIndex}`
    }
    else if(colIndex == 2){
        return `c${8 - rowIndex}`
    }
    else if(colIndex == 3){
        return `d${8 - rowIndex}`
    }
    else if(colIndex == 4){
        return `e${8 - rowIndex}`
    }
    else if(colIndex == 5){
        return `f${8 - rowIndex}`
    }
    else if(colIndex == 6){
        return `g${8 - rowIndex}`
    }
    else if(colIndex == 7){
        return `h${8 - rowIndex}`
    }
}

chooseWhite.addEventListener('click', () => boardSelector(true));

chooseBlack.addEventListener('click', () => {
    boardSelector(false);
    botMove();
});

function removePossibleMoves() {
    cells.forEach((el) => {
        const possibleMovesToRemove = el.querySelectorAll('.possible-move');
        possibleMovesToRemove.forEach((moveEl) => {
            el.removeChild(moveEl);
        });
    });
}

function removePossMoveClass(){
    cells.forEach((el) => {
        if(el.classList.contains('poss-move')){
            el.classList.remove('poss-move');
        }
    });
}

// Adds possible moves for friendly pieces
function addPossibleMove(row, col){
    let possId = boardIndicesTocellID(row, col);
    let possCell = document.getElementById(`${possId}`);
    let possibleMove = document.createElement('div');
    possibleMove.classList.add('possible-move');
    possCell.appendChild(possibleMove);
    possCell.classList.add('poss-move');
}

function removeCheck(){
    cells.forEach((cell) => {
        if(cell.classList.contains('under-check')){
            cell.classList.remove('under-check');
            checked = false;
        }
    });
}

function removeHighlightedCells(){
    cells.forEach((el) => {
        if(el.classList.contains('last-move')){
            el.classList.remove('last-move');
        }
        else if(el.classList.contains('last-position')){
            el.classList.remove('last-position');
        }
    });
}

async function postChessApi(data = {}) { // Post Fen to StockFish API
    const response = await fetch("https://chess-api.com/v1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

function pawnPossibleMoves(pawn){
    let [indexRowPawn, indexColPawn] = cellIDToBoardIndices(pawn.id);
    if(boardColor == 'white'){
        if(indexRowPawn - 1 >= 0){
            if(board[indexRowPawn - 1][indexColPawn] == '1'){
                addPossibleMove(indexRowPawn - 1, indexColPawn)
                if(indexRowPawn == 6){
                    if(board[indexRowPawn - 2][indexColPawn] == '1'){
                        addPossibleMove(indexRowPawn - 2, indexColPawn);
                    }
                }
            }
            if(blackPieces.includes(board[indexRowPawn - 1][indexColPawn - 1])){
                addPossibleMove(indexRowPawn - 1, indexColPawn - 1)
            }
            if(blackPieces.includes(board[indexRowPawn - 1][indexColPawn + 1])){
                addPossibleMove(indexRowPawn - 1, indexColPawn + 1);
            }
        }
    }
    else if(boardColor == 'black'){
        if(indexRowPawn + 1 <= 7){
            if(board[indexRowPawn + 1][indexColPawn] == '1'){
                addPossibleMove(indexRowPawn + 1, indexColPawn);
                if(indexRowPawn == 1){
                    if(board[indexRowPawn + 2][indexColPawn] == '1'){
                        addPossibleMove(indexRowPawn + 2, indexColPawn);
                    }
                }
            }
            if(whitePieces.includes(board[indexRowPawn + 1][indexColPawn - 1])){
                addPossibleMove(indexRowPawn + 1, indexColPawn - 1);
            }
            if(whitePieces.includes(board[indexRowPawn + 1][indexColPawn + 1])){
               addPossibleMove(indexRowPawn + 1, indexColPawn + 1);
            }
        }
    }

    // EnPassant
    if(canCaptureEnPassant == pawn.id){
        let [row, col] = cellIDToBoardIndices(canCaptureEnPassant);
        addPossibleMove(row, col);
    }
}

function rookPossibleMoves(rook){
    let [indexRowRook, indexColRook] = cellIDToBoardIndices(rook.id);
    if(boardColor == 'white'){
        //up
        for(let i = indexRowRook - 1; i >= 0; i--){
            if(board[i][indexColRook] == '1'){
                addPossibleMove(i, indexColRook);
            }
            else{
                if(whitePieces.includes(board[i][indexColRook])){
                    break;
                }
                else{
                    addPossibleMove(i, indexColRook);
                    break;   
                }
            }
        }

        //down
        for(let i = indexRowRook + 1; i <= 7; i++){
            if(board[i][indexColRook] == '1'){
                addPossibleMove(i, indexColRook);
            }
            else{
                if(whitePieces.includes(board[i][indexColRook])){
                    break;
                }
                else{
                    addPossibleMove(i, indexColRook);
                    break; 
                }
            }
        }

        //left
        for(let i = indexColRook - 1; i >= 0; i--){
            if(board[indexRowRook][i] == '1'){
                addPossibleMove(indexRowRook, i);
            }
            else{
                if(whitePieces.includes(board[indexRowRook][i])){
                    break;
                }
                else{
                    addPossibleMove(indexRowRook, i);
                    break;   
                }
            }
        }

        //right
        for(let i = indexColRook + 1; i <= 7; i++){
            if(board[indexRowRook][i] == '1'){
                addPossibleMove(indexRowRook, i);
            }
            else{
                if(whitePieces.includes(board[indexRowRook][i])){
                    break;
                }
                else{
                    addPossibleMove(indexRowRook, i);  
                    break; 
                }
            }
        }
    }
    else{
        //up
        for(let i = indexRowRook + 1; i <= 7; i++){
            if(board[i][indexColRook] == '1'){
                addPossibleMove(i, indexColRook);
            }
            else{
                if(blackPieces.includes(board[i][indexColRook])){
                    break;
                }
                else{
                    addPossibleMove(i, indexColRook);
                    break;  
                }
            }
        }

        //down
        for(let i = indexRowRook - 1; i >= 0; i--){
            if(board[i][indexColRook] == '1'){
                addPossibleMove(i, indexColRook);
            }
            else{
                if(blackPieces.includes(board[i][indexColRook])){
                    break;
                }
                else{
                    addPossibleMove(i, indexColRook);
                    break;  
                }
            }
        }

        //left
        for(let i = indexColRook - 1; i >= 0; i--){
            if(board[indexRowRook][i] == '1'){
                addPossibleMove(indexRowRook, i);
            }
            else{
                if(blackPieces.includes(board[indexRowRook][i])){
                    break;
                }
                else{
                    addPossibleMove(indexRowRook, i);
                    break;  
                }
            }
        }

        //right
        for(let i = indexColRook + 1; i <= 7; i++){
            if(board[indexRowRook][i] == '1'){
                addPossibleMove(indexRowRook, i);
            }
            else{
                if(blackPieces.includes(board[indexRowRook][i])){
                    break;
                }
                else{
                   addPossibleMove(indexRowRook, i);
                    break;  
                }
            }
        }
    }
}

function knightPossibleMoves(knight){
    let [indexRowKnight, indexColKnight] = cellIDToBoardIndices(knight.id);
    if(boardColor == 'white'){
        //up up left
        if(indexRowKnight - 2 >= 0 && indexColKnight - 1 >= 0){
            if(board[indexRowKnight - 2][indexColKnight - 1] == '1' || blackPieces.includes(board[indexRowKnight - 2][indexColKnight - 1])){
                addPossibleMove(indexRowKnight - 2, indexColKnight - 1);
            }
        }
        
        //up left left
        if(indexRowKnight - 1 >= 0 && indexColKnight - 2 >= 0){
            if(board[indexRowKnight - 1][indexColKnight - 2] == '1' || blackPieces.includes(board[indexRowKnight - 1][indexColKnight - 2])){
                addPossibleMove(indexRowKnight - 1, indexColKnight - 2);
            }
        }

        //down left left
        if(indexRowKnight + 1 <= 7 && indexColKnight - 2 >= 0){
            if(board[indexRowKnight + 1][indexColKnight - 2] == '1' || blackPieces.includes(board[indexRowKnight + 1][indexColKnight - 2])){
                addPossibleMove(indexRowKnight + 1, indexColKnight - 2);
            }
        }

        //down down left
        if(indexRowKnight + 2 <= 7 && indexColKnight - 1 >= 0){
            if(board[indexRowKnight + 2][indexColKnight - 1] == '1' || blackPieces.includes(board[indexRowKnight + 2][indexColKnight - 1])){
                addPossibleMove(indexRowKnight + 2, indexColKnight - 1);
            }
        }

        //down down right
        if(indexRowKnight + 2 <= 7 && indexColKnight + 1 <= 7){
            if(board[indexRowKnight + 2][indexColKnight + 1] == '1' || blackPieces.includes(board[indexRowKnight + 2][indexColKnight + 1])){
                addPossibleMove(indexRowKnight + 2, indexColKnight + 1);
            }
        }

        //down right right
        if(indexRowKnight + 1 <= 7 && indexColKnight + 2 <= 7){
            if(board[indexRowKnight + 1][indexColKnight + 2] == '1' || blackPieces.includes(board[indexRowKnight + 1][indexColKnight + 2])){
                addPossibleMove(indexRowKnight + 1, indexColKnight + 2);
            }
        }

        //up right right
        if(indexRowKnight - 1 >= 0 && indexColKnight + 2 <= 7){
            if(board[indexRowKnight - 1][indexColKnight + 2] == '1' || blackPieces.includes(board[indexRowKnight - 1][indexColKnight + 2])){
                addPossibleMove(indexRowKnight - 1, indexColKnight + 2);
            }
        }

        //up up right
        if(indexRowKnight - 2 >= 0 && indexColKnight + 1 <= 7){
            if(board[indexRowKnight - 2][indexColKnight + 1] == '1' || blackPieces.includes(board[indexRowKnight - 2][indexColKnight + 1])){
                addPossibleMove(indexRowKnight - 2, indexColKnight + 1);
            }
        }
    }
    else {
         //up up left
         if(indexRowKnight - 2 >= 0 && indexColKnight - 1 >= 0){
            if(board[indexRowKnight - 2][indexColKnight - 1] == '1' || whitePieces.includes(board[indexRowKnight - 2][indexColKnight - 1])){
                addPossibleMove(indexRowKnight - 2, indexColKnight - 1);
            }
        }
        
        //up left left
        if(indexRowKnight - 1 >= 0 && indexColKnight - 2 >= 0){
            if(board[indexRowKnight - 1][indexColKnight - 2] == '1' || whitePieces.includes(board[indexRowKnight - 1][indexColKnight - 2])){
                addPossibleMove(indexRowKnight - 1, indexColKnight - 2);
            }
        }

        //down left left
        if(indexRowKnight + 1 <= 7 && indexColKnight - 2 >= 0){
            if(board[indexRowKnight + 1][indexColKnight - 2] == '1' || whitePieces.includes(board[indexRowKnight + 1][indexColKnight - 2])){
                addPossibleMove(indexRowKnight + 1, indexColKnight - 2);
            }
        }

        //down down left
        if(indexRowKnight + 2 <= 7 && indexColKnight - 1 >= 0){
            if(board[indexRowKnight + 2][indexColKnight - 1] == '1' || whitePieces.includes(board[indexRowKnight + 2][indexColKnight - 1])){
                addPossibleMove(indexRowKnight + 2, indexColKnight - 1);
            }
        }

        //down down right
        if(indexRowKnight + 2 <= 7 && indexColKnight + 1 <= 7){
            if(board[indexRowKnight + 2][indexColKnight + 1] == '1' || whitePieces.includes(board[indexRowKnight + 2][indexColKnight + 1])){
                addPossibleMove(indexRowKnight + 2, indexColKnight + 1);
            }
        }

        //down right right
        if(indexRowKnight + 1 <= 7 && indexColKnight + 2 <= 7){
            if(board[indexRowKnight + 1][indexColKnight + 2] == '1' || whitePieces.includes(board[indexRowKnight + 1][indexColKnight + 2])){
                addPossibleMove(indexRowKnight + 1, indexColKnight + 2);
            }
        }

        //up right right
        if(indexRowKnight - 1 >= 0 && indexColKnight + 2 <= 7){
            if(board[indexRowKnight - 1][indexColKnight + 2] == '1' || whitePieces.includes(board[indexRowKnight - 1][indexColKnight + 2])){
                addPossibleMove(indexRowKnight - 1, indexColKnight + 2);
            }
        }

        //up up right
        if(indexRowKnight - 2 >= 0 && indexColKnight + 1 <= 7){
            if(board[indexRowKnight - 2][indexColKnight + 1] == '1' || whitePieces.includes(board[indexRowKnight - 2][indexColKnight + 1])){
                addPossibleMove(indexRowKnight - 2, indexColKnight + 1);
            }
        }
    }
}

function bishopPossibleMoves(bishop){
    let [indexRowBishop, indexColBishop] = cellIDToBoardIndices(bishop.id);
    if(boardColor == 'white'){
        //up left
        for (let i = 1; indexRowBishop - i >= 0 && indexColBishop - i >= 0; i++) {
            if (board[indexRowBishop - i][indexColBishop - i] == '1' || blackPieces.includes(board[indexRowBishop - i][indexColBishop - i])) {
                addPossibleMove(indexRowBishop - i, indexColBishop - i);
                if(blackPieces.includes(board[indexRowBishop - i][indexColBishop - i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // up right
        for (let i = 1; indexRowBishop - i >= 0 && indexColBishop + i <= 7; i++) {
            if (board[indexRowBishop - i][indexColBishop + i] == '1' || blackPieces.includes(board[indexRowBishop - i][indexColBishop + i])) {
                addPossibleMove(indexRowBishop - i, indexColBishop + i);
                if(blackPieces.includes(board[indexRowBishop - i][indexColBishop + i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // down left
        for (let i = 1; indexRowBishop + i <= 7 && indexColBishop - i >= 0; i++) {
            if (board[indexRowBishop + i][indexColBishop - i] == '1' || blackPieces.includes(board[indexRowBishop + i][indexColBishop - i])) {
                addPossibleMove(indexRowBishop + i, indexColBishop - i);
                if(blackPieces.includes(board[indexRowBishop + i][indexColBishop - i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // down right
        for (let i = 1; indexRowBishop + i <= 7 && indexColBishop + i <= 7; i++) {
            if (board[indexRowBishop + i][indexColBishop + i] == '1' || blackPieces.includes(board[indexRowBishop + i][indexColBishop + i])) {
                addPossibleMove(indexRowBishop + i, indexColBishop + i);
                if(blackPieces.includes(board[indexRowBishop + i][indexColBishop + i])){
                    break;
                }
            } else {
                break;
            }
        }
    }
    else{
        for (let i = 1; indexRowBishop - i >= 0 && indexColBishop - i >= 0; i++) {
            if (board[indexRowBishop - i][indexColBishop - i] == '1' || whitePieces.includes(board[indexRowBishop - i][indexColBishop - i])) {
                addPossibleMove(indexRowBishop - i, indexColBishop - i);
                if(whitePieces.includes(board[indexRowBishop - i][indexColBishop - i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // up right
        for (let i = 1; indexRowBishop - i >= 0 && indexColBishop + i <= 7; i++) {
            if (board[indexRowBishop - i][indexColBishop + i] == '1' || whitePieces.includes(board[indexRowBishop - i][indexColBishop + i])) {
                addPossibleMove(indexRowBishop - i, indexColBishop + i);
                if(whitePieces.includes(board[indexRowBishop - i][indexColBishop + i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // down left
        for (let i = 1; indexRowBishop + i <= 7 && indexColBishop - i >= 0; i++) {
            if (board[indexRowBishop + i][indexColBishop - i] == '1' || whitePieces.includes(board[indexRowBishop + i][indexColBishop - i])) {
                addPossibleMove(indexRowBishop + i, indexColBishop - i);
                if(whitePieces.includes(board[indexRowBishop + i][indexColBishop - i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // down right
        for (let i = 1; indexRowBishop + i <= 7 && indexColBishop + i <= 7; i++) {
            if (board[indexRowBishop + i][indexColBishop + i] == '1' || whitePieces.includes(board[indexRowBishop + i][indexColBishop + i])) {
                addPossibleMove(indexRowBishop + i, indexColBishop + i);
                if(whitePieces.includes(board[indexRowBishop + i][indexColBishop + i])){
                    break;
                }
            } else {
                break;
            }
        } 
    }
}

function queenPossibleMoves(queen){
    let [indexRowQueen, indexColQueen] = cellIDToBoardIndices(queen.id);
    if(boardColor == 'white'){
        //up
        for(let i = indexRowQueen - 1; i >= 0; i--){
            if(board[i][indexColQueen] == '1' || blackPieces.includes(board[i][indexColQueen])){
                addPossibleMove(i, indexColQueen);
                if(blackPieces.includes(board[i][indexColQueen])){
                    break;
                }
            }
            else{
                break;
            }
        }

        //down
        for(let i = indexRowQueen + 1; i <= 7; i++){
            if(board[i][indexColQueen] == '1' || blackPieces.includes(board[i][indexColQueen])){
                addPossibleMove(i, indexColQueen);
                if(blackPieces.includes(board[i][indexColQueen])){
                    break;
                }
            }
            else{
                break;
            }
        }

        //left
        for(let i = indexColQueen - 1; i >= 0; i--){
            if(board[indexRowQueen][i] == '1' || blackPieces.includes(board[indexRowQueen][i])){
                addPossibleMove(indexRowQueen, i);
                if(blackPieces.includes(board[indexRowQueen][i])){
                    break;
                }
            }
            else{
                break;
            }
        }

        //right
        for(let i = indexColQueen + 1; i <= 7; i++){
            if(board[indexRowQueen][i] == '1' || blackPieces.includes(board[indexRowQueen][i])){
                addPossibleMove(indexRowQueen, i);
                if(blackPieces.includes(board[indexRowQueen][i])){
                    break;
                }
            }
            else{
                break;
            }
        }

        //up left
        for (let i = 1; indexRowQueen - i >= 0 && indexColQueen - i >= 0; i++) {
            if (board[indexRowQueen- i][indexColQueen - i] == '1' || blackPieces.includes(board[indexRowQueen- i][indexColQueen - i])) {
                addPossibleMove(indexRowQueen - i, indexColQueen - i);
                if(blackPieces.includes(board[indexRowQueen - i][indexColQueen- i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // up right
        for (let i = 1; indexRowQueen - i >= 0 && indexColQueen + i <= 7; i++) {
            if (board[indexRowQueen - i][indexColQueen + i] == '1' || blackPieces.includes(board[indexRowQueen - i][indexColQueen + i])) {
                addPossibleMove(indexRowQueen- i, indexColQueen+ i);
                if(blackPieces.includes(board[indexRowQueen - i][indexColQueen + i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // down left
        for (let i = 1; indexRowQueen + i <= 7 && indexColQueen - i >= 0; i++) {
            if (board[indexRowQueen + i][indexColQueen - i] == '1' || blackPieces.includes(board[indexRowQueen + i][indexColQueen - i])) {
                addPossibleMove(indexRowQueen + i, indexColQueen - i);
                if(blackPieces.includes(board[indexRowQueen + i][indexColQueen - i])){
                    break;
                }
            } else {
                break;
            }
        }

        // down right
        for (let i = 1; indexRowQueen + i <= 7  && indexColQueen + i <= 7; i++) {
            if (board[indexRowQueen + i][indexColQueen + i] == '1' || blackPieces.includes(board[indexRowQueen + i][indexColQueen + i])) {
                addPossibleMove(indexRowQueen + i, indexColQueen + i);
                if(blackPieces.includes(board[indexRowQueen + i][indexColQueen + i])){
                    break;
                }
            } else {
                break;
            }
        }
    }
    else{
        //up
        for(let i = indexRowQueen + 1; i <= 7; i++){
            if(board[i][indexColQueen] == '1' || whitePieces.includes(board[i][indexColQueen])){
                addPossibleMove(i, indexColQueen);
                if(whitePieces.includes(board[i][indexColQueen])){
                    break;
                }
            }
            else{
                break;
            }
        }

        //down
        for(let i = indexRowQueen - 1; i >= 0; i--){
            if(board[i][indexColQueen] == '1' || whitePieces.includes(board[i][indexColQueen])){
                addPossibleMove(i, indexColQueen);
                if(whitePieces.includes(board[i][indexColQueen])){
                    break;
                }
            }
            else{
                break;
            }
        }

        //left
        for(let i = indexColQueen - 1; i >= 0; i--){
            if(board[indexRowQueen][i] == '1' || whitePieces.includes(board[indexRowQueen][i])){
                addPossibleMove(indexRowQueen, i);
                if(whitePieces.includes(board[indexRowQueen][i])){
                    break;
                }
            }
            else{
                break;
            }
        }

        //right
        for(let i = indexColQueen + 1; i <= 7; i++){
            if(board[indexRowQueen][i] == '1' || whitePieces.includes(board[indexRowQueen][i])){
                addPossibleMove(indexRowQueen, i);
                if(whitePieces.includes(board[indexRowQueen][i])){
                    break;
                }
            }
            else{
                break;
            }
        }

        //up left
        for (let i = 1; indexRowQueen + i <= 7 && indexColQueen - i >= 0; i++) {
            if (board[indexRowQueen + i][indexColQueen - i] == '1' || whitePieces.includes(board[indexRowQueen + i][indexColQueen - i])) {
                addPossibleMove(indexRowQueen + i, indexColQueen - i);
                if(whitePieces.includes(board[indexRowQueen + i][indexColQueen - i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // up right
        for (let i = 1; indexRowQueen + i <= 7 && indexColQueen + i <= 7; i++) {
            if (board[indexRowQueen + i][indexColQueen + i] == '1' || whitePieces.includes(board[indexRowQueen + i][indexColQueen + i])) {
                addPossibleMove(indexRowQueen + i, indexColQueen + i);
                if(whitePieces.includes(board[indexRowQueen + i][indexColQueen + i])){
                    break;
                }
            } else {
                break;
            }
        }
    
        // down left
        for (let i = 1; indexRowQueen - i >= 0 && indexColQueen - i >= 0; i++) {
            if (board[indexRowQueen - i][indexColQueen - i] == '1' || whitePieces.includes(board[indexRowQueen - i][indexColQueen - i])) {
                addPossibleMove(indexRowQueen - i, indexColQueen - i);
                if(whitePieces.includes(board[indexRowQueen - i][indexColQueen - i])){
                    break;
                }
            } else {
                break;
            }
        }

        // down right
        for (let i = 1; indexRowQueen - i >= 0 && indexColQueen + i <= 7; i++) {
            if (board[indexRowQueen - i][indexColQueen + i] == '1' || whitePieces.includes(board[indexRowQueen - i][indexColQueen + i])) {
                addPossibleMove(indexRowQueen - i, indexColQueen + i);
                if(whitePieces.includes(board[indexRowQueen - i][indexColQueen + i])){
                    break;
                }
            } else {
                break;
            }
        }
    }
}

function removeCastle(){
    if(board[7][4] != 'K'){                     // Remove castle if white king moves
        if(castle.includes('K')){
            castle = castle.filter(element => element !== 'K');
        }
        if(castle.includes('Q')){
            castle = castle.filter(element => element !== 'Q');
        }
    }

    if(board[7][0] != 'R'){  // Remove castle white queen side
        if(castle.includes('Q')){
            castle = castle.filter(element => element !== 'Q');
        }
    }

    if(board[7][7] != 'R'){  // Remove castle white king side
        if(castle.includes('K')){
            castle = castle.filter(element => element !== 'K');
        }
    }

    if(board[0][4] != 'k'){                    // Remove castle if black king moves
        if(castle.includes('k')){
            castle = castle.filter(element => element !== 'k');
        }
        if(castle.includes('q')){
            castle = castle.filter(element => element !== 'q');
        }
    }

    if(board[0][0] != 'r'){  // Remove castle black queen side
        if(castle.includes('q')){
            castle = castle.filter(element => element !== 'q');
        }
    }

    if(board[0][7] != 'r'){  // Remove castle black king side
        if(castle.includes('k')){
            castle = castle.filter(element => element !== 'k');
        }
    }
}

function castleMove(startId, endId){  // Player castle
    let rookCell= document.getElementById(`${startId}`);
    let rookToMove = rookCell.getElementsByTagName('img')[0];
    rookCell.removeChild(rookToMove);
    let rookCellMoveTo = document.getElementById(`${endId}`);
    rookCellMoveTo.appendChild(rookToMove);
    removeCastle();
}

function piecePossMovesIfCheck(piece, king){
    removeCheck();

    possibleMoves(piece);

    let [lastPositionPieceRow, lastPositionPieceCol] = cellIDToBoardIndices(piece.id);

    let allPiecePossMoves = [];

    // Adds the piece's possible moves in an array
    cells.forEach((cell) => { 
        if(cell.classList.contains('poss-move')){
            allPiecePossMoves.push(cell.id);
        }
    });

    let finalPiecePossMoves = [];

    while(allPiecePossMoves.length > 0){
        let [possMovePieceRow, possMovePieceCol] = cellIDToBoardIndices(allPiecePossMoves[0]);
        let pieceFromBoard = board[lastPositionPieceRow][lastPositionPieceCol]; // Piece on board we check
        let elementPossMove = board[possMovePieceRow][possMovePieceCol]; // Piece or empty cell we put piece on

        board[possMovePieceRow][possMovePieceCol] = pieceFromBoard;
        board[lastPositionPieceRow][lastPositionPieceCol] = '1';

        removePossibleMoves();
        removePossMoveClass();

        if(king.querySelector('.wking')){
            isWhiteKingUnderCheck();
        }
        else{
            isBlackKingUnderCheck();
        }

        if(checked){
            removeCheck();
        }
        else{
            //add possible moves to the final array
            finalPiecePossMoves.push(allPiecePossMoves[0]);
        }

        board[lastPositionPieceRow][lastPositionPieceCol] = pieceFromBoard;
        board[possMovePieceRow][possMovePieceCol] = elementPossMove;

        king.classList.add('under-check');
        checked = true;

        allPiecePossMoves.shift();
    }

    king.classList.add('under-check');
    checked = true;

    // Display final possible moves
    if(finalPiecePossMoves.length > 0){
        finalPiecePossMoves.forEach((move) => {
            let [possMovePieceRow, possMovePieceCol] = cellIDToBoardIndices(move);
            addPossibleMove(possMovePieceRow, possMovePieceCol);
        });
    }
}

function canKingMoveThere(indexRowKing, indexColKing, indexRowTo, indexColTo){
    let target = board[indexRowTo][indexColTo];
    let currentKing = board[indexRowKing][indexColKing];
    board[indexRowKing][indexColKing] = '1';

    let checkedBefore = checked ? true : false
    checked = false;

    if(boardColor == 'white'){
        board[indexRowTo][indexColTo] = 'K';
        isWhiteKingUnderCheck();
    }
    else{
        board[indexRowTo][indexColTo] = 'k';
        isBlackKingUnderCheck();
    }

    board[indexRowTo][indexColTo] = target;
    board[indexRowKing][indexColKing] = currentKing;

    if(checked){
        removeCheck();
        if(checkedBefore){
            // let a = boardIndicesTocellID(indexRowTo, indexColTo)
            // console.log(a, ' Cell checked')
            // console.log('-------------------------------')
            let cellKing = document.getElementById(boardIndicesTocellID(indexRowKing, indexColKing));
            cellKing.classList.add('under-check');
            checked = true;
        }
        return false;
    }

    let cellKing = document.getElementById(boardIndicesTocellID(indexRowKing, indexColKing));
    cellKing.classList.add('under-check');
    checked = true;

    return true;
}

function kingPossibleMoves(king){
    let [indexRowKing, indexColKing] = cellIDToBoardIndices(king.id);

    if(boardColor == 'white'){
        // Up
        if(indexRowKing - 1 >= 0){
            if(board[indexRowKing - 1][indexColKing] == '1' || blackPieces.includes(board[indexRowKing - 1][indexColKing])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing - 1, indexColKing)){
                    kingMoves.push(indexRowKing - 1, indexColKing)
                }
            }
        }
    
        // Up-Left
        if(indexRowKing - 1 >= 0 && indexColKing - 1 >= 0){
            if(board[indexRowKing - 1][indexColKing - 1] == '1' || blackPieces.includes(board[indexRowKing - 1][indexColKing - 1])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing - 1, indexColKing - 1)){
                    kingMoves.push(indexRowKing - 1, indexColKing - 1);
                }
            }
        }
    
        // Up-Right
        if(indexRowKing - 1 >= 0 && indexColKing + 1 <= 7){
            if(board[indexRowKing - 1][indexColKing + 1] == '1' || blackPieces.includes(board[indexRowKing - 1][indexColKing + 1])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing - 1, indexColKing + 1)){
                    kingMoves.push(indexRowKing - 1, indexColKing + 1);
                }
            }
        }
    
        // Left (including castle)
        if(indexColKing - 1 >= 0){
            if(castle.includes('Q') && indexRowKing == 7 && indexColKing == 4){
                if(board[indexRowKing][indexColKing - 1] == '1' && board[indexRowKing][indexColKing - 2] == '1' && board[indexRowKing][indexColKing - 3] == '1'){
                    if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing - 2)){
                        kingMoves.push(indexRowKing, indexColKing - 1);
                        kingMoves.push(indexRowKing, indexColKing - 2);
                    }
                }
                else {
                    if(board[indexRowKing][indexColKing - 1] == '1' || blackPieces.includes(board[indexRowKing][indexColKing - 1])){
                        if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing - 1)){
                            kingMoves.push(indexRowKing, indexColKing - 1);
                        }
                    }
                }
            }
            else {
                if(board[indexRowKing][indexColKing - 1] == '1' || blackPieces.includes(board[indexRowKing][indexColKing - 1])){
                    if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing - 1)){
                        kingMoves.push(indexRowKing, indexColKing - 1);
                    }
                }
            }
        }
    
        // Right (including castle)
        if(indexColKing + 1 <= 7){
            if(castle.includes('K') && indexRowKing == 7 && indexColKing == 4){
                if(board[indexRowKing][indexColKing + 1] == '1' && board[indexRowKing][indexColKing + 2] == '1'){
                    if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing + 2)){
                        kingMoves.push(indexRowKing, indexColKing + 1);
                        kingMoves.push(indexRowKing, indexColKing + 2);
                    }
                }
                else {
                    if(board[indexRowKing][indexColKing + 1] == '1' || blackPieces.includes(board[indexRowKing][indexColKing + 1])){
                        if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing + 1)){
                            kingMoves.push(indexRowKing, indexColKing + 1);
                        }
                    }
                }
            } 
            else {
                if(board[indexRowKing][indexColKing + 1] == '1' || blackPieces.includes(board[indexRowKing][indexColKing + 1])){
                    if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing + 1)){
                        kingMoves.push(indexRowKing, indexColKing + 1);
                    }
                }
            }
        }
    
        // Down
        if(indexRowKing + 1 <= 7){
            if(board[indexRowKing + 1][indexColKing] == '1' || blackPieces.includes(board[indexRowKing + 1][indexColKing])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing + 1, indexColKing)){
                    kingMoves.push(indexRowKing + 1, indexColKing);
                }
            }
        }
    
        // Down-Left
        if(indexRowKing + 1 <= 7 && indexColKing - 1 >= 0){
            if(board[indexRowKing + 1][indexColKing - 1] == '1' || blackPieces.includes(board[indexRowKing + 1][indexColKing - 1])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing + 1, indexColKing - 1)){
                    kingMoves.push(indexRowKing + 1, indexColKing - 1);
                }
            }
        }
    
        // Down-Right
        if(indexRowKing + 1 <= 7 && indexColKing + 1 <= 7){
            if(board[indexRowKing + 1][indexColKing + 1] == '1' || blackPieces.includes(board[indexRowKing + 1][indexColKing + 1])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing + 1, indexColKing + 1)){
                    kingMoves.push(indexRowKing + 1, indexColKing + 1);
                }
            }
        }
    
    } 
    else {
        // Up
        if(indexRowKing + 1 <= 7){
            if(board[indexRowKing + 1][indexColKing] == '1' || whitePieces.includes(board[indexRowKing + 1][indexColKing])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing + 1, indexColKing)){
                    kingMoves.push(indexRowKing + 1, indexColKing);
                }
            }
        }

        // Up-Left
        if(indexRowKing + 1 <= 7 && indexColKing + 1 <= 7){
            if(board[indexRowKing + 1][indexColKing + 1] == '1' || whitePieces.includes(board[indexRowKing + 1][indexColKing + 1])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing + 1, indexColKing + 1)){
                    kingMoves.push(indexRowKing + 1, indexColKing + 1);
                }
            }
        }

        // Up-Right
        if(indexRowKing + 1 <= 7 && indexColKing - 1 >= 0){
            if(board[indexRowKing + 1][indexColKing - 1] == '1' || whitePieces.includes(board[indexRowKing + 1][indexColKing - 1])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing + 1, indexColKing - 1)){
                    kingMoves.push(indexRowKing + 1, indexColKing - 1);
                }
            }
        }

        // Left (including castle)
        if(indexColKing + 1 <= 7){
            if(castle.includes('k') && indexRowKing == 0 && indexColKing == 4){
                if(board[indexRowKing][indexColKing + 1] == '1' && board[indexRowKing][indexColKing + 2] == '1'){
                    if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing + 2)){
                        kingMoves.push(indexRowKing, indexColKing + 1);
                        kingMoves.push(indexRowKing, indexColKing + 2);
                    }
                }
                else {
                    if(board[indexRowKing][indexColKing + 1] == '1' || whitePieces.includes(board[indexRowKing][indexColKing + 1])){
                        if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing + 1)){
                            kingMoves.push(indexRowKing, indexColKing + 1);
                        }
                    }
                }
            } 
            else {
                if(board[indexRowKing][indexColKing + 1] == '1' || whitePieces.includes(board[indexRowKing][indexColKing + 1])){
                    if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing + 1)){
                        kingMoves.push(indexRowKing, indexColKing + 1);
                    }
                }
            }
        }

        // Right (including castle)
        if(indexColKing - 1 >= 0){
            if(castle.includes('q') && indexRowKing == 0 && indexColKing == 4){
                if(board[indexRowKing][indexColKing - 1] == '1' && board[indexRowKing][indexColKing - 2] == '1' && board[indexRowKing][indexColKing - 3] == '1'){
                    if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing - 2)){
                        kingMoves.push(indexRowKing, indexColKing - 1);
                        kingMoves.push(indexRowKing, indexColKing - 2);
                    }
                }
                else {
                    if(board[indexRowKing][indexColKing - 1] == '1' || whitePieces.includes(board[indexRowKing][indexColKing - 1])){
                        if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing - 1)){
                            kingMoves.push(indexRowKing, indexColKing - 1);
                        }
                    }
                }
            } 
            else {
                if(board[indexRowKing][indexColKing - 1] == '1' || whitePieces.includes(board[indexRowKing][indexColKing - 1])){
                    if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing, indexColKing - 1)){
                        kingMoves.push(indexRowKing, indexColKing - 1);
                    }
                }
            }
        }

        // Down
        if(indexRowKing - 1 >= 0){
            if(board[indexRowKing - 1][indexColKing] == '1' || whitePieces.includes(board[indexRowKing - 1][indexColKing])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing - 1, indexColKing)){
                    kingMoves.push(indexRowKing - 1, indexColKing);
                }
            }
        }

        // Down-Left
        if(indexRowKing - 1 >= 0 && indexColKing + 1 <= 7){
            if(board[indexRowKing - 1][indexColKing + 1] == '1' || whitePieces.includes(board[indexRowKing - 1][indexColKing + 1])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing - 1, indexColKing + 1)){
                    kingMoves.push(indexRowKing - 1, indexColKing + 1);
                }
            }
        }

        // Down-Right
        if(indexRowKing - 1 >= 0 && indexColKing - 1 >= 0){
            if(board[indexRowKing - 1][indexColKing - 1] == '1' || whitePieces.includes(board[indexRowKing - 1][indexColKing - 1])){
                if(canKingMoveThere(indexRowKing, indexColKing, indexRowKing - 1, indexColKing - 1)){
                    kingMoves.push(indexRowKing - 1, indexColKing - 1);
                }
            }
        }
    }

    while(kingMoves.length > 0) {
        let row = kingMoves.shift();
        let col = kingMoves.shift();
        addPossibleMove(row, col);
    }
}

function addMovesAroundKing(indexRow, indexCol){
    if(boardColor == 'white'){
        // Up
        if(indexRow - 1 >= 0){
            if(board[indexRow - 1][indexCol] == '1'){
                addPossibleMove(indexRow - 1, indexCol);
            }
        }

        // Down
        if(indexRow + 1 <= 7){
            if(board[indexRow + 1][indexCol] == '1'){
                addPossibleMove(indexRow + 1, indexCol)
            }
        }

        // Left
        if (indexCol - 1 >= 0) {
            if (board[indexRow][indexCol - 1] == '1') {
                addPossibleMove(indexRow, indexCol - 1);
            }
        }

        // Right
        if (indexCol + 1 <= 7) {
            if (board[indexRow][indexCol + 1] == '1') {
                addPossibleMove(indexRow, indexCol + 1);
            }
        }

        // Up-Left
        if (indexRow - 1 >= 0 && indexCol - 1 >= 0) {
            if (board[indexRow - 1][indexCol - 1] == '1') {
                addPossibleMove(indexRow - 1, indexCol - 1);
            }
        }

        // Up-Right
        if (indexRow - 1 >= 0 && indexCol + 1 <= 7) {
            if (board[indexRow - 1][indexCol + 1] == '1') {
                addPossibleMove(indexRow - 1, indexCol + 1);
            }
        }

        // Down-Left
        if (indexRow + 1 <= 7 && indexCol - 1 >= 0) {
            if (board[indexRow + 1][indexCol - 1] == '1') {
                addPossibleMove(indexRow + 1, indexCol - 1);
            }
        }

        // Down-Right
        if (indexRow + 1 <= 7 && indexCol + 1 <= 7) {
            if (board[indexRow + 1][indexCol + 1] == '1') {
                addPossibleMove(indexRow + 1, indexCol + 1);
            }
        }
    }
    else{
        // Up
        if(indexRow + 1 <= 7){
            if(board[indexRow + 1][indexCol] == '1'){
                addPossibleMove(indexRow + 1, indexCol);
            }
        }

        // Down
        if(indexRow - 1 >= 0){
            if(board[indexRow - 1][indexCol] == '1'){
                addPossibleMove(indexRow - 1, indexCol)
            }
        }

        // Left
        if (indexCol - 1 >= 0) {
            if (board[indexRow][indexCol - 1] == '1') {
                addPossibleMove(indexRow, indexCol - 1);
            }
        }

        // Right
        if (indexCol + 1 <= 7) {
            if (board[indexRow][indexCol + 1] == '1') {
                addPossibleMove(indexRow, indexCol + 1);
            }
        }

        // Up-Left
        if (indexRow + 1 <= 7 && indexCol - 1 >= 0) {
            if (board[indexRow + 1][indexCol - 1] == '1') {
                addPossibleMove(indexRow + 1, indexCol - 1);
            }
        }

        // Up-Right
        if (indexRow + 1 <= 7 && indexCol + 1 <= 7) {
            if (board[indexRow + 1][indexCol + 1] == '1') {
                addPossibleMove(indexRow + 1, indexCol + 1);
            }
        }

        // Down-Left
        if (indexRow - 1 >= 0 && indexCol - 1 >= 0) {
            if (board[indexRow - 1][indexCol - 1] == '1') {
                addPossibleMove(indexRow - 1, indexCol - 1);
            }
        }

        // Down-Right
        if (indexRow - 1 >= 0 && indexCol + 1 <= 7) {
            if (board[indexRow - 1][indexCol + 1] == '1') {
                addPossibleMove(indexRow - 1, indexCol + 1);
            }
        }
    }
}

function allWhitesPossibleMoves(){
    for(let i = 0; i <= 7; i++){
        for(let j = 0; j <= 7; j++){
            let pieceToCheckId = boardIndicesTocellID(i, j);
            let pieceToCheck = document.getElementById(`${pieceToCheckId}`);
            let prevBoardColor = boardColor;
            if(boardColor != 'white'){
                boardColor = 'white';
            }
            if(board[i][j] == 'P'){
                pawnPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'R'){
                rookPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'N'){
                knightPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'B'){
                bishopPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'Q'){
                queenPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'K'){
                addMovesAroundKing(i, j);
            }
            boardColor = prevBoardColor;
        }
    }
}

function allBlacksPossibleMoves(){
    for(let i = 0; i <= 7; i++){
        for(let j = 0; j <= 7; j++){
            let pieceToCheckId = boardIndicesTocellID(i, j);
            let pieceToCheck = document.getElementById(`${pieceToCheckId}`);
            let prevBoardColor = boardColor;
            if(boardColor != 'black'){
                boardColor = 'black';
            }
            if(board[i][j] == 'p'){
                pawnPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'r'){
                rookPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'n'){
                knightPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'b'){
                bishopPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'q'){
                queenPossibleMoves(pieceToCheck);
            }
            else if(board[i][j] == 'k'){
                addMovesAroundKing(i, j);
            }
            boardColor = prevBoardColor;
        }
    }
}

function findKings(){
    for(let i = 0; i <= 7; i++){
        for(let j = 0; j <= 7; j++){
            if(board[i][j] == 'K'){
                let whiteKingId = boardIndicesTocellID(i, j);
                whiteKing = document.getElementById(whiteKingId);
            }
            if(board[i][j] == 'k'){
                let blackKingId = boardIndicesTocellID(i, j);
                blackKing = document.getElementById(blackKingId);
            }
        }
    }
}

function isWhiteKingUnderCheck(){
    findKings();
    allBlacksPossibleMoves();
    if(whiteKing.querySelector('.possible-move')){
        checked = true;
        whiteKing.classList.add('under-check');
    }
    removePossibleMoves();
    removePossMoveClass();
}

function isBlackKingUnderCheck(){
    findKings();
    allWhitesPossibleMoves();
    if(blackKing.querySelector('.possible-move')){
        checked = true;
        blackKing.classList.add('under-check');
    }
    removePossibleMoves();
    removePossMoveClass();
}

function displayTurn(moveFrom, moveTo){
    if(boardMoves.length % 2 == 0){
        let moveDiv = document.createElement('div');
        moveDiv.classList.add('move');

        let moveTurn = document.createElement('span');
        moveTurn.textContent = `${turn}.`;
        moveTurn.id = 'move-turn';

        let moveFromTo = document.createElement('span');
        moveFromTo.innerText = `${moveFrom} → ${moveTo}`;
        moveFromTo.id = 'move-from-to';

        moveDiv.appendChild(moveTurn);
        moveDiv.appendChild(moveFromTo);

        movesBoard.appendChild(moveDiv);
    } 
    else{
        let moveDivArr = movesBoard.querySelectorAll('.move');
        let moveDiv = moveDivArr[moveDivArr.length - 1];
        let moveFromTo = document.createElement('span');
        moveFromTo.innerText = `${moveFrom} → ${moveTo}`;
        moveFromTo.id = 'move-from-to';
        moveDiv.appendChild(moveFromTo);
    }
    boardMoves.push(`${moveFrom} → ${moveTo}`);
}

function castleBot(rowRookWas, colRookWas, rowRookGoes, colRookGoes, cellIdRookWas, cellIdRookGoes, rook){ // bot castle
    board[rowRookWas][colRookWas] = '1';
    board[rowRookGoes][colRookGoes] = `${rook}`;
    let cellRookWas = document.getElementById(`${cellIdRookWas}`);
    let rookImgBot = cellRookWas.querySelector('.piece');
    let cellRookGoes = document.getElementById(`${cellIdRookGoes}`);
    cellRookGoes.appendChild(rookImgBot);
    removeCastle();
}

function changePawnBot(piece, className, pawn){
    piece.src = `images/${className}.png`;
    piece.classList.remove(pawn);
    piece.classList.add(className);
}

function makeFenString(){
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR     // starting Fen string
    let fenString = '';
    let result = [];
    let playerColor = '';
    let botColor = '';

    for (let row of board) {    // Make the new fen string
        let rowString = "";
        let emptyCount = 0;
        
        for (let cell of row) {
            if (cell === '1') {
                emptyCount++;
            } else {
                if (emptyCount > 0) {
                    rowString += emptyCount;
                    emptyCount = 0;
                }
                rowString += cell;
            }
        }
        
        if (emptyCount > 0) {
            rowString += emptyCount;
        }
        
        result.push(rowString);
    }
    
    fenString = result.join('/');

    let castleStatus = castle.length > 0 ? castle.join('') : '-';

    if(boardColor == 'white'){   
        botColor = 'b';
        playerColor = 'w';
    } 
    else {
        botColor = 'w';
        playerColor = 'b';
    }

    return {
        'fenString': fenString,
        'playerColor': playerColor,
        'botColor': botColor,
        'castleStatus': castleStatus,
        'enPassantCell': enPassantCell,
        'turn': turn
    }
}

function checkForEnPassant(prevRow, currentRow, currentCol){
    if(board[currentRow][currentCol] == 'P' || board[currentRow][currentCol] == 'p'){
        if(boardColor == 'white'){
            if(prevRow - 2 == currentRow){  // If it was the pawn's first move
                if(board[currentRow][currentCol - 1] == 'p'){   // Check for enemy pawn on the left
                    enPassantCell = boardIndicesTocellID(currentRow - 1, currentCol);
                    canBeCapturedByEnPassant = boardIndicesTocellID(currentRow, currentCol);
                    canCaptureEnPassant = boardIndicesTocellID(currentRow, currentCol - 1);
                }
                else if(board[currentRow][currentCol + 1] == 'p'){  // Check for enemy pawn on the right
                    enPassantCell = boardIndicesTocellID(currentRow - 1, currentCol);
                    canBeCapturedByEnPassant = boardIndicesTocellID(currentRow, currentCol);
                    canCaptureEnPassant = boardIndicesTocellID(currentRow, currentCol + 1);
                }
            }
        }
        else {
            if(prevRow + 2 == currentRow){  // If it was the pawn's first move
                if(board[currentRow][currentCol + 1] == 'P'){   // Check for enemy pawn on the left
                    enPassantCell = boardIndicesTocellID(currentRow - 1, currentCol);
                    canBeCapturedByEnPassant = boardIndicesTocellID(currentRow, currentCol);
                    canCaptureEnPassant = boardIndicesTocellID(currentRow, currentCol + 1);
                }
                else if(board[currentRow][currentCol - 1] == 'P'){  // Check for enemy pawn on the right
                    enPassantCell = boardIndicesTocellID(currentRow - 1, currentCol);
                    canBeCapturedByEnPassant = boardIndicesTocellID(currentRow, currentCol);
                    canCaptureEnPassant = boardIndicesTocellID(currentRow, currentCol - 1);
                }
            }
        }
    }
}

function resetEnPassant(){
    if(enPassantCell != '-'){
        enPassantCell = '-';
        canBeCapturedByEnPassant = null;
        canCaptureEnPassant = null;
    }
}

const endGameDiv = (sideWon, state) => setTimeout(() =>{
    boardEl.style.pointerEvents = 'none';
    const endDiv = document.createElement('div');
    endDiv.classList.add('endDiv');
    
    const winOrLoseText = document.createElement('h1');
    const sideThatWon = document.createElement('h3');
    if(state == 'mate'){
        if(sideWon == 'player'){
            winOrLoseText.textContent = 'You Win!';
            winOrLoseText.classList.add('player-won');
            if(boardColor == 'white'){
                sideThatWon.textContent = 'White is victorious!';
            }
            else{
                sideThatWon.textContent = 'Black is victorious!';
            }
        }
        else if(sideWon == 'bot'){
            winOrLoseText.textContent = 'You Lost!';
            winOrLoseText.classList.add('player-lost');
            if(boardColor == 'white'){
                sideThatWon.textContent = 'Black is victorious!';
            }
            else{
                sideThatWon.textContent = 'White is victorious!';
            }
        }
    }
    else if(state == 'error'){
        winOrLoseText.textContent = 'Something went wrong';
        sideThatWon.textContent = 'The game is terminated!';
    }

    const playAgain = document.createElement('button');
    playAgain.textContent = 'PLAY AGAIN';

    playAgain.addEventListener('click', () => {
        location.reload();
    });

    endDiv.appendChild(winOrLoseText);
    endDiv.appendChild(sideThatWon);
    endDiv.appendChild(playAgain);

    container.appendChild(endDiv);
}, "300");

function isMate(toMove){
    let fen = makeFenString();
    if(toMove == 'player'){
        postChessApi({ fen: `${fen['fenString']} ${fen['playerColor']} ${fen['castleStatus']} ${fen['enPassantCell']} 0 ${fen['turn']}` }).then((data) => {
            if(data.type === 'error'){
                if(checked){
                    endGameDiv('bot', 'mate');
                }
                else{
                    endGameDiv('player', 'error');
                }
            }
        });
    }
    else if(toMove == 'bot'){
        postChessApi({ fen: `${fen['fenString']} ${fen['botColor']} ${fen['castleStatus']} ${fen['enPassantCell']} 0 ${fen['turn']}` }).then((data) => {
            if(data.type === 'error'){
                if(checked){
                    endGameDiv('player', 'mate');
                }
                else{
                    endGameDiv('bot', 'error');
                }
            }
        });
    }
 }

const botMove = () => setTimeout(() => {

    let fenBot = makeFenString();

    postChessApi({ fen: `${fenBot['fenString']} ${fenBot['botColor']} ${fenBot['castleStatus']} ${fenBot['enPassantCell']} 0 ${fenBot['turn']}` }).then((data) => {
        //console.log(`${fenBot['fenString']} ${fenBot['botColor']} ${fenBot['castleStatus']} ${fenBot['enPassantCell']} 0 ${fenBot['turn']}`)
        //console.log(data, 'Bot Move')
        removeCheck();
        removeHighlightedCells();
        let botMoveArr = data.text.split(' ');
        let startPos = botMoveArr[1];
        let endPos = botMoveArr[3];
        displayTurn(startPos, endPos);
        let [startPosRow, startPosCol] = cellIDToBoardIndices(`${startPos}`);
        let [endPosRow, endPosCol] = cellIDToBoardIndices(`${endPos}`);
        let cellValueMovedTo = board[endPosRow][endPosCol];
        let pieceToMoveBot = board[startPosRow][startPosCol];
        board[startPosRow][startPosCol] = '1';
        board[endPosRow][endPosCol] = pieceToMoveBot;
        let startCellBot = document.getElementById(`${startPos}`);
        let pieceImgBot = startCellBot.querySelector('.piece');
        startCellBot.removeChild(pieceImgBot);
        let endCellBot = document.getElementById(`${endPos}`);
        if(endCellBot.querySelector('.piece')){
            endCellBot.removeChild(endCellBot.querySelector('.piece'));
            updateScore(cellValueMovedTo);
        }
        if(endPos == enPassantCell){
            let toCapture = document.getElementById(canBeCapturedByEnPassant);
            toCapture.removeChild(toCapture.querySelector('.piece'));
            if(boardColor == 'white'){
                updateScore('P');
            }
            else{
                updateScore('p');
            }
        }
        resetEnPassant();
        checkForEnPassant(startPosRow, endPosRow, endPosCol);
        endCellBot.appendChild(pieceImgBot);
        startCellBot.classList.add('last-position');
        endCellBot.classList.add('last-move');
        if(startPos == 'e8' && endPos == 'g8' && pieceToMoveBot == 'k'){
            castleBot(0, 7, 0, 5, 'h8', 'f8', 'r');
        }
        if(startPos == 'e8' && endPos == 'c8' && pieceToMoveBot == 'k'){
            castleBot(0, 0, 0, 3, 'a8', 'd8', 'r');
        }
        if(startPos == 'e1' && endPos == 'g1' && pieceToMoveBot == 'K'){
            castleBot(7, 7, 7, 5, 'h1', 'f1', 'R');
        }
        if(startPos == 'e1' && endPos == 'c1' && pieceToMoveBot == 'K'){
            castleBot(7, 0, 7, 3, 'a1', 'd1', 'R');
        }

        if(boardColor == 'white'){  // Promotion for black
            let piece = endCellBot.querySelector('.piece');
            if(endPosRow == 7 && board[endPosRow][endPosCol] == 'p'){
                board[endPosRow][endPosCol] = data.promotion;
                if(data.promotion == 'q'){
                    changePawnBot(piece, 'bqueen', 'bpawn');
                    blackScore += 9;
                    blackPointsEl.textContent = `+${blackScore}`;
                }
                else if(data.promotion == `r`){
                    blackScore += 5;
                    blackPointsEl.textContent = `+${blackScore}`;
                    changePawnBot(piece, 'brook', 'bpawn');
                }
                else if(data.promotion == 'b'){
                    blackScore += 3;
                    blackPointsEl.textContent = `+${blackScore}`;
                    changePawnBot(piece, 'bbishop', 'bpawn');
                }
                else if(data.promotion == 'n'){
                    blackScore += 3;
                    blackPointsEl.textContent = `+${blackScore}`;
                    changePawnBot(piece, 'bknight', 'bpawn');
                }
            }
        }
        else{                   // Promotion for white
            if(endPosRow == 0 && board[endPosRow][endPosCol] == 'P'){
                let piece = endCellBot.querySelector('.piece');
                if(data.promotion == 'q'){
                    changePawnBot(piece, 'wqueen', 'wpawn');
                    whiteScore += 9;
                    whitePointsEl.textContent = `+${whiteScore}`;
                    board[endPosRow][endPosCol] = 'Q';
                }
                else if(data.promotion == `r`){
                    whiteScore += 5;
                    whitePointsEl.textContent = `+${whiteScore}`;
                    changePawnBot(piece, 'wrook', 'wpawn');
                    board[endPosRow][endPosCol] = 'R';
                }
                else if(data.promotion == `b`){
                    whiteScore += 3;
                    whitePointsEl.textContent = `+${whiteScore}`;
                    changePawnBot(piece, 'wbishop', 'wpawn');
                    board[endPosRow][endPosCol] = 'B';
                }
                else if(data.promotion == `n`){
                    whiteScore += 3;
                    whitePointsEl.textContent = `+${whiteScore}`;
                    changePawnBot(piece, 'wknight', 'wpawn');
                    board[endPosRow][endPosCol] = 'N';
                }
            }
        }

        removeCastle();
        removeCheck();
        isWhiteKingUnderCheck()
        isBlackKingUnderCheck();
        if(boardColor == 'white'){
            turn++;
        }
        isMate('player');
    });
  }, "500");

// Calls possible moves function for a piece
function possibleMoves(piece){
    let [indexRow, indexCol] = cellIDToBoardIndices(piece.id);
    if (board[indexRow][indexCol] == 'P' || board[indexRow][indexCol] == 'p') {
        pawnPossibleMoves(piece);
    }
    if (board[indexRow][indexCol] == 'R' || board[indexRow][indexCol] == 'r') {
        rookPossibleMoves(piece);
    }
    if (board[indexRow][indexCol] == 'N' || board[indexRow][indexCol] == 'n') {
        knightPossibleMoves(piece);
    }
    if (board[indexRow][indexCol] == 'B' || board[indexRow][indexCol] == 'b') {
        bishopPossibleMoves(piece);
    }
    if (board[indexRow][indexCol] == 'Q' || board[indexRow][indexCol] == 'q') {
        queenPossibleMoves(piece);
    }
    if (board[indexRow][indexCol] == 'K' || board[indexRow][indexCol] == 'k') {
        kingPossibleMoves(piece);
    }
}

// Enable dragging
function enableDragging() {
    pieces.forEach(piece => {
        if(isPieceFriendly(piece.parentNode)){
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragStart);
        }
        else{
            piece.setAttribute('draggable', false);
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('drop', dropPiece);
    });
}

// Removes the class "clicked"
function removeClickedClass(){
    cells.forEach((el) => {
        if(el.classList.contains('clicked')){
            el.classList.remove('clicked');
        }
    })
}

// Start dragging
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.parentNode.id);
    event.target.classList.add('dragging');
    const sourceCellID = event.dataTransfer.getData('text/plain');
    const sourceCell = document.getElementById(sourceCellID);
    removeClickedClass();
    sourceCell.classList.add('clicked');
    removePossibleMoves();
    removePossMoveClass();
    if(checked){
        findKings();
        if(sourceCell.querySelector('.wking') || sourceCell.querySelector('.bking')){
            possibleMoves(sourceCell);
        }
        else{
            if(boardColor == 'white'){ 
                piecePossMovesIfCheck(sourceCell, whiteKing);
            }
            else{
                piecePossMovesIfCheck(sourceCell, blackKing);
            }
        }
    }
    else{
        possibleMoves(sourceCell); // Adds possible moves when you start dragging a fiendly piece
    }
    makeEnemyPiecesBackGImages();
}

function makeEnemyPiecesBackGImages(){
    cells.forEach((cell) => {
        if(cell.querySelector('.piece')){
            if(!isPieceFriendly(cell)){
                const imgElement = cell.querySelector('img');
                const imgSrc = imgElement.src;
                cell.style.backgroundImage = `url('${imgSrc}')`;
                cell.style.backgroundSize = '95px 95px';
                cell.removeChild(imgElement)
            }
        }
    });
}

function createImage(cell, type){
    let img = document.createElement('img');
    img.classList.add('piece');
    img.classList.add(`${type}`);
    img.setAttribute('draggable', false);
    img.src = `images/${type}.png`;
    cell.appendChild(img);
}

function removeBackgroundImage(cell){
    cell.style.backgroundImage = '';
    cell.style.backgroundPosition = '';
    cell.style.backgroundSize = '';
}

function removeAllImagesInACell(cell){
    let images = cell.getElementsByTagName('img');
    while (images.length > 0) {
        images[0].parentNode.removeChild(images[0]);
    }
}

function revertEnemiesToPieces(){
    for(let i = 0; i <= 7; i++){
        for(let j = 0; j <= 7; j++){
            if(board[i][j] != '1'){
                let cellId = boardIndicesTocellID(i, j);
                let cell = document.getElementById(cellId);
                if(boardColor == 'white'){
                    if(board[i][j] == 'p'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'bpawn');
                    }
                    else if(board[i][j] == 'r'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'brook');
                    }
                    else if(board[i][j] == 'n'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'bknight');
                    }
                    else if(board[i][j] == 'b'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'bbishop');
                    }
                    else if(board[i][j] == 'q'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'bqueen');
                    }
                    else if(board[i][j] == 'k'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'bking');
                    }
                }
                else{
                    if(board[i][j] == 'P'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'wpawn');
                     }
                     else if(board[i][j] == 'R'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'wrook');
                     }
                     else if(board[i][j] == 'N'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'wknight');
                     }
                     else if(board[i][j] == 'B'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'wbishop');
                     }
                     else if(board[i][j] == 'Q'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'wqueen');
                     }
                     else if(board[i][j] == 'K'){
                        removeAllImagesInACell(cell);
                        removeBackgroundImage(cell);
                        createImage(cell, 'wking');
                    }
                }  
            }
        }
    }
}

// Allow the piece to be dragged over cells
function dragOver(event) {
    event.preventDefault();
    let cellUnder = event.target;
    let possMove = cellUnder.querySelector('.possible-move') ? cellUnder.querySelector('.possible-move') : null;
    if(possMove){
        cellUnder.removeChild(possMove);  // Remove possible-move on hover
    }
}

// Handle the drop
function dropPiece(event) {
    event.preventDefault();
    const sourceCellID = event.dataTransfer.getData('text/plain'); // start cell
    const sourceCell = document.getElementById(sourceCellID);
    const piece = sourceCell.querySelector('.piece');
    
    if(sourceCell == event.target.parentNode || !event.target.parentNode.classList.contains('poss-move')){ // if a piece isn't dropped on a legal square or is placed in the same place
        removePossibleMoves();
        removePossMoveClass();
        possibleMoves(sourceCell);
        revertEnemiesToPieces();
    }

    if(sourceCell != event.target && event.target.classList.contains('poss-move')){ // if piece is dropped on a legal square
        revertEnemiesToPieces();
        removeCheck();                             // If king is under check remove it
        removeHighlightedCells(); 
        movePiece(sourceCell, event.target);
        removeClickedClass();
        isWhiteKingUnderCheck();                   // Check if white king is under check
        isBlackKingUnderCheck();                   // Check if white king is under check
        removePossibleMoves();
        removePossMoveClass();
        displayTurn(sourceCellID, event.target.id);
        if(boardColor == 'black'){
            turn++;
        }
        isMate('bot');
        botMove();
    }
    piece.classList.remove('dragging');
}

function updateScore(piece){
    if(piece == 'p'){
        whiteScore++;
    }
    else if(piece == 'r'){
        whiteScore += 5;
    }
    else if(piece == 'n' || piece == 'b'){
        whiteScore += 3;
    }
    else if(piece == 'q'){
        whiteScore += 9;
    }
    else if(piece == 'P'){
        blackScore++;
    }
    else if(piece == 'R'){
        blackScore += 5;
    }
    else if(piece == 'N' || piece == 'B'){
        blackScore += 3;
    }
    else if(piece == 'Q'){
        blackScore += 9;
    }

    whitePointsEl.textContent = `+${whiteScore}`;
    blackPointsEl.textContent = `+${blackScore}`;
}

function movePiece(sourceCell, targetCell) {
    let piece = sourceCell.querySelector('.piece');
    let [indexRowFrom, indexColFrom] = cellIDToBoardIndices(sourceCell.id);
    let [indexRowTo, indexColTo] = cellIDToBoardIndices(targetCell.id);
    if(board[indexRowTo][indexColTo] != '1'){   // Capture enemy piece
        targetCell.style.backgroundImage = '';
        targetCell.style.backgroundPosition = '';
        targetCell.style.backgroundSize = '';
        updateScore(board[indexRowTo][indexColTo]);
    }
    if(targetCell.id == enPassantCell){
        let toCapture = document.getElementById(canBeCapturedByEnPassant);
        toCapture.removeChild(toCapture.querySelector('.piece'));
        if(boardColor == 'white'){
            updateScore('p');
        }
        else{
            updateScore('P');
        }
    }

    targetCell.innerHTML = ''; // Clear target cell
    sourceCell.innerHTML = ''; // Clear the source cell

    board[indexRowTo][indexColTo] = board[indexRowFrom][indexColFrom]; // Update the board array with the new piece position
    board[indexRowFrom][indexColFrom] = '1'; // Empty the source cell in the board array

    if((board[indexRowTo][indexColTo] == 'p' && indexRowTo == 7) || (board[indexRowTo][indexColTo] == 'P' && indexRowTo == 0)){          // promote pawn
        let promoteCell = boardIndicesTocellID(indexRowTo, indexColTo);
        let promoteContainer = document.createElement('div');
        promoteContainer.id = 'promote-container';
        let wqueen = null;
        let wknight = null;
        let wrook = null;
        let wbishop = null;
        let bqueen = null;
        let bknight = null;
        let brook = null;
        let bbishop = null;

        function promoteOptions(className, imgSrc){
            let pieceContainer = document.createElement('div');
            pieceContainer.classList.add('promote-square');
            let pieceImg = document.createElement('img');
            pieceImg.classList.add('piece');
            pieceImg.classList.add(`${className}`);
            pieceImg.src = `${imgSrc}`;
            pieceImg.addEventListener('dragstart', dragStart);
            pieceImg.setAttribute('draggable', true);
            pieceContainer.appendChild(pieceImg);
            promoteContainer.appendChild(pieceContainer);
            if(pieceImg.classList.contains('wqueen')){
                wqueen = pieceImg;
            }
            else if(pieceImg.classList.contains('wknight')){
                wknight = pieceImg;
            }
            else if(pieceImg.classList.contains('wrook')){
                wrook = pieceImg;
            }
            else if(pieceImg.classList.contains('wbishop')){
                wbishop = pieceImg;
            }
            else if(pieceImg.classList.contains('bqueen')){
                bqueen = pieceImg;
            }
            else if(pieceImg.classList.contains('bknight')){
                bknight = pieceImg;
            }
            else if(pieceImg.classList.contains('brook')){
                brook = pieceImg;
            }
            else if(pieceImg.classList.contains('bbishop')){
                bbishop = pieceImg;
            }
            
        }

        if(board[indexRowTo][indexColTo] == 'P' && indexRowTo == 0){
            promoteOptions('wqueen', 'images/wqueen.png');
            promoteOptions('wknight', 'images/wknight.png');
            promoteOptions('wrook', 'images/wrook.png');
            promoteOptions('wbishop', 'images/wbishop.png');

            boardEl.appendChild(promoteContainer);
            if(promoteCell == 'b8'){
                promoteContainer.style.left = '98px';
            }
            else if(promoteCell == 'c8'){
                promoteContainer.style.left = '196px';
            }
            else if(promoteCell == 'd8'){
                promoteContainer.style.left = '294px';
            }
            else if(promoteCell == 'e8'){
                promoteContainer.style.left = '392px';
            }
            else if(promoteCell == 'f8'){
                promoteContainer.style.left = '490px';
            }
            else if(promoteCell == 'g8'){
                promoteContainer.style.left = '588px';
            }
            else if(promoteCell == 'h8'){
                promoteContainer.style.left = '686px';
            }

            let promotablePices = promoteContainer.querySelectorAll('.promote-square');
            promotablePices.forEach((cont) => {
                cont.addEventListener('click', () => {
                    piece = cont.getElementsByTagName('img')[0];
                    targetCell.innerHTML = '';
                    if(piece.classList.contains('wqueen')){
                        board[indexRowTo][indexColTo] = 'Q';
                        targetCell.appendChild(wqueen);
                        whitePointsEl = `+${whiteScore + 9}`;
                    }
                    else if(piece.classList.contains('wknight')){
                        board[indexRowTo][indexColTo] = 'N';
                        targetCell.appendChild(wknight);
                        whitePointsEl = `+${whiteScore + 3}`;
                    }
                    else if(piece.classList.contains('wrook')){
                        board[indexRowTo][indexColTo] = 'R';
                        targetCell.appendChild(wrook);
                        blackPointsEl = `+${blackScore + 5}`;
                    }
                    else if(piece.classList.contains('wbishop')){
                        board[indexRowTo][indexColTo] = 'B';
                        targetCell.appendChild(wbishop);
                        whitePointsEl = `+${whiteScore + 3}`;
                    }
                    boardEl.removeChild(promoteContainer);
                });
            });
        }
        else if(board[indexRowTo][indexColTo] == 'p' && indexRowTo == 7){
            promoteOptions('bqueen', 'images/bqueen.png');
            promoteOptions('bknight', 'images/bknight.png');
            promoteOptions('brook', 'images/brook.png');
            promoteOptions('bbishop', 'images/bbishop.png');

            boardEl.appendChild(promoteContainer);
            if(promoteCell == 'a1'){
                promoteContainer.style.left = '686px';
                promoteContainer.style.top = '0px';
            }
            else if(promoteCell == 'b1'){
                promoteContainer.style.left = '588px';
                promoteContainer.style.top = '0px';
            }
            else if(promoteCell == 'c1'){
                promoteContainer.style.left = '490px';
                promoteContainer.style.top = '0px';
            }
            else if(promoteCell == 'd1'){
                promoteContainer.style.left = '392px';
                promoteContainer.style.top = '0px';
            }
            else if(promoteCell == 'e1'){
                promoteContainer.style.left = '294px';
                promoteContainer.style.top = '0px';
            }
            else if(promoteCell == 'f1'){
                promoteContainer.style.left = '196px';
                promoteContainer.style.top = '0px';
            }
            else if(promoteCell == 'g1'){
                promoteContainer.style.left = '98px';
                promoteContainer.style.top = '0px';
            }
            else if(promoteCell == 'h1'){
                promoteContainer.style.left = '0px';
                promoteContainer.style.top = '0px';
            }


            let promotablePices = promoteContainer.querySelectorAll('.promote-square');
            promotablePices.forEach((cont) => {
                cont.addEventListener('click', () => {
                    piece = cont.getElementsByTagName('img')[0];
                    targetCell.innerHTML = '';
                    if(piece.classList.contains('bqueen')){
                        board[indexRowTo][indexColTo] = 'q';
                        targetCell.appendChild(bqueen);
                        blackPointsEl = `+${blackScore + 9}`;
                    }
                    else if(piece.classList.contains('bknight')){
                        board[indexRowTo][indexColTo] = 'n';
                        targetCell.appendChild(bknight);
                        blackPointsEl = `+${blackScore + 3}`;
                    }
                    else if(piece.classList.contains('brook')){
                        board[indexRowTo][indexColTo] = 'r';
                        targetCell.appendChild(brook);
                        blackPointsEl = `+${blackScore + 5}`;
                    }
                    else if(piece.classList.contains('bbishop')){
                        board[indexRowTo][indexColTo] = 'b';
                        targetCell.appendChild(bbishop);
                        blackPointsEl = `+${blackScore + 3}`;
                    }
                    boardEl.removeChild(promoteContainer);
                });
            });
        }
    }

    sourceCell.classList.add('last-position');
    targetCell.classList.add('last-move');
    removePossibleMoves();

    // Castle
    if(board[7][6] == 'K' && castle.includes('K')){
        castleMove('h1', 'f1');
        board[7][7] = '1';
        board[7][5] = 'R';
    }
    if(board[7][2] == 'K' && castle.includes('Q')){
        castleMove('a1', 'd1');
        board[7][0] = '1';
        board[7][3] = 'R';
    }
    if(board[0][2] == 'k' && castle.includes('q')){
        castleMove('a8', 'd8');
        board[0][0] = '1';
        board[0][3] = 'r';
    }
    if(board[0][6] == 'k' && castle.includes('k')){
        castleMove('h8', 'f8');
        board[0][7] = '1';
        board[0][7] = 'r';
    }

    resetEnPassant();
    checkForEnPassant(indexRowFrom, indexRowTo, indexColTo);
    removeCastle();

    targetCell.appendChild(piece); // Move the piece to the new cell

}

function isPieceFriendly(cell){   // Checks If the clicked cell is friendly
    if(cell.querySelector('.piece')){
        let piece = cell.querySelector('.piece');
        let pieceClasses = piece.classList;
        if(boardColor == 'white'){
            if(whitePiecesClasses.includes(pieceClasses[1])){
                return true;
            }
            return false;
        }
        else{
            if(blackPiecesClasses.includes(pieceClasses[1])){
                return true;
            }
            return false;
        }
    }
    return false;
}

// Shows possible moves on clicking a friendly piece
cells.forEach((el) => {
    el.addEventListener('click', () => {
        if(isPieceFriendly(el)){
            if(el.classList.contains('clicked')){
                removeClickedClass();
                removePossibleMoves();
                removePossMoveClass();
            }
            else{
                removePossibleMoves();
                removePossMoveClass();
                removeClickedClass();
                el.classList.add('clicked');
                if(checked){
                    findKings();
                    if(el.querySelector('.wking') || el.querySelector('.bking')){
                        possibleMoves(el);
                    }
                    else{
                        if(boardColor == 'white'){ 
                            piecePossMovesIfCheck(el, whiteKing);
                        }
                        else{
                            piecePossMovesIfCheck(el, blackKing);
                        }
                    }
                }
                else{
                    possibleMoves(el);
                }
            }   
        }
    });
});
