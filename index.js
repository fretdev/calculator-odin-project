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
    const secondNumber =Number(calculatorState.secondInput)
    if(secondNumber === 0){
        calculatorState.result = "Error"
    }else{
        calculatorState.result  = Number(calculatorState.firstInput) / Number(calculatorState.secondInput)

    }  
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