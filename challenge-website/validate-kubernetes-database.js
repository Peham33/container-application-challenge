const childProcess = require("child_process");

module.exports = app => {
    app.get('/validate-kubernetes-database', (req, response) => {
        const id = Date.now().valueOf() % 1000;
        const apiTestCurl = `curl -m 5 -d "codeName=007" http://challenge.test/login -H 'content-type: application/x-www-form-urlencoded' -L -i`
        const registerCurl = `curl -m 5 -d 'codeName=${id}&name=test' https://challenge.test/register -H 'content-type: application/x-www-form-urlencoded' -ik`;
        const loginCurl = `curl -m 5 -d "codeName=${id}" http://challenge.test/login -H "content-type: application/x-www-form-urlencoded" -L -ik`;
        const restartApi = `kubectl scale deployment api --replicas=0; sleep 1; kubectl scale deployment api --replicas=1`
        const waitForDatabase = `timeout 15s bash -c -- 'while [[ $(${loginCurl} | grep "HTTP.*504" | wc -l) -eq 1  ]]; do ${loginCurl}; sleep 0.5; done'`

        const body = {
            success: false,
            tests: [
                { message: "Die Datenbank läuft.", success: false },
                { message: "Die API ist erreichbar.", success: false },
                { message: "Ein Agent kann mithilfe der API erstellt werden.", success: false },
                { message: "Der erstellte Agent kann für den Login verwendet werden.", success: false },
                { message: "Die Daten sind nach einem Neustart noch verfügbar.", success: false }
            ]
        };

        try {
            let stdout;

            childProcess.execSync(waitForDatabase, { encoding: 'utf-8', shell: 'bash' })
            body.tests[0].success = databaseIsRunning();

            try {
                stdout = childProcess.execSync(apiTestCurl, { encoding: 'utf-8' })
                body.tests[1].success = (stdout.match(/HTTP\/.*200/) || []).length === 1;

            } catch (e) {
                // Sometimes the api can not acquire a jdbc connection. Restarting solves this problem.
                stdout = childProcess.execSync(restartApi, { encoding: 'utf-8'})
                childProcess.execSync(`sleep 3`, { encoding: 'utf-8'})

                stdout = childProcess.execSync(apiTestCurl, { encoding: 'utf-8' })
                body.tests[1].success = (stdout.match(/HTTP\/.*200/) || []).length === 1;
            }

            if( body.tests[0] && body.tests[1]) {
                stdout = childProcess.execSync(registerCurl, { encoding: 'utf-8' })
                body.tests[2].success = (stdout.match(/HTTP\/.*201/) || []).length === 1;

                stdout = childProcess.execSync(loginCurl, { encoding: 'utf-8' })
                body.tests[3].success = (stdout.match(/HTTP\/.*200/) || []).length === 1;

                body.tests[4].success = databaseHasCorrectVolumeMountPath();
            }
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

const databaseIsRunning = () => {
    let podStatusJson = childProcess.execSync(`kubectl get pods -o=jsonpath="{}"`, { encoding: 'utf-8' })
    try {
        const status = JSON.parse(podStatusJson);
        const database = status.items.find(entry => entry.metadata.generateName.startsWith('database'));

        return database.status.containerStatuses[0].state.running !== undefined;
    } catch (e) {
        return false;
    }
};

const databaseHasCorrectVolumeMountPath = () => {
    const jsonPath = `{.items[?(@.metadata.name=='database')].spec.template.spec.containers[0].volumeMounts[*].mountPath}`
    const stdout = childProcess.execSync( `kubectl get deployment -o=jsonpath="${jsonPath}"`, {encoding: 'utf-8'});

    // "/var/lib/postgresql/data"
    return /^\/var\/lib\/postgresql\/data$/.test(stdout);
}
