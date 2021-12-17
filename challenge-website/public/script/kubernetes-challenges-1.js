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

`, true, securityTest))

//initial render of tests
renderAll();
