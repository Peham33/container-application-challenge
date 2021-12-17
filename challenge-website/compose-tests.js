const http = require('http')
const https = require('https')


//contains tests for part 1 (docker-compose)
module.exports = function (app) {

    //query missions, testing access on port 80
    app.get('/compose-api-test-http', (req, res) => {
        let body = { 'success': false, tests: [{ message: "API erreichbar auf Port 80", success: false }] };
        http.get('http://localhost:80/missions', resp => {
            let data = ''
            resp.on('data', chunk => {
                data += chunk;
            })
            resp.on('end', () => {
                if (resp.statusCode == 504 || resp.statusCode == 200 || resp.statusCode == 301) {
                    body.success = true;
                    body.tests[0].success = true;
                }
                res.status(resp.statusCode).json(body);
            })
        })
            .on('error', err => {
                res.status(500).json(body);
            })
    });

    //query missions, testing access on port 443
    app.get('/compose-api-test-https', (req, res) => {
        let body = { 'success': false, tests: [{ message: "API erreichbar auf Port 443", success: false }] };
        https.get('https://localhost:443/missions', resp => {
            let data = ''
            resp.on('data', chunk => {
                data += chunk;
            })
            resp.on('end', () => {
                if (resp.statusCode == 504 || resp.statusCode == 200) {
                    body.success = true;
                    body.tests[0].success = true;
                }
                res.status(resp.statusCode).json(body);
            })
        })
            .on('error', err => {
                res.status(500).json(body);
            })
    });

    //query missions, testing if mission from db was returned
    app.get('/compose-db-test', (req, res) => {
        let body = { 'success': false, tests: [{ message: "API liefert Daten", success: false }] };
        https.get('https://localhost:443/missions', resp => {
            let data = ''
            resp.on('data', chunk => {
                data += chunk;
            })
            resp.on('end', () => {
                if (resp.statusCode == 200 && data.includes('Operation Dijkstra')) {
                    body.success = true;
                    body.tests[0].success = true;
                }
                res.status(resp.statusCode).json(body);
            })
        })
            .on('error', err => {
                res.status(500).json(body);
            })
    });

    //query missions, testing access on port 443
    app.get('/compose-https-upgrade-test', (req, res) => {
        let body = { 'success': false, tests: [{ message: "https-Upgrade konfiguriert", success: false }] };
        http.get('http://localhost:80/missions', resp => {
            let data = ''
            resp.on('data', chunk => {
                data += chunk;
            })
            resp.on('end', () => {
                if (resp.statusCode == 301 || resp.statusCode == 302) {
                    body.success = true;
                    body.tests[0].success = true;
                }
                res.status(resp.statusCode).json(body);
            })
        })
            .on('error', err => {
                res.status(500).json(body);
            })
    });
}
