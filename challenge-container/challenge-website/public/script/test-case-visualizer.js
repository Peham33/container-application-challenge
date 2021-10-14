//container for the test cases
const testDiv = document.getElementById("test-cases");
//button runs all tests
const runTestsBtn = document.getElementById("run-tests");
runTestsBtn.addEventListener("click", runTests);

//async sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const errorCodes = new Map();
errorCodes.set(200, "running, but no redirect configured");
errorCodes.set(500, "Internal Server Error");
errorCodes.set(503, "Service Unavailable");
errorCodes.set(504, "API cannot reach Database");

//testing API reachability
let testCase1 = async function() {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/api-test', {cache: "no-store"}).then(response => response.status);
    } catch (e) {
        status = 503
    }

    //status 200 or 504 denotes working API container (504 = database error, but API runs)
    if (status == 200 || status == 504) {
        result.push(true);
    } else {
        result.push(false);
        result.push("Error Code: " + status + ": " + errorCodes.get(status));
    }
    return result;
}

//testing API<->Database connection
let testCase2 = async function() {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/api-test', {cache: "no-store"}).then(response => response.status);
    } catch (e) {
        status = 503
    }

    if (status == 200) {
        result.push(true);
    } else {
        result.push(false);
        result.push("Error Code: " + status + ": " + errorCodes.get(status));
    }
    return result;
}

//testing automatic https upgrade
let testCase3 = async function() {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/https-upgrade-test', {cache: "no-store"}).then(response => response.status);
    } catch (e) {
        status = 503
    }

    //301 (redirect) means working https upgrade
    if (status == 301) {
        result.push(true);
    } else {
        result.push(false);
        result.push("Error Code: " + status + ": " + errorCodes.get(status));
    }
    return result;
}


//class to represent individual test cases
class TestCase {
    constructor(id, name, desc, testFunction) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.testFunction = testFunction;
    }

    //save currently running intervals (allows early restarting of tests)
    intervals = [];

    render() {
        testDiv.innerHTML += `
        <div class="test-case-container">
            ${this.name}
            <div class="test-case-progress">
                <div id="test-case-${this.id}-bar" class="test-case-bar">0%</div>
            </div>
            <div id="test-case-${this.id}-error" class="error-msg hidden"></div>
        </div>
        `;
    }

    //resets the progress bar and error message
    reset() {
        //clear running intervals
        this.intervals.forEach(clearInterval);

        //get DOM elements
        let barDiv = document.getElementById(`test-case-${this.id}-bar`);
        let errorDiv = document.getElementById(`test-case-${this.id}-error`);
        //reset elements back to default
        barDiv.classList.remove("bar-success");
        barDiv.classList.remove("bar-failure");
        barDiv.innerHTML = "0%";
        barDiv.style.width = "0%";

        errorDiv.classList.add("hidden");
        errorDiv.innerHTML = "";
    }

    //executes testFunction and renders a progress bar
    async execute() {
        //reset progress bar
        this.reset();

        //get DOM elements
        let barDiv = document.getElementById(`test-case-${this.id}-bar`);
        let errorDiv = document.getElementById(`test-case-${this.id}-error`);

        //execute test function async
        let success = false;
        let interval = 200;

        let testResult = null;
        let testPromise = this.testFunction().then(result =>
            testResult = result
        )

        //wait 500ms for an answer
        await sleep(500);

        //console.log(testResult)
        //console.log(testPromise)
        //if there was an answer already, shorten the interval for the bar animation
        if (testResult != null) {
            success = testResult[0];
            interval = 10;
        }

        //render bar animation
        let id = setInterval(frame, interval);
        this.intervals.push(id);
        let width = 0;
        function frame() {
            
            if (testResult != null) {
                success = testResult[0];
                interval = 10;
                clearInterval(id);
                id = setInterval(frame, 10);
            }


            if (width >= 100) {
                clearInterval(id);
                
                //console.log(testResult);
                success = testResult[0];

                if (success) {
                    barDiv.innerHTML = "Success!";
                    barDiv.classList.add("bar-success");       
                }
                else {
                    //on failure, print error msg included in function's returned array
                    barDiv.innerHTML = "Failure!"
                    barDiv.classList.add("bar-failure");
                    errorDiv.classList.remove("hidden");
                    errorDiv.innerHTML = testResult[1];
                }
            } else {
                width++;
                barDiv.style.width = width + "%";
                barDiv.innerHTML = width + "%";
            }
        }
    }
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