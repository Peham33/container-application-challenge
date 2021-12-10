const http = require('http')
const https = require('https')


//contains tests for part 1 (docker-compose)
module.exports = function (app) {

    //query missions, returning status code
    app.get('/compose-api-test', (req, res) => {
        let body = { success: false };
        https.get('https://localhost:443/missions', resp => {
            resp.on('end', () => {
                res.status = resp.statusCode;
                body['success'] = resp.statusCode == 200;
            })
        })
            .on('error', err => {
                res.status = 500;
                body['success'] = false;
            })
        res.json(body);
    }
    );

    //query missions, returning status code
    app.get('/compose-db-test', (req, res) => {
        let body = { success: false };
        https.get('https://localhost:443/missions', resp => {
            resp.on('end', () => {
                res.status = resp.statusCode;
                body['success'] = resp.statusCode == 200;
            })
        })
            .on('error', err => {
                res.status = 500;
                body['success'] = false;
            })
        res.json(body);
    });

    //query missions via http, returning status code
    app.get('/compose-https-upgrade-test', (req, res) => {
        let body = { success: false };
        http.get('http://localhost:80/missions', resp => {
            resp.on('end', () => {
                res.status = resp.statusCode;
                body['success'] = resp.statusCode == 301 || resp.statusCode == 302;
            })
        })
            .on('error', err => {
                res.status = 500;
                body['success'] = false;
            });
        res.json(body);
    });
}
