const gameField = {
    "cell1": null,
    "cell2": null,
    "cell3": null,
    "cell4": null,
    "cell5": null,
    "cell6": null,
    "cell7": null,
    "cell8": null,
    "cell9": null,
}

let computerSymbol;
let playerSymbol;


function create(symbol) {
    let o = document.createElement("p");
    o.classList.add("x");
    o.innerText = symbol.toUpperCase();
    return o;
}



function computerTurn() {
    while (true) {
        let randomCellId = "cell" + (Math.floor(Math.random() * 9) + 1);
        if (gameField[randomCellId] == null) {
            let cell = document.getElementById(randomCellId);
            cell.append(create(computerSymbol));
            gameField[randomCellId] = computerSymbol;
            console.log(gameField);
            break;
        }
    }
}


function hasFreeField() {
    const values = Object.values(gameField);
    for (let i = 0; i < values.length; i++) {
        if (values[i] == null) {
            return true;
        }
    }
    // document.body.append("Game over!")
    return false;
}

function computerStartFirst() {
    return Math.random() < 0.5;
}

if (computerStartFirst()) {
    computerSymbol = "x";
    playerSymbol = "o";
    computerTurn();
} else {
    computerSymbol = "o";
    playerSymbol = "x";
}

function createCell(id) {
    let cell = document.getElementById(id);
    cell.addEventListener("click", () => {
        if (gameField[id] == null && !gameOver()) {
            gamersTurn(cell, id);
            if (gameOver()) {
                document.body.append("Game over. Player won!");
                return;
            };
            if (hasFreeField()) {
                computerTurn();
                if (gameOver()) {
                    document.body.append("Game over. Computer won!");
                }
            } else {
                document.body.append("Game over!");
            }
        } 
    });

}

createCell("cell1");
createCell("cell2");
createCell("cell3");
createCell("cell4");
createCell("cell5");
createCell("cell6");
createCell("cell7");
createCell("cell8");
createCell("cell9");

function gamersTurn(cell, id) {
    cell.append(create(playerSymbol));
    gameField[id] = playerSymbol;
}

function gameOver() {

    function threeInARow(symbol) {
        if (gameField["cell1"] == symbol && gameField["cell2"] == symbol && gameField["cell3"] == symbol) {
            return true;
        } else if (gameField["cell4"] == symbol && gameField["cell5"] == symbol && gameField["cell6"] == symbol) {
            return true;
        } else if (gameField["cell7"] == symbol && gameField["cell8"] == symbol && gameField["cell9"] == symbol) {
            return true;
        } else if (gameField["cell1"] == symbol && gameField["cell4"] == symbol && gameField["cell7"] == symbol) {
            return true;
        } else if (gameField["cell2"] == symbol && gameField["cell5"] == symbol && gameField["cell8"] == symbol) {
            return true;
        } else if (gameField["cell3"] == symbol && gameField["cell6"] == symbol && gameField["cell9"] == symbol) {
            return true;
        } else if (gameField["cell1"] == symbol && gameField["cell5"] == symbol && gameField["cell9"] == symbol) {
            return true;
        } else if (gameField["cell3"] == symbol && gameField["cell5"] == symbol && gameField["cell7"] == symbol) {
            return true;
        } else {
            return false;
        }
    }

    return threeInARow("x") || threeInARow("o");
}