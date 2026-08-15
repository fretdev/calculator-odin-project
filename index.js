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
        if(['+','-','*','/','±'].includes(value)){
            handleOperator(value)
        }
        if(value == "="){
            handleEquals()
        }
        if(value == "%"){
            handlePercentage()
        }
        updateDisplay()
    })
})

clearButton.addEventListener('click',clearDisplay)


// Helper functions

function handleNumber(value){
    if(calculatorState.operator == ""){
        calculatorState.firstInput += value
    }
    else{
        calculatorState.secondInput += value
    }
}

function handleOperator(value){
    if(calculatorState.firstInput == ""){
        return
    }
    calculatorState.operator = value
}
  


function handleEquals(){
    switch(calculatorState.operator){
        case '+':addition()
        break
        case '-':subtraction()
        break
        case '*':multiplication()
        break
        case '/':division()
        break
    }
}

// Calculator logic
function addition(){
    calculatorState.result = Number(calculatorState.firstInput) + Number(calculatorState.secondInput)
}
function subtraction(){
    calculatorState.result = Number(calculatorState.firstInput) - Number(calculatorState.secondInput)
}
function multiplication(){
    calculatorState.result = Number(calculatorState.firstInput) * Number(calculatorState.secondInput)
}
function division(){
    calculatorState.result  = Number(calculatorState.firstInput) / Number(calculatorState.secondInput)
}
function handlePercentage(){
    calculatorState.result = Number(calculatorState.firstInput)/100
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



function test(){
    console.log("First-input: " + calculatorState.firstInput)
    console.log("operator: " + calculatorState.operator)
    console.log("second-input: " + calculatorState.secondInput)
    console.log("result: " + calculatorState.result)
}