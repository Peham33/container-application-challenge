import { TestCase } from './test-case-library.js'

testCases.push(new TestCase(2, 3, "Kubernetes Ingress ist erreichbar und konfiguriert",
    `
<div class="story">
    <h2>Ihre Mission</h2>
    <p>Scheinbar haben unsere Feinde ganze Arbeit geleistet. Die angerichteten Schäden sind doch schlimmer als befürchtet.</p>
    <p>Konfigurieren Sie den Ingress Server so, dass dieser wieder erreichbar ist.</p>
</div>

<div class="instructions">
    <h2>Missionsziel</h2>
    <p>Jeder Versuch sich mit dem Ingress zu verbinden scheitert, konfigurieren Sie die ingress.yaml Datei so, dass es wieder möglich ist sich mit dem Host challenge.test über den API Service den Sie zuvor konfiguriert haben zu verbinden. (<a target="_blank" href="https://kubernetes.io/docs/concepts/services-networking/ingress/">Kubernetes Ingress</a>)</p>

    <p>Außerdem soll ein https Upgrade durchgeführt werden. (<a target="_blank" href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-side-https-enforcement-through-redirect">Nginx Ingress</a>)</p>
</div>
`, true, async () =>
    fetch('http://localhost:3000/ingress-validation')
        .then(resp => resp.json())
        .catch(_ => ({ success: false }))
))

//initial render of tests
renderAll();
