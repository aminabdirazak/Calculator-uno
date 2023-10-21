/**
 * Required abilities of a calculator:
 * 1. Accept user inputs of number, operator, and another number.
 * 2. should accept decimal numbers
 * 3. Store inputs
 * 4. Recognize inputs and perform calculations
 * 5. Return a result
 * 
 * ____________________________________________
 * 
 * 
 * Optional features:
 * 1. Should accept longer arithmetic operations.
 * 2. display all inputs as it is being entered
 * 3. store the previous total as start of the next operation
 * 4. clear button should clear all entries
 * 5. should prevent invalid inputs (operators next to each other, two decimal points next to each other)
 */

const keys = document.querySelector('.calculator-buttons');
    keys.addEventListener('click', event =>{
        const {target} = event;
        const {value} = target;
        if(!target.matches('button')) {
            return;
        } else {
            //pass value to parse method
            calculator.parseInput(value)
            //console.log(target);
        }
})

const calculator = {
    displayText : '0',
    previousTotal : null,

    parseInput(value) {
        //have any of the "special buttons" been clicked?
        switch (value) {
            case '=': 
                //calculate the answer
                this.calcAnswer(this.displayText)
                this.previousTotal(this.displayText)
                break;
            case 'AC':
                //clear screen
                this.clearAll()
                break;
            case '.' :
                if(this.displayText == 0){
                    this.addText('0.')
                } else {
                    this.addText(value)
                }
                break;
            default:
                //add value to text string
                this.addText(value)
                break;
        }
     
    },

    addText(value) {
        if(this.displayText === '0') {
            this.displayText = ''
        } else if (this.previousTotal !== null){
            this.displayText = this.previousTotal
            this.previousTotal = null
        } 
        if (isNaN(+(value)) && isNaN(+(this.displayText))) {
            if(isNaN(this.displayText.slice(-1))) {
                return;
            }
        }
        this.displayText += value
        //output display text to screen
        this.outputText(this.displayText)

    },
    outputText(text) {
        document.querySelector('.calculator-screen').value = text
    },

    calcAnswer(equation) {
       let result = Function("return " + equation)()
       this.outputText(result)
    }, 

    clearAll(){
        this.displayText = '0',
        this.previousTotal = null,
        this.outputText(this.displayText)
    }
}
