const childProcess = require("child_process");
module.exports = app => {
    app.get('/validate-kubernetes-database', (req, response) => {
        const id = Date.now().valueOf() % 1000;
        const apiTestCurl = `curl -m 5 -d "codeName=007" http://challenge.test/login -H 'content-type: application/x-www-form-urlencoded' -L -i`
        const registerCurl = `curl -m 5 -d 'codeName=${id}&name=test' https://challenge.test/register -H 'content-type: application/x-www-form-urlencoded' -ik`;
        const loginCurl = `curl -m 5 -d "codeName=${id}" http://challenge.test/login -H "content-type: application/x-www-form-urlencoded" -L -ik`;
        const restartPod = `kubectl scale deployment database --replicas=0; sleep 1; kubectl scale deployment database --replicas=1`
        const waitForDatabase = `timeout 15s bash -c -- 'while [[ $(${loginCurl} | grep "HTTP/2 504" | wc -l) -eq 1  ]]; do ${loginCurl}; sleep 0.5; done'`

        const body = {
            success: false,
            tests: [
                { message: 'Die API ist erreichbar.', success: false },
                { message: "Ein Agent kann mittels der API erstellt werden.", success: false },
                { message: "Der erstellte Agent kann für den Login verwendet werden.", success: false },
                { message: "Die Daten sind nach einem Neustart verfügbar.", success: false }
            ]
        };

        try {
            let stdout = childProcess.execSync(apiTestCurl, { encoding: 'utf-8' })
            body.tests[0].success = (stdout.match(/HTTP\/.*200/) || []).length === 1;

            stdout = childProcess.execSync(registerCurl, { encoding: 'utf-8' })
            body.tests[1].success = (stdout.match(/HTTP\/.*201/) || []).length === 1;

            stdout = childProcess.execSync(loginCurl, { encoding: 'utf-8' })
            body.tests[2].success = (stdout.match(/HTTP\/.*200/) || []).length === 1;

            stdout = childProcess.execSync(restartPod, { encoding: 'utf-8' })
            stdout = childProcess.execSync(waitForDatabase, { encoding: 'utf-8', shell: 'bash' })
            stdout = childProcess.execSync(loginCurl, { encoding: 'utf-8' })
            body.tests[3].success = (stdout.match(/HTTP\/.*200/) || []).length === 1;
        } catch (error) {
            response.status(500);
        }

        body.success = body.tests.every(x => x.success);
        response.status(
            body.success ? 200 : 500
        );
        response.json(body);
    })
}
