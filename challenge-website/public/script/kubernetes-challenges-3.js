import { TestCase } from './test-case-library.js'

testCases.push(new TestCase(3, 4, "Datenbank persistiert ihre Informationen",
    `

`, true, async () =>
    fetch('http://localhost:3000/validate-kubernetes-database')
        .then(resp => resp.json())
        .catch(_ => ({ success: false }))
));

//initial render of tests
renderAll();
