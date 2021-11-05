const http = require('http')
const https = require('https')
const childProcess = require('child_process');

module.exports = function (app) {

    //return the basic result of a bash command
    app.get('/ingress-validation', function (req, res) {
        //basic command execution - result will be in stdout
        try {
            const command = `if [ -f "ingress.yaml" ]; then
                                $DEFAULTBACKEND_PORT=$(cat ingress.yaml | yq e '.spec.defaultBackend.service.port.number' -  )
                                $RULES_PORT=$(cat ingress.yaml | yq e '.spec.rules[0].http.paths[0].backend.service.port.number' -)
                                if [$RULES_PORT = null]; then
                                    $PORT = $DEFAULTBACKEND_PORT
                                else
                                    $PORT = $RULES_PORT
                                fi
                                cat ingress_validation/ingress-echo.service.yaml | yq e '.spec.ports[].port = "$PORT"' - | sudo sponge ingress-echo.service.yaml
                                kubectl apply -f ingress_validation/ingress-echo.deployment.yaml
	                            kubectl apply -f ingress_validation/ingress-echo.service.yaml
                                wait
                                cat ingress.yaml | yq e '.spec.defaultBackend.service.name = "echoserver"' - | sudo sponge ingress.yaml
                                cat ingress.yaml | yq e '.spec.rules[].http.paths[].backend.service.name = "echoserver"' - | sudo sponge ingress.yaml 
                                kubectl apply -f ingress.yaml
                                wait
                                curl http://challenge.test/?echo_body=funktioniert -L
                            else 
                                echo "ingress.yaml does not exist!"
                            fi`;
            const stdout = childProcess.execSync(command, {
                encoding: 'utf8',
                cwd: '/vagrant',
            });

            if (stdout.match("funktioniert")) {
                res.status(200);
            } else {
                res.status(500);
            }
            res.json(JSON.stringify(stdout));
        } catch (e) {
            console.log(e.stdout);
            res.status(500).json(JSON.stringify("Error when executing command!"));
        }
    });

    // add more examples here...
}