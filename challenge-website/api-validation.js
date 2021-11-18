const childProcess = require('child_process');

module.exports = function (app) {
    app.get('/api-test', function (req, res) {
        try {
            apiConfiguredCorrectly() ? res.status(200).json(JSON.stringify({ message: 'ok' })) : res.status(500).json(JSON.stringify({ message: 'Not ok' }));
        } catch (e) {
            res.status(500).json(JSON.stringify({ message: 'Error when executing command!' }))
        }
    });

    app.get('/security-test', function (req, res) {
        try {
            const secretName = kubectl('kubectl get deployment api -o=jsonpath="{.spec.template.spec.containers[*].envFrom[*].secretRef.name}"');
            const passwordCorrect = kubectlAssert('kubectl get secret ' + secretName + ' -o=jsonpath="{.data.DB_PASSWORD}"', 'Ym9uZA==');
            const usernameCorrect = kubectlAssert('kubectl get secret ' + secretName + ' -o=jsonpath="{.data.DB_USERNAME}"', 'amFtZXM=');

            const dbUser = kubectlAssert('kubectl get deployment database -o=jsonpath="{.spec.template.spec.containers[*].env[?(@.name == \'POSTGRES_USER\')].valueFrom.secretKeyRef.name}"', secretName);
            const dbUserKey = kubectlAssert('kubectl get deployment database -o=jsonpath="{.spec.template.spec.containers[*].env[?(@.name == \'POSTGRES_USER\')].valueFrom.secretKeyRef.key}"', 'DB_USERNAME');

            const dbPassword = kubectlAssert('kubectl get deployment database -o=jsonpath="{.spec.template.spec.containers[*].env[?(@.name == \'POSTGRES_PASSWORD\')].valueFrom.secretKeyRef.name}"', secretName);
            const dbPasswordKey = kubectlAssert('kubectl get deployment database -o=jsonpath="{.spec.template.spec.containers[*].env[?(@.name == \'POSTGRES_PASSWORD\')].valueFrom.secretKeyRef.key}"', 'DB_PASSWORD');

            const apiCorrect = passwordCorrect === true && usernameCorrect === true && dbUser === true && dbUserKey === true && dbPassword === true && dbPasswordKey === true;

            res.status(apiCorrect ? 200 : 500);
            res.json(JSON.stringify({ message: apiCorrect ? 'API is configured correctly!' : 'Invalid configuration detected!' }));
        } catch (e) {
            res.status(500).json(JSON.stringify({ message: 'Error when executing command!' }));
        }
    });

    function apiConfiguredCorrectly() {
        const nameCorrect = kubectlAssert('kubectl get service api -o=jsonpath="{.spec.selector.app\\.kubernetes\\.io/name}"', 'api');
        const configuredPort = kubectl('kubectl get service api -o=jsonpath="{.spec.ports[*].port}"');
        const ingressPort = tryGetIngressPort();

        return nameCorrect === true && portsCorrect(configuredPort, ingressPort) === true;
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

    /**
     * @returns Ingress port if configured, otherwise undefined
     */
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

