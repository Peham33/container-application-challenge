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
