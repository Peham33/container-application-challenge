const childProcess = require('child_process');
const { json } = require('express');

module.exports = function (app) {
    //return the basic result of a bash command
    app.get('/ingress-validation', function (req, res) {
        //basic command execution - result will be in stdout
        let body = {
            success: true,
            tests: []
        };

        try {
            const command = `
                cd /vagrant/ingress_validation/
                /bin/bash ingress-validation.sh
                `;

            const stdout = childProcess.execSync(command, {
                encoding: 'utf8',
                cwd: '/vagrant',
            });

            const jsonRes = JSON.parse(stdout);
            body.tests = jsonRes;

            body.success = body.tests.every(test => test.success);
            res.status(body.success ? 200 : 500);
            res.json(body);

        } catch (e) {

            body.success = false;
            body.tests.push({"message": "Minikube ist nicht erreichbar", "success": false});
            res.status(500).json(body);
        }
    });
};