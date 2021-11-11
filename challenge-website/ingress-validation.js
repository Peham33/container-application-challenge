const http = require('http')
const https = require('https')
const childProcess = require('child_process');

module.exports = function (app) {

    //return the basic result of a bash command
    app.get('/ingress-validation', function (req, res) {
        //basic command execution - result will be in stdout
        try {
                // const command = `
                // cd /vagrant/challenge-website/
                // if [ -f "/vagrant/ingress.yaml" ]; then
                //     DEFAULTBACKEND_PORT=$(cat /vagrant/ingress.yaml | yq e '.spec.defaultBackend.service.port.number' -  )
                //     RULES_PORT=$(cat /vagrant/ingress.yaml | yq e '.spec.rules[0].http.paths[0].backend.service.port.number' -)
                //     if [[ $RULES_PORT == "null" ]];
                //     then
                //         PORT=$DEFAULTBACKEND_PORT
                //     else
                //         PORT=$RULES_PORT
                //     fi
                //     if [[ $PORT == "null" ]]; 
                //         then 
                //             echo "No port numbers assigned! Define either default backend or rules entry"
                //             exit 1
                //     fi
                
                //     #Setup Echoserver
                //     cat /vagrant/ingress_validation/ingress-echo.service.yaml | yq e ".spec.ports[].port = $PORT" - | sudo sponge /vagrant/ingress_validation/ingress-echo.service.yaml
                //     kubectl apply -f /vagrant/ingress_validation/ingress-echo.deployment.yaml
                //     kubectl apply -f /vagrant/ingress_validation/ingress-echo.service.yaml
                
                //     echopodReadyState=$(kubectl get pods | grep "echo.*Running" | cut -f9 -d' ')
                //     while [[ $echopodReadyState != "Running" ]]; do
                //         sleep 2
                //         echopodReadyState=$(kubectl get pods | grep "echo.*Running" | cut -f9 -d' ')
                //         echo "Echoserver not running."
                //     done
                //     echo $echopodReadyState
                
                //     cat /vagrant/ingress.yaml | yq e '.spec.defaultBackend.service.name = "echoserver"' - | sudo sponge /vagrant/ingress.yaml
                //     cat /vagrant/ingress.yaml | yq e '.spec.rules[].http.paths[].backend.service.name = "echoserver"' - | sudo sponge /vagrant/ingress.yaml
                //     kubectl apply -f /vagrant/ingress.yaml
                
                //     sleep 5
                //     curl http://challenge.test/?echo_body=funktioniert -L 
                
                //     echo ""
                
                //     #Cleanup
                //     echopod=$(kubectl get pods | grep "echo" | cut -f1 -d' ')
                //     kubectl delete deployment echoserver
                //     kubectl delete service echoserver 
                //     kubectl delete pod $echopod --force
                //     cat /vagrant/ingress.yaml | yq e '.spec.defaultBackend.service.name = "api"' - | sudo sponge /vagrant/ingress.yaml
                //     cat /vagrant/ingress.yaml | yq e '.spec.rules[].http.paths[].backend.service.name = "api"' - | sudo sponge /vagrant/ingress.yaml
                //     kubectl apply -f /vagrant/ingress.yaml
                // else 
                //     echo "ingress.yaml does not exist!"
                // fi`;

                const command = `
                cd /vagrant/ingress_validation/
                /bin/bash ingress-validation.sh
                `;

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