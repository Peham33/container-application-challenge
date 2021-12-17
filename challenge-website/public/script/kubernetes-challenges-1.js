import { TestCase } from './test-case-library.js'

let apiTest = function () {
    return fetch('http://localhost:3000/api-test', { cache: "no-store" })
        .then(resp => { return resp.json(); })
        .catch(() => { return { success: false } });

}

let securityTest = async function () {
    return fetch('http://localhost:3000/security-test', { cache: "no-store" })
        .then(resp => { return resp.json(); })
        .catch(() => { return { success: false } });
}

//test case declarations
testCases.push(new TestCase(1, 1, "API ist wieder konfiguriert", "", true, apiTest));
testCases.push(new TestCase(1, 2, "Datenbank-Credentials werden als K8s Secrets gespeichert",
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
<p>Bei dem Versuch die API zu erreichen, wird immer ein 503 Error <i>Service Temporarily unavailable</i> geliefert.</p>
<p>Um den Fehler zu beheben, müssen Sie ein API Service in der api.service.yaml Datei konfigurieren, welches über den Port 8080 erreichbar ist. (<a target="_blank" href="https://kubernetes.io/docs/concepts/services-networking/service/">Kubernetes Services</a>)</p>
<p>Der Doppelagent hat außerdem Sicherheitslücken in unseren Konfigurationen hinterlassen. Um unser System sicherer zu machen, sollten Sie unsere Applikation mit Datenbank-Credentials erweitern. (<a target="_blank" href="https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/">Kubernetes secure credentials</a>)</p>
</div>
`, true, securityTest))

//initial render of tests
renderAll();
