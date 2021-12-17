import { TestCase } from './test-case-library.js'

let testApiToDatabaseConnection = function () {
    return fetch('http://localhost:3000/compose-db-test', { cache: "no-store" })
        .then(resp => { return resp.json(); })
        .catch(() => { return { success: false } });
}

testCases.push(new TestCase(3, "Datenbankverbindung klappt und liefert Daten", testApiToDatabaseConnection));

//initial render of tests
renderAll();
