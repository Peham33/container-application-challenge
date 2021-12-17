import { TestCase } from './test-case-library.js'

let testApiToDatabaseConnection = function () {
    return fetch('http://localhost:3000/compose-db-test', { cache: "no-store" })
        .then(resp => { return resp.json(); })
        .catch(() => { return { success: false } });
}

testCases.push(new TestCase(3, 3, "Datenbankverbindung klappt und liefert Daten", `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Nun, da Sie eine sichere Verbindung garantiert haben, können wir endlich Daten über unsere Agenten und Missionen ausliefern.</p>
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>Als letzte Trainingseinheit sollen Sie Daten auf dem Server anzeigen lassen. Verwenden Sie dafür die im Pfad <strong>/vagrant/db/postgres/initdb</strong> vorhandenen SQL-Scripts.</p>
    <p>Die Testdaten sollen automatisch eingespielt werden, wenn die Datenbank das erste Mal gestartet wird. (<a target="_blank" href="https://onexlab-io.medium.com/docker-compose-postgres-initdb-ba0021deef76">Docker compose Postgres initdb</a>)</p>
    <p>Zum Testen rufen Sie abermals das folgende Kommando in der VM auf:</p>
    <p>
        <code>curl -L "http://localhost:80/missions"</code>
        <button onclick="copyToClipboard('curl -L &quot;http://localhost:80/missions&quot;')">
            <img src="../images/clipboard.svg"/ width="15" alt="Kopieren">
        </button>
    </p>
    <p>Nun sollten Sie die Missionsdaten der Datenbank angezeigt bekommen.</p>
</div>
`, true, testApiToDatabaseConnection));

//initial render of tests
renderAll();
