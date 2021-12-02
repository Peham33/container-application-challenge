import { TestCase } from './test-case-library.js'
import { statusCodes } from './test-case-library.js';
import { changePage } from './test-case-library.js';
import { getActivePage } from './test-case-library.js';
import { resetPage } from './test-case-library.js';

const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);
//set manually to highest page count
let maxPage = 3;

//update button availability
function updateButtons() {
    if (getActivePage() <= 1) {
        prevBtn.setAttribute("disabled", true);
    } else {
        prevBtn.removeAttribute("disabled");
    }

    if (getActivePage() >= maxPage) {
        nextBtn.setAttribute("disabled", true);
    } else {
        nextBtn.removeAttribute("disabled");
    }
}

function prevPage() {
    if (getActivePage() > 1) {
        changePage(-1);
        resetPage();
        updateButtons();
        renderAll();
    }
}

function nextPage() {
    if (getActivePage() < maxPage) {
        changePage(+1);
        resetPage();
        updateButtons();
        renderAll();
    }
}

function renderAll() {
    for (let testCase of testCases) {
        testCase.render()
    }
}

//execute all tests
async function runTests() {
    for (let testCase of testCases) {
        await testCase.execute();
    }
}

//button runs all tests
const runTestsBtn = document.getElementById("run-tests");
runTestsBtn.addEventListener("click", runTests);

//testing API reachability
let testCase1 = async function () {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/compose-api-test', { cache: "no-store" }).then(response => response.status);
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
let testCase2 = async function () {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/compose-api-test', { cache: "no-store" }).then(response => response.status);
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
let testCase3 = async function () {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/compose-https-upgrade-test', { cache: "no-store" }).then(response => response.status);
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
testCases.push(new TestCase(1, 1, "Test Case 1: API running", "<p>Willkommen zu Ihrer ersten Mission, starten wir mit einem kleinen Training im docker-compose File:</p><p>Ihre erste Aufgabe besteht darin, den Java API Server erreichbar zu machen, stellen Sie dafür beim docker-compose File den richtigen Backend Port für die API ein, diesen finden Sie in der haproxy.cfg (ha-proxy/haproxy.cfg) und machen Sie diesen von dem Port 80 von außen erreichbar. (<a href=\"https://www.haproxy.com/de/blog/the-four-essential-sections-of-an-haproxy-configuration/\">Link zur Dokumentation</a>)</p><p>Zum Testen rufen sie localhost/missions mit einem Browser auf. Der Aufruf sollte ein leeres Ergebnis enthalten.</p>", false, testCase1));
testCases.push(new TestCase(2, 2, "Test Case 2: API <-> Database connection", "", false, testCase2));
testCases.push(new TestCase(3, 3, "Test Case 3: https Upgrade", "", false, testCase3));

//initial render of tests
renderAll();

