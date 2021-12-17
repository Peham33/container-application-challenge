import { TestCase } from './test-case-library.js'

testCases.push(new TestCase(2, 3, "Kubernetes Ingress ist erreichbar und konfiguriert",
    `

`, true, async () =>
    fetch('http://localhost:3000/ingress-validation')
        .then(resp => resp.json())
        .catch(_ => ({ success: false }))
))

//initial render of tests
renderAll();
