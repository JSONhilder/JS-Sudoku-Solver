// ASCII ART TITLE
var figlet = require('figlet');
console.log(figlet.textSync('SUDOKU SOLVER', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));

// Sudoku puzzle to solve as a nested array
var sudoku_puzzle = 
    [   [0, 0, 0, 0, 9, 4, 5, 0, 0],
        [0, 0, 1, 6, 2, 0, 0, 0, 0],
        [0, 4, 8, 3, 0, 0, 0, 0, 0],
        [0, 0, 7, 0, 0, 0, 0, 0, 9],
        [0, 5, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 2, 0, 0, 9, 0, 3, 0],
        [0, 8, 0, 0, 0, 0, 4, 7, 0],
        [0, 0, 0, 0, 0, 3, 8, 5, 0],
        [6, 0, 0, 0, 7, 0, 0, 0, 2]];

// ? Create a board with the above
var show_board = (puzzle) => {
    // ? TOP BORDER
    console.log('-'.repeat(33));

    for (var [index, value] of puzzle.entries()) {
        var rows = []
        for (var i = 0; i < value.length; i+=3) {
            // console.log(value[i]);      
            rows.push(" |" + ` ${value[i]} ${value[i + 1]} ${value[i + 2]} `+ "|");
        }
        console.log(...rows)
        if (index == 8) {
            // ? BOTTOM BORDER
            console.log('-'.repeat(33));
        } else if ( index % 3 === 2 ) {
            console.log('-'.repeat(33));
        }
    };
};

var find_empty = (puzzle) => {
    // Get each row
    for (var row = 0; row < puzzle.length; row ++ ) {
        // Get each value of row
        for ( var col = 0; col < puzzle[row].length; col++) {     
            // Check if value equals 0 := empty
            if (puzzle[row][col] === 0) {
                // Return row and the col
                return [row, col];
            };
        };
    };
};

var check = (puzzle, num, pos) => {
    // Only check the rows values
    for (var i = 0; i < puzzle[0].length; i++) {
        // Get the indexs of each rows columns 1 - 9
        if (puzzle[pos[0]][i] === num && puzzle[pos[1]] !== i)/*Ignores the position we just added*/ {
            return false;
        } 
    }

    // Only check the column values
    for ( var i = 0; i < puzzle.length; i++ ) {
        if(puzzle[i][pos[1]] === num && pos[0] != i) {
            return false;
        }
    }

    // check square 
    let box_x = Math.floor(pos[1] / 3);
    let box_y = Math.floor(pos[0] / 3); 

    for ( let i = box_y * 3; i < ((box_y*3)+3); i++) {
        for (let n = box_x * 3; n < ((box_x*3)+3); n++) {
            if (puzzle[i][n] === num && [i, n] != pos ) {
                return false;
            };

        };
    };

    return true
};

var solve = (puzzle) => {
    find = find_empty(puzzle);
    if (!find) {
        return true;
    } else {
        var row = find[0];
        var col = find[1];
    };

    for (var i = 1; i < 10; i++) {
        if (check(puzzle, i, [row, col])) {
            puzzle[row][col] = i;

            // RECURSION T-T
            if (solve(puzzle))
             return true;

            puzzle[row][col] = 0;
        };
    };
    return false;
};



show_board(sudoku_puzzle);
solve(sudoku_puzzle);
console.log("----------------------------------------------");
console.log("----------------------------------------------");
show_board(sudoku_puzzle);
console.log("PUZZLE SOLVED!");