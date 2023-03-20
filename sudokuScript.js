let sudoku1 = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],

    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],

    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];
let sudoku2 = [
    [9, 1, 4, 7, 8, 2, 3, 6, 5],
    [3, 8, 5, 4, 1, 6, 7, 9, 2],
    [7, 2, 6, 5, 9, 3, 4, 1, 8],

    [8, 9, 2, 6, 3, 7, 5, 4, 1],
    [4, 6, 3, 2, 5, 1, 8, 7, 9],
    [5, 7, 1, 9, 4, 8, 2, 3, 6],

    [1, 4, 8, 3, 2, 9, 6, 5, 7],
    [2, 5, 7, 1, 6, 4, 9, 8, 3],
    [6, 3, 9, 8, 7, 5, 1, 2, 4]
];
let sudoku3 = [
    [1, 5, 6, 3, 7, 2, 9, 4, 8],
    [3, 2, 4, 1, 9, 8, 5, 7, 6],
    [8, 7, 9, 4, 5, 6, 2, 1, 3],

    [4, 9, 8, 2, 6, 1, 3, 5, 7],
    [2, 3, 7, 9, 4, 5, 6, 8, 1],
    [6, 1, 5, 7, 8, 3, 4, 9, 2],

    [7, 6, 1, 5, 2, 9, 8, 3, 4],
    [5, 4, 2, 8, 3, 7, 1, 6, 9],
    [9, 8, 3, 6, 1, 4, 7, 2, 5]
];
function signInFunc() {
    let userFlag = false;
    let passFlag = false;
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let underUser = document.getElementById("underuser");
    let underPass = document.getElementById("underpassword");
    let signInDiv = document.getElementById('signInDiv');
    let dif = document.getElementById('difficulty');
    if (username.value == '') {
        underUser.innerHTML = "please type your username";
    }
    else if (username.value == "abcd") {
        userFlag = true;
        underUser.innerHTML = " "
    }
    else {
        underUser.innerHTML = "This username does not exist in the system";
    }

    if (password.value == '') {
        underPass.innerHTML = "Please enter your password "
    }
    else if (password.value == 1234) {
        passFlag = true;
        underPass.innerHTML = " "
    }
    else {
        underPass.innerHTML = "The password is incorrect, please try again";
    }

    if (userFlag == true && passFlag == true) {
        signInDiv.style.display = 'none';
        dif.style.display = 'block';
    }
}
function chooseBoard(num) {
    let choise = Math.ceil(Math.random() * 3);
    if (choise == 1) {
        createBoard(num, sudoku1);
    }
    else if (choise == 2) {
        createBoard(num, sudoku2);
    }
    else {
        createBoard(num, sudoku3);
    }
    let dif = document.getElementById('difficulty');
    dif.style.display = "none";
}
function createBoard(num, board) {
    //יצירת טבלה
    let boardDiv = document.getElementById('board');
    let table = document.createElement('table');
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement('tr');
        if (i % 3 == 2) {
            tr.classList.add('bottom');
        }
        for (let j = 0; j < 9; j++) {
            let td = document.createElement('td');
            td.id = `td${i}${j}`;
            let inp = document.createElement('input')
            inp.id = `inp${i}${j}`;
            inp.classList.add("tableInps");
            inp.setAttribute("type", "number");
            td.appendChild(inp);

            if ((i >= 0 && i <= 2 && j < 3 || i >= 0 && i <= 2 && j > 5) ||
                (i >= 3 && i <= 5 && j > 2 && j < 6) ||
                (i >= 6 && i <= 8 && j < 3 || i >= 6 && i <= 8 && j > 5)) {
                inp.classList.add('odd-section');
                td.classList.add('odd-section');

            }
            if (j % 3 == 2) {
                td.classList.add('right');
            }

            tr.appendChild(td)
        }
        table.appendChild(tr);

    }
    boardDiv.appendChild(table);

    //אנחנו מכניסים ערכים לטבלה
    let x, y;
    for (let i = 0; i < num; i++) {
        x = Math.floor(Math.random() * 9); //0
        y = Math.floor(Math.random() * 9); //8
        if (document.getElementById(`inp${x}${y}`).value == '') {
            document.getElementById(`inp${x}${y}`).value = board[x][y];
            document.getElementById(`inp${x}${y}`).disabled = true;
            // document.getElementById(`inp${x}${y}`).style.fontWeight = 'bolder';
            // document.getElementById(`inp${x}${y}`).style.color = 'black';
        }
        else {
            i--;
        }

    }

    let checkBut = document.createElement('button');
    checkBut.id = 'checkBut'
    checkBut.innerHTML = 'Check board';
    checkBut.addEventListener("click", isBoardValid);
    boardDiv.appendChild(checkBut);
    let againBut = document.createElement('button');
    againBut.id = 'againBut'
    againBut.addEventListener("click", reserBoard);
    againBut.innerHTML = 'Reset board';
    boardDiv.appendChild(againBut);

}
function reserBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (document.getElementById(`inp${i}${j}`).disabled == true) {
                continue
            }
            document.getElementById(`inp${i}${j}`).value = '';
        }
    }
}
function isBoardValid() {
    let filled = false;
    let neg = false;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (document.getElementById(`inp${i}${j}`).value == '') {
                filled = true;
            }
            if (document.getElementById(`inp${i}${j}`).value < 1) {
                neg = true;
            }
        }
    }
    if (filled == true) {
        alert('Not all cells are filled');
        return false;
    }
    else if (neg == true) {
        alert('Nagetive numbers are not allowed');
        return false;
    }
    let check = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row = [];
    for (let i = 0; i < 9; i++) {
        row = [];
        for (let j = 0; j < 9; j++) {
            row.push(document.getElementById(`inp${i}${j}`).value);
        }
        row.sort();
        for (let k = 0; k < 9; k++) {
            if (row[k] != check[k]) {
                alert('Try again');
                return false;
            }
        }
    }

    let column = [];
    for (let i = 0; i < 9; i++) {
        column = [];
        for (let j = 0; j < 9; j++) {
            column.push(document.getElementById(`inp${j}${i}`).value);
        }
        column.sort();
        for (let k = 0; k < 9; k++) {
            if (column[k] != check[k]) {
                alert('Try again');
                return false;
            }
        }
    }

    let box = [];
    for (let i = 0; i < 9; i++) {
        if (i % 3 == 0) {
            for (let j = 0; j < 9; j++) {
                box = [];
                if (j % 3 == 1) {
                    box.push(
                        document.getElementById(`inp${i}${j}`).value,
                        document.getElementById(`inp${i}${j - 1}`).value,
                        document.getElementById(`inp${i}${j + 1}`).value,
                        document.getElementById(`inp${i + 1}${j}`).value,
                        document.getElementById(`inp${i + 2}${j}`).value
                    );
                    if (!box.includes(document.getElementById(`inp${i + 1}${j - 1}`).value)) {
                        box.push(document.getElementById(`inp${i + 1}${j - 1}`).value);
                    }
                    else {
                        alert('Try again');
                        return false;
                    }

                    if (!box.includes(document.getElementById(`inp${i + 1}${j + 1}`).value)) {
                        box.push(document.getElementById(`inp${i + 1}${j + 1}`).value);
                    }
                    else {
                        alert('Try again');
                        return false;
                    }

                    if (!box.includes(document.getElementById(`inp${i + 2}${j - 1}`).value)) {
                        box.push(document.getElementById(`inp${i + 2}${j - 1}`).value);
                    }
                    else {
                        alert('Try again');
                        return false;
                    }

                    if (!box.includes(document.getElementById(`inp${i + 2}${j + 1}`).value)) {
                        box.push(document.getElementById(`inp${i + 2}${j + 1}`).value);
                    }
                    else {
                        alert('Try again');
                        return false;
                    }
                }
            }

        }
    }
    alert('Great job, you did it!');
}
let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

function watch() {
    seconds++
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }

    if (seconds < 10) {
        displaySeconds = `0${seconds}`
    }
    else {
        displaySeconds = seconds
    }

    if (minutes < 10) {
        displayMinutes = `0${minutes}`
    }
    else {
        displayMinutes = minutes
    }

    if (hours < 10) {
        displayHours = `0${hours}`
    }
    else {
        displayHours = hours
    }

    document.getElementById('watch').innerHTML = displayHours + ':' + displayMinutes + ':' + displaySeconds;
}
function startWatch() {
    let displayWatch = document.getElementById('watch');
    displayWatch.style.display = 'block';
    window.setInterval(watch, 1000);
}
