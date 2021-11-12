import { TestCase } from './test-case-library.js'
import { statusCodes } from './test-case-library.js';

//button runs all tests
const runTestsBtn = document.getElementById("run-tests");
runTestsBtn.addEventListener("click", runTests);

//basic bash test returning given response
let basicBashTest = async function () {
    //data structures for passing result to the display function
    let result = [];
    let status = null;
    let resp = null;

    //perform the GET-request
    try {
        resp = await fetch('http://localhost:3000/basic-bash-test', { cache: "no-store" });
        status = resp.status;
    } catch (e) {
        status = 503;
    }

    //read json from result
    const resultMsg = JSON.parse(await resp.json());

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

//basic bash test checking if a file exists
let fileExistsTest = async function () {
    //data structures for passing result to the display function
    let result = [];
    let status = null;
    let resp = null;

    //perform the GET-request
    try {
        resp = await fetch('http://localhost:3000/bash-test-if-file-exists', { cache: "no-store" });
        status = resp.status;
    } catch (e) {
        status = 503;
    }

    //read json from result
    const resultMsg = JSON.parse(await resp.json());

    //depending on returned status, make bars green (true) or red (false) and push a status message
    if (status == 200) {
        result.push(true); //green
        result.push(resultMsg);
    } else {
        result.push(false); //red
        result.push("Code: " + status + ": " + statusCodes.get(status) + ": " + resultMsg);
    }


    return result;
}


//test case declarations
let testCases = [];
testCases.push(new TestCase(1, "Basic Bash Test - returning result of bash command \"whoami\"", true, basicBashTest));
testCases.push(new TestCase(2, "Bash Test - checks if file \"/vagrant/testfile.txt\" exists", true, fileExistsTest));

//initial render of tests
testCases.forEach(element => element.render());

//execute all tests
async function runTests() {
    for (let testCase of testCases) {
        await testCase.execute();
    }
}
