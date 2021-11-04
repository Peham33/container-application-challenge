import { TestCase } from './test-case-library.js';
import { statusCodes } from './test-case-library.js';

//button runs all tests
const runTestsBtn = document.getElementById("run-tests");
runTestsBtn.addEventListener("click", runTests);

//testing API reachability
let testCase1 = async function() {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/compose-api-test', {cache: "no-store"}).then(response => response.status);
    } catch (e) {
        status = 503
    }

    //status 200 or 504 denotes working API container (504 = database error, but API runs)
    if (status == 200 || status == 504) {
        result.push(true);
    } else {
        result.push(false);
        result.push("Error Code: " + status + ": " + statusCodes.get(status));
    }
    return result;
}

//testing API<->Database connection
let testCase2 = async function() {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/compose-api-test', {cache: "no-store"}).then(response => response.status);
    } catch (e) {
        status = 503
    }

    if (status == 200) {
        result.push(true);
    } else {
        result.push(false);
        result.push("Error Code: " + status + ": " + statusCodes.get(status));
    }
    return result;
}

//testing automatic https upgrade
let testCase3 = async function() {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/compose-https-upgrade-test', {cache: "no-store"}).then(response => response.status);
    } catch (e) {
        status = 503
    }

    //301 (redirect) means working https upgrade
    if (status == 301) {
        result.push(true);
    } else {
        result.push(false);
        result.push("Error Code: " + status + ": " + statusCodes.get(status));
    }
    return result;
}

//test case declarations
let testCases = [];
testCases.push(new TestCase(1, "Test Case 1: API running", "Tests if API is reachable", testCase1));
testCases.push(new TestCase(2, "Test Case 2: API <-> Database connection", "Tests if the API can reach the database", testCase2));
testCases.push(new TestCase(3, "Test Case 3: https Upgrade", "Tests if automatic https upgrade is configured", testCase3));

//initial render of tests
testCases.forEach(element => element.render());

//execute all tests
function runTests() {
    testCases.forEach(element => element.execute());
}
