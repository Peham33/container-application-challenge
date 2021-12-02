import { TestCase } from './test-case-library.js'
import { statusCodes } from './test-case-library.js';
import { changePage } from './test-case-library.js';
import { getActivePage } from './test-case-library.js';
import { resetPage } from './test-case-library.js';

const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);

let testCases = [];
let maxPage = () => Math.max(...testCases.map(testCase => testCase.page));

//update button availability
function updateButtons() {
    if (getActivePage() <= 1) {
        prevBtn.setAttribute("disabled", true);
    } else {
        prevBtn.removeAttribute("disabled");
    }

    if (getActivePage() >= maxPage()) {
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
    if (getActivePage() < maxPage()) {
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

let apiTest = async function () {
    //data structures for passing result to the display function
    let result = [];
    let status = null;
    let resp = null;

    //perform the GET-request
    try {
        resp = await fetch('http://localhost:3000/api-test', { cache: "no-store" });
        status = resp.status;
    } catch (e) {
        status = 503;
    }

    const resultMsg = (await resp.json()).message;

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

let securityTest = async function () {
    //data structures for passing result to the display function
    let result = [];
    let status = null;
    let resp = null;

    //perform the GET-request
    try {
        resp = await fetch('http://localhost:3000/security-test', { cache: "no-store" });
        status = resp.status;
    } catch (e) {
        status = 503;
    }

    //read json from result
    const resultMsg = (await resp.json()).message;

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
testCases.push(new TestCase(1, 1, "API Test", "", true, apiTest));
testCases.push(new TestCase(1, 2, "Security Test - test if secret is correctly configured",
`
<p>Nicht nur der Ingress konnte nicht mehr erreicht werden, sondern auch die API wurde in Mitleidenschaft gezogen.</p>
<p>Bei dem Versuch die Schnittstelle zu erreichen wird immer ein 503 Error Service Temporarily unavailable geliefert.</p>
<p>Um den Fehler zu beheben müssen Sie einen API Service erstellen, welcher über den Port 8080 erreichbar ist. <a href="https://kubernetes.io/docs/concepts/services-networking/service/">Link zur Dokumentation</a></p>
<p>Der Doppelagent hat außerdem Sicherheitslücken in unseren Konfigurationen hinterlassen. Um unser System sicherer zu machen, sollten Sie unsere Applikation 
mit Datenbank credentials erweitern. <a href="https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/">Link zur Dokumentation</a></p>
`, true, securityTest))
testCases.push(new TestCase(2, 3, "Kubernetes ingress",
`
<p>Jeder Versuch sich mit dem Ingress zu verbinden scheitert, konfigurieren Sie die ingress.yaml Datei so, dass es wieder möglich ist sich mit dem Host challenge.test über den API Service den Sie zuvor konfiguriert haben zu verbinden.
<a href="https://kubernetes.io/docs/concepts/services-networking/ingress/">Link zur Dokumentation</a></p>
<p>Außerdem soll ein https Upgrade durchgeführt werden. <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-side-https-enforcement-through-redirect">Link zur Dokumentation</a></p>
`, true, async () =>
    fetch('http://localhost:3000/ingress-validation')
        .then(response => {
            if (response.status != 200)
                return [false, "Something is wrong with the configured ingress."]

            return [true, "Ingress up and running."];
        })
        .catch(reason => [false, reason])
))
testCases.push(new TestCase(3, 4, "Kubernetes database",
`
<p>Ausgezeichnet! Unsere Applikation funktioniert wieder und unsere Agenten können Ihre Informationen wieder sicher und verlässlich teilen.</p>
<p>Allerdings gibt es noch ein Problem: Mehrere Nutzer haben berichtet, dass Ihre Daten nach einem Wartungsfenster verschwunden sind. Sorgen Sie dafür,
dass bei einem Neustart der Datenbank keine Daten mehr verloren gehen! Ergänzen Sie dazu das Datenbank Deployment um einen Volume Claim.
<a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/">Link zur Dokumentation</a></p>
`, true, async () =>
    fetch('http://localhost:3000/validate-kubernetes-database')
        .then(response => {
            if (response.status != 200)
                return [false, "Database does not work as expected."]

            return [true, "Database persists Agents during a restart!"];
        })
        .catch(reason => [false, reason])
));

//initial render of tests
renderAll();
