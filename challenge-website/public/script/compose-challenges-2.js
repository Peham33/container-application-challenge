import { TestCase } from './test-case-library.js'

let testAutomaticHttpsUpgrade = function () {
    return fetch('http://localhost:3000/compose-https-upgrade-test', { cache: "no-store" })
        .then(resp => { return resp.json(); })
        .catch(() => { return { success: false } });
}

testCases.push(new TestCase(2, "Automatisches https-Upgrade",testAutomaticHttpsUpgrade));

renderAll();
