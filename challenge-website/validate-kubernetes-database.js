const childProcess = require("child_process");

module.exports  = app => {
    app.get('/validate-kubernetes-database', (req, response) => {
        const id = Date.now().valueOf() % 1000;
        const registerCurl = `curl -m 5 -d 'codeName=${id}&name=test' https://challenge.test/register -H 'content-type: application/x-www-form-urlencoded' -ik`;
        const loginCurl = `curl -m 5 -d "codeName=${id}" http://challenge.test/login -H "content-type: application/x-www-form-urlencoded" -L -ik`;
        const restartPod = `kubectl scale deployment database --replicas=0; sleep 1; kubectl scale deployment database --replicas=1`
        const waitForDatabase = `timeout 15s bash -c -- 'while [[ $(${loginCurl} | grep "HTTP/2 504" | wc -l) -eq 1  ]]; do ${loginCurl}; sleep 0.5; done'`

        const body = {};
        let html = "";

        try {
            let stdout = childProcess.execSync(registerCurl, {encoding: 'utf-8'})
            body["registerCurl"] = stdout;
            html += `<h1>Initial Create</h1>`;
            html += `<code>${stdout}</code>`;
            const registerSuccess = (stdout.match(/HTTP\/2 201/) || []).length === 1;
            html += `<p>${registerSuccess}</p>`;
            body["registerSuccess"] = registerSuccess;

            stdout = childProcess.execSync(loginCurl, {encoding: 'utf-8'})
            body["loginCurl"] = stdout;
            html += `<h1>Login</h1>`;
            html += `<code>${stdout}</code>`;
            const loginSuccess = (stdout.match(/HTTP\/2 200/) || []).length === 1;
            html += `<p>${loginSuccess}</p>`;
            body["loginSuccess"] = loginSuccess;

            stdout = childProcess.execSync(restartPod, {encoding: 'utf-8'})
            body["restartPod"] = stdout;
            stdout = childProcess.execSync(waitForDatabase, {encoding: 'utf-8', shell: 'bash'})
            body["waitForDatabase"] = stdout;
            html += `<h1>Wait for Database</h1>`;
            html += `<code>${stdout}</code>`;

            stdout = childProcess.execSync(loginCurl, {encoding: 'utf-8'})
            body["loginAfterRestart"] = stdout;
            html += `<h1>Login 2</h1>`;
            html += `<code>${stdout}</code>`;
            const loginAfterRestartSuccess = (stdout.match(/HTTP\/2 200/) || []).length === 1;
            html += `<p>${loginAfterRestartSuccess}</p>`;
            body["loginSuccess"] = loginAfterRestartSuccess;

            body["html"] = html.toString();

            response.status(
                loginAfterRestartSuccess ? 200 : 500
            );
            response.json(body);
        } catch(error) {
            response.status(500);
            response.json(error);
        }
    })
}
