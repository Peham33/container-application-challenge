import { TestCase } from './test-case-library.js'
import { statusCodes } from './test-case-library.js';

//button runs all tests
const runTestsBtn = document.getElementById("run-tests");
runTestsBtn.addEventListener("click", runTests);

//basic bash test returning given response
let basicBashTest = async function() {
    //data structures for passing result to the display function
    let result = [];
    let status = null;
    let resp = null;

    //perform the GET-request
    try {
        resp = await fetch('http://localhost:3000/basic-bash-test', {cache: "no-store"});
        status = resp.status;
    } catch (e) {
        status = 503;
    }

    //read json from result
    const resultMsg = await resp.json();

    //depending on returned status, make bars green (true) or red (false) and push a status message
    if (status == 200) {
        result.push(true); //green
        result.push("Current User: " + resultMsg);
    } else {
        result.push(false); //red
        result.push("Code: " + status + ": " + statusCodes.get(status) + ": " + resultMsg);
    }
    
    
    return result;
}


//test case declarations
let testCases = [];
testCases.push(new TestCase(1, "Basic Bash Test - returning result of bash command", "", basicBashTest));

//initial render of tests
testCases.forEach(element => element.render());

//execute all tests
function runTests() {
    testCases.forEach(element => element.execute());
}
