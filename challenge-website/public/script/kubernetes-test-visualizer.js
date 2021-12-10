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
    disableTestButton();
    for (let testCase of testCases) {
        await testCase.execute();
    }
    enableTestButton();
}

function disableTestButton() {
    runTestsBtn.setAttribute("disabled", true);
}

function enableTestButton() {
    runTestsBtn.removeAttribute("disabled");
}

//button runs all tests
const runTestsBtn = document.getElementById("run-tests");
runTestsBtn.addEventListener("click", runTests);

let apiTest = async function () {
    return await fetch('http://localhost:3000/api-test', { cache: "no-store" })
        .then(async resp => { return await resp.json(); })
        .catch(() => { return { success: false } });

}

let securityTest = async function () {
    return await fetch('http://localhost:3000/security-test', { cache: "no-store" })
        .then(async resp => { return await resp.json(); })
        .catch(() => { return { success: false } });
}

//test case declarations
testCases.push(new TestCase(1, 1, "API ist wieder konfiguriert", "", true, apiTest));
testCases.push(new TestCase(2, 2, "Kubernetes Ingress ist erreichbar und konfiguriert",
    `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Sehr gut! Wie wir sehen haben Sie das Training erfolgreich abgeschlossen. Da Sie nun die Grundlagen beherrschen können wir uns sicher sein, dass Sie auch diese wichtige Mission für uns erfolgreich abschließen können.</p>
    <p>In letzter Zeit bestanden einige Differenzen zu einem anderen Geheimdienst. Dieser hat einen Doppelagenten bei uns eingeschleust, um an wichtige Informationen von unseren Missionen zu kommen. Um seine Spuren zu verwischen, hat er unsere Infrastruktur beschädigt.</p>
    <p>Den Doppelagenten konnten wir inzwischen ausfindig machen, die Schäden bestehen allerdings weiter. Nun liegt es an Ihnen die Infrastruktur so gut wie möglich wieder herzustellen, damit wir unsere Arbeiten wieder aufnehmen können. Bei diesen Aufgaben lassen wir Sie nicht alleine. Sie werden immer wieder Hinweise von uns bekommen.</p>
    <p>Viel Glück, wir zählen auf Sie!</p>
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>Jeder Versuch sich mit dem Ingress zu verbinden scheitert, konfigurieren Sie die ingress.yaml Datei so, dass es wieder möglich ist sich mit dem Host challenge.test über den API Service den Sie zuvor konfiguriert haben zu verbinden. (<a target="_blank" href="https://kubernetes.io/docs/concepts/services-networking/ingress/">Kubernetes Ingress</a>)</p>

    <p>Außerdem soll ein https Upgrade durchgeführt werden. (<a target="_blank" href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-side-https-enforcement-through-redirect">Nginx Ingress</a>)</p>
</div>
`, true, async () =>
    fetch('http://localhost:3000/ingress-validation')
        .then(async response => {
            let msg = await response.json();
            return msg;
        })
        .catch(_ => { success: false })
))
testCases.push(new TestCase(2, 3, "Datenbank-Credentials werden als K8s Secrets gespeichert",
    `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Scheinbar haben unsere Feinde ganze Arbeit geleistet. Die angerichteten Schäden sind doch schlimmer als befürchtet.</p>
    <p>Obwohl der Ingress Server wieder erreichbar ist, bleibt unser System unbenutzbar.</p>
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>Bei dem Versuch die API zu erreichen, wird immer ein 503 Error <i>Service Temporarily unavailable</i> geliefert.</p>
    <p>Um den Fehler zu beheben, müssen Sie ein API Service erstellen, welches über den Port 8080 erreichbar ist. (<a target="_blank" href="https://kubernetes.io/docs/concepts/services-networking/service/">Kubernetes Services</a>)</p>
    <p>Der Doppelagent hat außerdem Sicherheitslücken in unseren Konfigurationen hinterlassen. Um unser System sicherer zu machen, sollten Sie unsere Applikation mit Datenbank-Credentials erweitern. (<a target="_blank" href="https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/">Kubernetes secure credentials</a>)</p>
</div>
`, true, securityTest))

testCases.push(new TestCase(3, 4, "Datenbank persistiert ihre Informationen",
    `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Ausgezeichnet! Unsere Applikation funktioniert und unsere Agenten können Ihre Informationen wieder sicher und verlässlich teilen.</p>
    <p>Allerdings gibt es noch ein Problem: Mehrere Nutzer haben berichtet, dass Ihre Daten nach einem Wartungsfenster verschwunden sind!</p>
    <p>Bitte helfen Sie uns ein letztes Mal, Agent!</p>
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>Sorgen Sie dafür, dass bei einem Neustart der Datenbank keine Daten mehr verloren gehen!</p>
    <p>Ergänzen Sie dazu das Datenbank Deployment um einen Volume Claim. (<a target="_blank" href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/">Persistent Volumes</a>)</p>
</div>
`, true, async () =>
    fetch('http://localhost:3000/validate-kubernetes-database')
        .then(async response => {
            return await response.json();
        })
        .catch(_ => { success: false })
));

//initial render of tests
renderAll();
