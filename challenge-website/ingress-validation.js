const childProcess = require('child_process');
const { json } = require('express');

module.exports = function (app) {
    //return the basic result of a bash command
    app.get('/ingress-validation', function (req, res) {
        //basic command execution - result will be in stdout
        let jsonObj = {
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
            jsonObj.tests = jsonRes;

            if (jsonObj.tests.find(el => el.success == false) != null) {
                jsonObj.success = false;
            } else {
                jsonObj.success = true;
            }

            res.status(500);
            res.json(jsonObj);

        } catch (e) {
            console.log(e.stdout);
            res.status(500).json(jsonObj);
        }
    });
};