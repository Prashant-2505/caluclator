const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');
const clearButton = document.querySelector('.clear-btn');

let currentInput = '';
let currentOperator = null;
let result = 0;

// Function to perform mathematical operations
function performOperation(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
}

// Add event listeners to the calculator buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === '=') {
            if (currentOperator && currentInput !== '') {
                result = performOperation(result, parseFloat(currentInput), currentOperator);
                display.value = result;
                currentInput = '';
                currentOperator = null;
            }
        } 
        
        else if (buttonText === 'clear') {
            display.value = '';
            currentInput = '';
            currentOperator = null;
            result = null;
        }
        
        else if (['+', '-', 'x', '/'].includes(buttonText)) {
            if (result === null && currentInput !== '') {
                result = parseFloat(currentInput);
                currentInput = '';
            } else if (result !== null && currentInput !== '') {
                result = performOperation(result, parseFloat(currentInput), currentOperator);
                display.value = result;
                currentInput = '';
            }
            currentOperator = buttonText;
            display.value += buttonText;
        }
        
        else {
            currentInput += buttonText;
            display.value += buttonText;
        }
    });
});

clearButton.addEventListener('click', () => {
    display.value = '';
    currentInput = '';
    currentOperator = null;
    result = null;
});
