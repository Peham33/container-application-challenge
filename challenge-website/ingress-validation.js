const childProcess = require('child_process');

module.exports = function (app) {
    //return the basic result of a bash command
    app.get('/ingress-validation', function (req, res) {
        //basic command execution - result will be in stdout
        try {
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
            } else if (stdout.match("No port numbers assigned! Define either default backend or rules entry")) {
                res.status(500);
                res.json(JSON.stringify("No port numbers assigned! Define either default backend or rules entry"));
            } else if (stdout.match("API service port and ingress port do not match")) {
                res.status(500);
                res.json(JSON.stringify("API service port and ingress port do not match"));
            } else if (stdout.match("Can not connect to kubectl cluster.")) {
                res.status(500);
                res.json(JSON.stringify("Can not connect to kubectl cluster."));
            } else if (stdout.match("ingress.yaml does not exist!")) {
                res.status(500);
                res.json(JSON.stringify("ingress.yaml does not exist!"));
            } else {
                res.status(500);
            }
            res.json({stdout});
        } catch (e) {
            console.log(e.stdout);
            res.status(500).json({error: "Error when executing command!"});
        }
    });
};
