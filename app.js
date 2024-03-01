// Selecting elements
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const clearButton = document.querySelector("#clear");
const exponentButton = document.querySelector("#exponent");
const moduloButton = document.querySelector("#modulo");
const squareRootButton = document.querySelector("#squareRoot");

// Variable to store the current expression
let expression = "";

// Adding event listener to the buttons container
buttons.addEventListener("click", (e)=>{
    const target = e.target;
           
    // Check if the clicked element is a button
    if(target.classList.contains('btn')){
        value = target.textContent;
    }
        // Check for special buttons
        if(value === "="){
            calculateresult();  // If "=" is pressed, calculate the result
        }
        else if (value === 'C'){
            clearDisplay(); // If "C" is pressed, clear the display and the current expression
        }
        else{
            expression += value; // Otherwise, add the button's value to the expression
            display.value += value;  // Update the display
        }
});

// Function to calculate the result of the expression
async function calculateresult(){
    try{
        const result = await evaluateExpression(expression);
        expression = result.toString();
        display.value = expression // Update the display with the result
    }
    catch(error){
        expression = "";  // Clear the expression in case of error
        display.value = "Error"; // Display "Error" on the screen
    }
}

// Function to evaluate the expression using eval
function evaluateExpression(expression){
    return new Promise((resolve,reject)=>{
        try{
            // Custom parsing to handle exponentiation, modulo, and square root
            const parsedExpression = expression.replace(/\^/g, "**").replace(/%/g, "%").replace(/√/g, "Math.sqrt");
            const result = eval(parsedExpression);
            resolve(result); // Resolve the promise with the result
        }
        catch(error){
            reject(error) // Reject the promise with the error
        }
    });
}

// Function to clear the display

function clearDisplay() {
    expression = ""; // Clear the current expression
    display.value = ""; // Clear the display
}


