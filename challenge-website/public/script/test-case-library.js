//declarations and classes used for test case visualizers

//container for the test cases
const testDiv = document.getElementById("test-cases");
const descriptionDiv = document.getElementById("description");

//async sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let activePage = 1;

export function changePage(change) {
    activePage += change;
}

export function getActivePage() {
    return activePage;
}

export function resetPage() {
    descriptionDiv.innerHTML = "";
    testDiv.innerHTML = "";
}

export const statusCodes = new Map();
statusCodes.set(200, "OK");
statusCodes.set(500, "Internal Server Error");
statusCodes.set(503, "Service Unavailable");
statusCodes.set(504, "Gateway Timeout");

//class to represent individual test cases
export class TestCase {
    constructor(page, id, name, description, waitForExecute, testFunction) {
        this.page = page;
        this.id = id;
        this.name = name;
        this.description = description;
        this.waitForExecute = waitForExecute;
        this.testFunction = testFunction;
    }

    //save running intervals, allows tests to get faster once completed
    intervals = [];

    isActive() {
        return this.page == activePage;
    }

    render() {
        if (!this.isActive()) return;

        descriptionDiv.innerHTML = this.description;
        testDiv.innerHTML += `
        <div class="test-case-container">
            ${this.name}
            <div class="test-case-progress">
                <div id="test-case-${this.id}-bar" class="test-case-bar">0%</div>
            </div>
            <div id="test-case-${this.id}-status" class="status-msg hidden"></div>
        </div>
        `;
    }

    //resets the progress bar and status message
    reset() {
        if (!this.isActive()) return;

        //clear running intervals
        this.intervals.forEach(clearInterval);

        //get DOM elements
        let barDiv = document.getElementById(`test-case-${this.id}-bar`);
        let statusDiv = document.getElementById(`test-case-${this.id}-status`);
        //reset elements back to default
        barDiv.classList.remove("bar-success");
        barDiv.classList.remove("bar-failure");
        barDiv.innerHTML = "0%";
        barDiv.style.width = "0%";

        statusDiv.classList.add("hidden");
        statusDiv.classList.remove("text-success");
        statusDiv.classList.remove("text-failure");
        statusDiv.innerHTML = "";
    }

    //executes testFunction and renders a progress bar
    async execute() {
        if (!this.isActive()) return;

        //reset progress bar
        this.reset();

        //get DOM elements
        let barDiv = document.getElementById(`test-case-${this.id}-bar`);
        let statusDiv = document.getElementById(`test-case-${this.id}-status`);

        //execute test function async
        let success = false;
        let interval = 200; //default interval for the frame function
        let fasterInterval = 10; //bar goes a lot faster once result is obtained

        let testResult = null;
        this.testFunction().then(result =>
            testResult = result
        )

        //render bar animation
        let id = setInterval(frame, interval);
        this.intervals.push(id);
        let width = 0;

        //synchronous execution - await the frame function (signfied by id variable)
        if (this.waitForExecute) {
            while (id != -1) {
                await sleep(50);
            }
        }

        function frame() {

            //checks if testResult has been obtained - speed up if yes
            if (testResult != null && interval != fasterInterval) {
                success = testResult['success'];
                clearInterval(id);
                interval = fasterInterval;
                id = setInterval(frame, fasterInterval);
            }


            //once width 100 is reached, bar has reached 100%
            if (width >= 100) {
                clearInterval(id);
                id = -1;

                if (testResult == null) {
                    success = false;
                } else {
                    success = testResult['success'];
                }

                //bar and status message change based on success/failure
                if (success) {
                    barDiv.innerHTML = "Success!";
                    barDiv.classList.add("bar-success");
                    statusDiv.classList.add("text-success");
                }
                else {
                    barDiv.innerHTML = "Failure!"
                    barDiv.classList.add("bar-failure");
                    statusDiv.classList.add("text-failure");
                }

                //display the status div if there is a message to display
                if (testResult != null && testResult['tests'] != null) {
                    statusDiv.innerHTML = "";
                    for (let test of testResult['tests']) {
                        statusDiv.innerHTML += `<div class="${test['success'] ? 'text-success' : 'text-failure'}">${test['success'] ? '&#x2713;' : '&#x2717;'} - ${test['message']}</div>`
                    }
                    statusDiv.classList.remove("hidden");
                }
            } else {
                //not done yet - update bar
                width++;
                barDiv.style.width = width + "%";
                barDiv.innerHTML = width + "%";
            }
        }
    }
}
