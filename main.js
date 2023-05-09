let numActual = '';
let numAnterior = '';
let operator = '';

const displayNumeroActual = document.querySelector('.numeroActual');
const displayNumeroAnterior = document.querySelector('.numeroAnterior');
displayNumeroActual.textContent = 0;

window.addEventListener('keydown', handleKeyPress)

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
    if(numActual != '' && numAnterior != ''){
        calculate();
    }
})

const borrar = document.querySelector('.borrar')
borrar.addEventListener('click', borrarU)

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', addDecimal)
const clear = document.querySelector('.clear');
clear.addEventListener('click', allClear)

const numberButtons = document.querySelectorAll('.number');

const operators = document.querySelectorAll('.operator');

numberButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
    })
})

function handleNumber(number){
    if(numAnterior !=='' && numActual !=='' && operator ===''){
        numAnterior = '';
        displayNumeroActual.textContent = numActual;
    }
    if(numActual.length <= 10){
        numActual += number;
        displayNumeroActual.textContent = numActual;
    }
}

operators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent)
    })
})

function handleOperator(op){
    if (numAnterior === ''){
        numAnterior = numActual;
        displayNumeroActual.textContent = '';
        operatorCheck(op);
    }else if(numActual === ''){
        displayNumeroActual.textContent = '';
        operatorCheck(op);
    }else {
        calculate();
        operator = op;
        displayNumeroActual.textContent = '';
        displayNumeroAnterior.textContent = numAnterior + ' ' + operator;
    }
}

function operatorCheck(text){
    operator = text;
    displayNumeroAnterior.textContent = numAnterior + ' ' + operator;
    numActual = '';
    displayNumeroActual.text = '0';    
}

function calculate(){
    numAnterior = Number(numAnterior);
    numActual = Number(numActual);

    if(operator === '+'){
        numAnterior += numActual
    }else if(operator === '-'){
        numAnterior -= numActual
    }else if(operator === 'x'){
        numAnterior *= numActual
    }else if(operator === '/'){
       if(numActual <= 0){
        numAnterior = 'Error';
        displayResults();
        return
       }
        numAnterior /= numActual
    }
    numAnterior = roundNumber(numAnterior)
    numAnterior = numAnterior.toString();
    displayResults();
    
    
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function displayResults() {
    displayNumeroAnterior.textContent = ''; 
    operator = '';
    if (numAnterior.length <= 10) {
        displayNumeroActual.textContent = numAnterior;
    }else {
        displayNumeroActual.textContent = numAnterior.slice(0, 10) + '...'
    }
    displayNumeroAnterior.textContent = '';
    operator = '';
    numActual = '';
}

function allClear(){
    displayNumeroActual.textContent = 0;
    displayNumeroAnterior.textContent = '';
    numActual= '';
    numAnterior = ''
}

function addDecimal(){
    if(!numActual.includes('.')){
        numActual += '.';
        displayNumeroActual.textContent = numActual
    }
}

function borrarU(){
    numActual = numActual.slice(0, numActual.length -1);
    displayNumeroActual.textContent = numActual;
}

function handleKeyPress(e) {
    e.preventDefault()
    if(e.key >= 0 && e.key <= 9){
        handleNumber(e.key);
    }
    if(e.key === 'Enter' || e.key === '=' && numActual != '' && numAnterior != ''){
        calculate();
    }
    if(e.key === '+' || e.key === '-' || e.key === '/' || e.key === 'x'){
        handleOperator(e.key)
    }
    if(e.key === '.'){
        addDecimal();
    }
}