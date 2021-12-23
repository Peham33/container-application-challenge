const childProcess = require('child_process');

module.exports = function (app) {
    app.get('/api-test', function (req, res) {
        const body = getApiStatus();
        res.status(body.success ? 200 : 500);
        res.json(body);
    });

    app.get('/security-test', function (req, res) {
        const securityStatus = getSecurityStatus();
        res.status(securityStatus.success ? 200 : 500);
        res.json(securityStatus);
    });

    function getSecurityStatus() {
        const body = {
            success: false,
            tests: [
                { message: 'Das API Deployment verwendet Secrets für die Datenbankanmeldung.', success: false },
                { message: 'Das Datenbank Deployment verwendet Secrets.', success: false },
            ]
        };
        try {
            const secretName = kubectl('kubectl get deployment api -o=jsonpath="{.spec.template.spec.containers[*].envFrom[*].secretRef.name}"');
            const passwordCorrect = kubectlAssert('kubectl get secret ' + secretName + ' -o=jsonpath="{.data.DB_PASSWORD}"', 'Ym9uZA==');
            const usernameCorrect = kubectlAssert('kubectl get secret ' + secretName + ' -o=jsonpath="{.data.DB_USERNAME}"', 'amFtZXM=');
            body.tests[0].success = passwordCorrect && usernameCorrect;

            const dbUser = kubectlAssert('kubectl get deployment database -o=jsonpath="{.spec.template.spec.containers[*].env[?(@.name == \'POSTGRES_USER\')].valueFrom.secretKeyRef.name}"', secretName);
            const dbUserKey = kubectlAssert('kubectl get deployment database -o=jsonpath="{.spec.template.spec.containers[*].env[?(@.name == \'POSTGRES_USER\')].valueFrom.secretKeyRef.key}"', 'DB_USERNAME');
            const dbPassword = kubectlAssert('kubectl get deployment database -o=jsonpath="{.spec.template.spec.containers[*].env[?(@.name == \'POSTGRES_PASSWORD\')].valueFrom.secretKeyRef.name}"', secretName);
            const dbPasswordKey = kubectlAssert('kubectl get deployment database -o=jsonpath="{.spec.template.spec.containers[*].env[?(@.name == \'POSTGRES_PASSWORD\')].valueFrom.secretKeyRef.key}"', 'DB_PASSWORD');

            body.tests[1].success = dbUser && dbUserKey && dbPassword && dbPasswordKey;

        } catch (e) {
            console.log(e);
        }
        body.success = body.tests.every(x => x.success);
        return body;
    }

    function getApiStatus() {
        const body = {
            success: false,
            tests: [
                { message: 'Ein Service mit dem Namen \'api\' wurde erstellt.', success: false },
                { message: 'Die Ports wurden korrekt konfiguriert.', success: false }
            ]
        };
        try {
            body.tests[0].success = kubectlAssert('kubectl get service api -o=jsonpath="{.spec.selector.app\\.kubernetes\\.io/name}"', 'api');
            const configuredPort = kubectl('kubectl get service api -o=jsonpath="{.spec.ports[*].port}"');
            const ingressPort = tryGetIngressPort();
            body.tests[1].success = portsCorrect(configuredPort, ingressPort);
        } catch (e) {
            console.log(e);
        }
        body.success = body.tests.every(x => x.success);
        return body;
    }

    function kubectlAssert(kubectlQuery, expectedValue) {
        return kubectl(kubectlQuery) === expectedValue;
    }

    function kubectl(kubectl) {
        return childProcess.execSync(kubectl, {
            encoding: 'utf8',
            cwd: '/vagrant',
        });
    }

    function tryGetIngressPort() {
        let port = kubectl('kubectl get ingress -o=jsonpath="{.items[*].spec.rules[0].http.paths[*].backend.service.port.number}"');
        if (!port)
            port = kubectl('kubectl get ingress -o=jsonpath="{.items[*].spec.defaultBackend.service.port.number}"');

        return port ? port : undefined;
    }

    function portsCorrect(configuredPort, ingressPort) {
        // Some port must be configured
        if (!configuredPort)
            return false;
        // If some port is configured and no ingress port is specified yet
        else if (!ingressPort)
            return true;
        // If ports are configured in ingress and in api service, they must match
        else if (configuredPort === ingressPort)
            return true;
    }
}

