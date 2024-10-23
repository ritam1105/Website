function resetBoard() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            document.getElementById(`cell-${i}-${j}`).value = '';
        }
    }
    document.getElementById('status').textContent = 'Board reset.';
}

function isSafe(board, row, col, num) {
    // Check for duplicates in the row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
    }

    // Check for duplicates in the column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
    }

    // Check for duplicates in the 3x3 grid
    let boxRow = 3 * Math.floor(row / 3);
    let boxCol = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] === num) return false;
        }
    }
    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0; // Backtrack
                    }
                }
                return false; // No valid number found
            }
        }
    }
    return true; // Solved
}

function validateInput(board) {
    let seenNumbers = new Set();

    for (let row = 0; row < 9; row++) {
        seenNumbers.clear();
        for (let col = 0; col < 9; col++) {
            const num = board[row][col];
            if (num !== 0) {
                if (seenNumbers.has(num)) {
                    return true; // Duplicate found
                }
                seenNumbers.add(num);
            }
        }
    }

    for (let col = 0; col < 9; col++) {
        seenNumbers.clear();
        for (let row = 0; row < 9; row++) {
            const num = board[row][col];
            if (num !== 0) {
                if (seenNumbers.has(num)) {
                    return true; // Duplicate found
                }
                seenNumbers.add(num);
            }
        }
    }

    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            seenNumbers.clear();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const num = board[boxRow * 3 + i][boxCol * 3 + j];
                    if (num !== 0) {
                        if (seenNumbers.has(num)) {
                            return true; // Duplicate found
                        }
                        seenNumbers.add(num);
                    }
                }
            }
        }
    }

    return false; // No duplicates found
}

function solveSudoku() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 9; j++) {
            let cellValue = document.getElementById(`cell-${i}-${j}`).value;
            board[i][j] = cellValue === "" ? 0 : parseInt(cellValue);
        }
    }

    // Validate input
    if (validateInput(board)) {
        document.getElementById('status').textContent = 'Invalid input. No solution.';
        return; // Stop execution if there is a validation error
    }

    // Attempt to solve the board
    if (solve(board)) {
        // If solved, update the input fields
        document.getElementById('status').textContent = 'Sudoku solved!';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                document.getElementById(`cell-${i}-${j}`).value = board[i][j];
            }
        }
    } else {
        document.getElementById('status').textContent = 'No solution exists.';
    }
}
