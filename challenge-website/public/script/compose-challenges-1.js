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
testCases.push(new TestCase(1, 1, "API ist verfügbar", ``, true, testApiReachability));

//initial render of tests
renderAll();
