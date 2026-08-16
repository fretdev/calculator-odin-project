const calculatorDisplay = document.querySelector('.display')
const inputDisplay = document.querySelector('.input')
const outputDisplay = document.querySelector('.output')
const calculatorButtons = document.querySelectorAll('.btn')
const clearButton = document.querySelector('.clear-btn')
const deleteButton = document.querySelector('.delete-btn')

const calculatorState = {
    firstInput: "",
    operator:"",
    secondInput:"",
    result:""
}

calculatorButtons.forEach((button)=>{
    button.addEventListener('click',(e)=>{
        const value = e.target.textContent
        if(!isNaN(value) || value == "."){
            handleNumber(value)
        }
        if(['+','-','*','/'].includes(value)){
            handleOperator(value)
        }
        if(value == '±'){
            handleSignToggle()
        }
        if(value == "="){
            handleEquals()
            handleResultOperation()
        }
        if(value == "%"){
            handlePercentage()
            handleResultOperation()
        }
        updateDisplay()
    })
})
document.addEventListener('keydown',(e)=>{
    let key = e.key
    if((key >= '0' && key <= '9') || key === '.'){
        handleNumber(key)
    }
    else if(['+','-','*','/'].includes(key)){
        handleOperator(key)
    }
    else if(key === 'Enter' || key === '='){
        e.preventDefault()
        handleEquals()
        handleResultOperation()
    }
    else if(key === 'Backspace'){
        backspace()
    }
    else if(key === 'Escape'){
        clearDisplay()
    }
    updateDisplay()
})

clearButton.addEventListener('click',clearDisplay)
deleteButton.addEventListener('click',backspace)


// Helper functions
function handleNumber(value){
    if(calculatorState.result !=="" && calculatorState.operator == ""){
        calculatorState.firstInput = ""
        calculatorState.result=""
    }
    if(calculatorState.operator == ""){
        if(value == "." && calculatorState.firstInput.includes("."))return
        calculatorState.firstInput +=value
    }
    else{
        if(value == "." && calculatorState.secondInput.includes("."))return
        calculatorState.secondInput += value
    }
}

function handleOperator(value){
    if(calculatorState.firstInput == ""){
        return
    }
    if(calculatorState.firstInput == calculatorState.result){
        calculatorState.operator = value
    }
    calculatorState.operator = value
}

function handleSignToggle(){
    let activeKey = calculatorState.operator =="" ? "firstInput" : "secondInput"
    if(calculatorState[activeKey] !== ""){
        calculatorState[activeKey] = (Number(calculatorState[activeKey]) * -1).toString()
    }
}
function handleEquals(){
    if(calculatorState.firstInput !== "" && calculatorState.operator !== "" && calculatorState.secondInput !== ""){
        calculatorState.result = operate(calculatorState.operator,calculatorState.firstInput,calculatorState.secondInput)
        calculatorState.result = roundResult(calculatorState.result)
    }
}

function handleResultOperation(){
    if(calculatorState.result){               
        outputDisplay.textContent=""
        updateDisplayForResultOperation()
    }
    if(calculatorState.result =="Error"){
        calculatorState.firstInput=""
    }
}

// Calculator logic
function operate(operator,a,b){
    const num1 = Number(a)
    const num2 = Number(b)

    switch(operator){
        case "+": return num1 + num2
        case "-": return num1 - num2
        case "*": return num1 * num2
        case "/": return num2 === 0 ? "Error" : num1 / num2
        default: return null
    }
}
function roundResult(num){
    if(num === "Error") return "Error"
    return Math.round(num * 100000000) / 100000000
}
function handlePercentage(){
    if(calculatorState.firstInput && calculatorState.operator && calculatorState.secondInput){
         switch(calculatorState.operator){
            case '+': calculatorState.result = Number(calculatorState.firstInput) + Number(calculatorState.firstInput) * Number(calculatorState.secondInput)/100
            break
            case '-': calculatorState.result = Number(calculatorState.firstInput) - Number(calculatorState.firstInput) * Number(calculatorState.secondInput)/100
            break
            case '*': calculatorState.result = Number(calculatorState.firstInput) * Number(calculatorState.secondInput)/100
            break
            case '/': calculatorState.result = Number(calculatorState.firstInput) / Number(calculatorState.secondInput)*100
            break
         }
    }
    else{
        calculatorState.result = Number(calculatorState.firstInput)/100
    }
    outputDisplay.textContent = calculatorState.result
}


// Calculator display logic
function updateDisplay(){
    let displayText = calculatorState.firstInput
    if(calculatorState.firstInput){
        displayText += " " + calculatorState.operator + " "
    }
    if(calculatorState.secondInput){
        displayText += calculatorState.secondInput
    }
    inputDisplay.textContent = displayText
    outputDisplay.textContent = calculatorState.result
    test()
}

function clearDisplay(){
    calculatorState.firstInput=""
    calculatorState.operator=""
    calculatorState.secondInput=""
    calculatorState.result=""
    inputDisplay.textContent=""
    outputDisplay.textContent=""
    
}
function updateDisplayForResultOperation(){
    calculatorState.firstInput=calculatorState.result
    calculatorState.operator=""
    calculatorState.secondInput=""
}

function backspace(){
    if(calculatorState.operator==""){
        calculatorState.firstInput = calculatorState.firstInput.toString().slice(0,-1)
    }
    else if(calculatorState.secondInput!=""){
        calculatorState.secondInput = calculatorState.secondInput.toString().slice(0,-1)
    }  
    else{
        calculatorState.operator =""
    }
    updateDisplay()
}


function test(){
    console.log("First-input: " + calculatorState.firstInput)
    console.log("operator: " + calculatorState.operator)
    console.log("second-input: " + calculatorState.secondInput)
    console.log("result: " + calculatorState.result)
}