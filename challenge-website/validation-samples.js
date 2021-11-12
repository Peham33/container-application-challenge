const http = require('http')
const https = require('https')
const childProcess = require('child_process');

module.exports = function (app) {

    //return the basic result of a bash command
    app.get('/basic-bash-test', function (req, res) {
        //basic command execution - result will be in stdout
        try {
            const command = `whoami`;
            const stdout = childProcess.execSync(command, {
                encoding: 'utf8',
                cwd: '/vagrant',
            });
            // console.log(new Date().toISOString());
            // console.log('------------------------');
            // console.log(stdout);
            res.status(200).json(JSON.stringify(stdout));
        } catch (e) {
            console.log(e.stdout);
            res.status(500).json(JSON.stringify("Error when executing command!"));
        }
    });

    //return the basic result of a bash command
    app.get('/bash-test-if-file-exists', function (req, res) {
        //basic command execution - result will be in stdout
        try {
            const command = `if [ -f "testfile.txt" ]; then
                                echo "File exists!"
                            else 
                                echo "File does not exist!"
                            fi`;
            const stdout = childProcess.execSync(command, {
                encoding: 'utf8',
                cwd: '/vagrant',
            });

            if (stdout.match("File exists!")) {
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