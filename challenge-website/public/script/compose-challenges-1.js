import { TestCase } from './test-case-library.js'

let testApiReachability = async function () {
    let http = await fetch('http://localhost:3000/compose-api-test-http', { cache: "no-store" })
        .then( resp => { return resp.json(); })
        .catch(() => { return {success: false}});
    let https = await fetch('http://localhost:3000/compose-api-test-https', { cache: "no-store" })
        .then( resp => { return resp.json(); })
        .catch(() => { return {success: false}});

    let tests = (http.tests || []).concat(https.tests || [])
    return {success: http['success'] && https['success'], tests: tests}
}

//test case declarations
testCases.push(new TestCase(1, 1, "API ist verfügbar", `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Willkommen, Agent!</p>
    <p>Hier startet Ihre erste Trainings-Mission. Wir beginnen mit einer Aufgabe zu <a
            href="https://docs.docker.com/compose/">docker-compose</a>.</p>
    <p>Sie arbeiten dabei auf einer Testinstanz unseres <strong>Agenten-Verwaltung-Systems</strong>. Es speichert und verwaltet unsere Agenten sowie deren Missionen in einer Datenbank und ermöglicht den Zugriff über eine REST-API.</p>
    <p>Damit ein sicherer Zugriff möglich ist, verwenden wir einen Reverse-Proxy zur Terminierung von SSL Verbindungen, der Aufrufe anschließend an unsere API weiterleitet.</p>
    <img src="images/access-flow-diagram.svg" alt="Zugriffsdiagram für unser Agentensystem" width="600px">
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>
        Ihre erste Aufgabe besteht darin, den Java API Server erreichbar zu machen. Stellen Sie dafür beim docker-compose File den richtigen Backend-Port für die API ein. Den Backend-Port finden Sie in der haproxy.cfg (/ha-proxy/haproxy.cfg). Machen Sie diesen von dem Port 80 von außen erreichbar. (<a target="_blank" href="https://www.haproxy.com/de/blog/the-four-essential-sections-of-an-haproxy-configuration/">HAProxy configuration essentials</a>)
    </p>

    <p>Zum Testen rufen Sie das folgende Kommando in der VM auf:</p>
    <p>
        <code>curl -L "http://localhost:80/missions"</code>
        <button onclick="copyToClipboard('curl -L &quot;http://localhost:80/missions&quot;')">
            <img src="../images/clipboard.svg"/ width="15" alt="Kopieren">
        </button>
    </p>
    <p>
        Der Aufruf sollte ein leeres Ergebnis enthalten.
    </p>
</div>
`, true, testApiReachability));

//initial render of tests
renderAll();
