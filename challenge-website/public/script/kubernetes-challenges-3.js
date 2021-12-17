import { TestCase } from './test-case-library.js'

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
        .then(resp => resp.json())
        .catch(_ => ({ success: false }))
));

//initial render of tests
renderAll();
