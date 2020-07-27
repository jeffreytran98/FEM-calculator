let runningTotal = 0;
let buffer = '0';
let previousOperator = null;
const screen = document.querySelector('.screen')

/*
Sets button_list to a list of all the buttons so that the program can iterate through each button
constantly and 'listens' if there will be a click. If there is a click it will trigger
buttonClick
*/ 
let button_list = document.querySelectorAll('.calc-button')
for (i = 0; i < button_list.length; i++) {
    button_list[i].addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}


function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    //This function just sets the current number on screen to the 'buffer' variable// 
    rerender(); 
}


function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    }
    else {
        buffer += value;
    }
}


function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = '0'
            runningTotal = 0;
            previousOperator = null
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            else {
            //Does all the maff//
            flushOperation(parseInt(buffer));
            previousOperator = null;
            //line below this changes it into a string for buffer which is what the user sees, and then resets runningTotal for next input//
            buffer = '' + runningTotal;
            runningTotal = 0;
            break;
            }
        case 'Back':
            if (buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        //If you didn't click clear, back, or =, you have clicked +-/x. You could have made a bunch of if/else on +-/x and each called on handleMath.
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    //intBuffer is to keep track of the last input value, so that you can do 'intBuffer +-/x ...'//
    const intBuffer = parseInt(buffer)
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } 
    else { 
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = '0';
}


//flushOperation is the math//
function flushOperation (intBuffer) {
    // can do this with a switch or if/else// 
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator ==='x') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '/') {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}