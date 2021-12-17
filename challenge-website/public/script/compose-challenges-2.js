import { TestCase } from './test-case-library.js'

let testAutomaticHttpsUpgrade = function () {
    return fetch('http://localhost:3000/compose-https-upgrade-test', { cache: "no-store" })
        .then(resp => { return resp.json(); })
        .catch(() => { return { success: false } });
}

testCases.push(new TestCase(2, 2, "Automatisches https-Upgrade", `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Sehr gut, Agent. Die erste Hürde haben Sie gemeistert.</p>
    <p>Sie verstehen sicherlich, dass Sicherheit für unsere Agenten unsere höchste Priorität hat. Stellen Sie daher sicher, dass jede Kommunikation verschlüsselt stattfindet, auch wenn sie versehentlich unverschlüsselt begonnen wird.</p>
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>Implementieren Sie einen http auf https Redirect für den HAProxy auf den Port 443. Der Redirect sollte den http-Code 301 zurückgeben. Passen Sie dafür die HAProxy Konfigurationen an (/ha-proxy/haproxy.cfg).</p>

    <p>Zum Testen rufen Sie wieder das folgende Kommando in der VM auf:</p>
    <p>
        <code>curl -v "http://localhost:80/missions"</code>
        <button onclick="copyToClipboard('curl -v &quot;http://localhost:80/missions&quot;')">
            <img src="../images/clipboard.svg"/ width="15" alt="Kopieren">
        </button>
    </p>

    <p>Es sollte ein 301 Moved Permanently zurückgegeben werden. (<a target="_blank" href="https://www.haproxy.com/de/blog/redirect-http-to-https-with-haproxy/" >Redirect http to https with HAProxy</a>) </p>
</div>
`, true, testAutomaticHttpsUpgrade));

renderAll();
