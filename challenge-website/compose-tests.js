const http = require('http')
const https = require('https')


//contains tests for part 1 (docker-compose)
module.exports = function (app) {

    //query missions, returning status code
    app.get('/compose-api-test', (req, res) => {
        https
            .get('https://localhost:443/missions', {f}, resp => {
                let data = ''
                resp.on('data', chunk => {
                    data += chunk;
                })
                resp.on('end', () => {
                    res.status(resp.statusCode).json({ 'data': data });
                })
            })
            .on('error', err => {
                res.status(500).json({ 'error': 'Error retrieving data!' });
            })
    });

    //query missions via http, returning status code
    app.get('/compose-https-upgrade-test', (req, res) => {
        http
            .get('http://localhost:80/missions', resp => {
                let data = '';
                resp.on('data', chunk => {
                    data += chunk;
                })
                resp.on('end', () => {
                    res.status(resp.statusCode).json({ 'data': data });
                })
            })
            .on('error', err => {
                res.status(500).json({ 'error': 'Error retrieving data!' });
            })
    });
}
