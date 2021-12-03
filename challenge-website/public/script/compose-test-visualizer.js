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
//set manually to highest page count
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

let testApiReachability = async function () {
    let result = [];
    let status = null;

    try {
        status = await fetch('http://localhost:3000/compose-api-test', { cache: "no-store" }).then(response => response.status);
    } catch (e) {
        status = 503
    }

    result['tests'] = [];

    //status 200 or 504 denotes working API container (504 = database error, but API runs)
    if (status == 200 || status == 504) {
        result['success'] = true;
        result['tests'].push({"test": "Tests if API is reachable on port 80", "success": true});
        result['tests'].push({"test": "This test is always true", "success": true});
    } else {
        result['success'] = false;
        result['tests'].push({"test": "Tests if API is reachable on port 80", "success": false});
        result['tests'].push({"test": "This test is always true", "success": true});
    }
    return result;
}

let testApiToDatabaseConnection = async function () {
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

let testAutomaticHttpsUpgrade = async function () {
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
testCases.push(new TestCase(1, 1, "API ist verfügbar", `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Willkommen, Agent!</p>
    <p>Hier startet Ihre erste Trainings-Mission. Wir beginnen wir mit einer Aufgabe zu <a
            href="https://docs.docker.com/compose/">docker-compose</a>.</p>
    <p>Sie arbeiten dabei auf einer Testinstanz unseres <strong>Agenten-Verwaltung-Systems</strong>. Es speichert und verwaltet unsere Agenten sowie deren Missionen in einer Datenbank und ermöglicht den Zugriff über eine REST-API.</p>
    <p>Damit ein sicherer Zugriff möglich ist, verwenden wir einen Reverse-Proxy zur Terminierung von SSL Verbindungen, der Aufrufe anschließend an unsere API weiterleitet.</p>
    <img src="images/access-flow-diagram.svg" alt="Zugriffsdiagram für unser Agentensystem" width="600px">
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>
        Ihre erste Aufgabe besteht darin, den Java API Server erreichbar zu machen. Stellen Sie dafür beim docker-compose File den richtigen Backend-Port für die API ein. Sie finden diesen in der haproxy.cfg (/ha-proxy/haproxy.cfg) und machen Sie diesen von dem Port 80 von außen erreichbar. (<a target="_blank" href="https://www.haproxy.com/de/blog/the-four-essential-sections-of-an-haproxy-configuration/">HAProxy configuration essentials</a>)
    </p>

    <p>Zum Testen rufen sie <code>curl -L "http://localhost:80/missions"</code> auf. Der Aufruf sollte ein leeres Ergebnis enthalten.
    </p>
</div>
`, false, testApiReachability));
testCases.push(new TestCase(2, 2, "Automatisches HTTPS Upgrade", `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Sehr gut, Agent. Die erste Hürde haben Sie gemeistert.</p>
    <p>Sie verstehen sicherlich, dass Sicherheit für unsere Agenten unsere höchste Priorität hat. Stellen Sie daher sicher, dass jede Kommunikation verschlüsselt stattfindet, auch wenn sie versehentlich unverschlüsselt begonnen wird.</p>
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>Implementieren Sie einen http auf https redirect für den HAProxy auf dem port 443. Passen Sie dafür die HAProxy Konfigurationen an (/ha-proxy/haproxy.cfg).</p>

    <p>Zum Testen rufen Sie <code>curl -L "http://localhost:80/missions"</code> in der VM auf. Sie sollten automatisch auf eine https Verbindung umgeleitet werden. (<a target="_blank" href="https://www.haproxy.com/de/blog/redirect-http-to-https-with-haproxy/" >Redirect http to https with HAProxy</a>) </p>
</div>
`, false, testAutomaticHttpsUpgrade));
testCases.push(new TestCase(3, 3, "Datenbankverbindung klappt und liefert Daten", `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Nun, da Sie eine sichere Verbindung garantiert haben, können wir endlich Daten über unsere Agenten und Missionen ausliefern.</p>
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>Als letzte Trainingseinheit sollen Sie Daten auf dem Server anzeigen lassen. Verwenden sie dafür die im Pfad <strong>/db/postgres/initdb</strong> vorhandenen SQL-Scripts.</p>
    <p>Die Testdaten sollen automatisch eingespielt werden, wenn die Datenbank das erste Mal gestartet wird. (<a target="_blank" href="https://onexlab-io.medium.com/docker-compose-postgres-initdb-ba0021deef76">Docker compose Postgres initdb</a>)</p>
    <p>Zum Testen rufen Sie abermals <code>curl -L "http://localhost:80/missions" | jq</code> auf. Nun sollten Sie die Missionsdaten der Datenbank angezeigt bekommen.</p>
</div>
`, false, testApiToDatabaseConnection));
testCases.push(new TestCase(4,4, "Erfolg", `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Ausgezeichnet!</p>
    <p>Sie haben die Einführung gemeistert und sind bereit unser Produktivsystem zu konfigurieren.</p>
    <p>Begeben Sie sich nun zum <a href="kubernetes-challenges.html">Kubernetes-System</a>.</p>
</div>
`, false, () => Promise.resolve([true, ''])))

//initial render of tests
renderAll();

