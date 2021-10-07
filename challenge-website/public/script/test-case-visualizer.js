//container for the test cases
const testDiv = document.getElementById("test-cases");
//button runs all tests
const runTestsBtn = document.getElementById("run-tests");
runTestsBtn.addEventListener("click", runTests);

//async sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let testCase1 = async function() {
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
        result.push("Error Code: " + status);
    }
    return result;
}

let testCase2 = async function() {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/https-upgrade-test', {cache: "no-store"}).then(response => response.status);
    } catch (e) {
        status = 503
    }

    if (status == 301) {
        result.push(true);
    } else {
        result.push(false);
        result.push("Error Code: " + status);
    }
    return result;
}

let testCase3 = function() {
    let result = [];
    //test (http request, whatever)


    result.push(true);
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
        let interval = 50;

        let testResult = null;
        let testPromise = this.testFunction().then(result =>
            testResult = result
        )

        //wait 500ms for an answer
        await sleep(500);

        console.log(testResult)
        console.log(testPromise)
        //if there was an answer already, shorten the interval for the bar animation
        if (testResult != null) {
            success = testResult[0];
            interval = 10;
        }

        //render bar animation
        let id = setInterval(frame, interval);
        let width = 0;
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                
                console.log(testResult);
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
testCases.push(new TestCase(2, "Test Case 2: https Upgrade", "Tests if automatic https upgrade is configured", testCase2));
//testCases.push(new TestCase(3, "Test Case 3: API Insert into database", "Tests if the API can be used to insert values into the database", testCase3));

//initial render of tests
testCases.forEach(element => element.render());

//execute all tests
function runTests() {
    testCases.forEach(element => element.execute());
}