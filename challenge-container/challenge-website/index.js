const http = require('http')
const https = require('https')
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//query missions, returning status code
app.get('/api-test', (req, res) => {
    https
    .get('https://localhost:443/missions', resp => {
        let data = ''
        resp.on('data', chunk => {
            data += chunk
        })
        resp.on('end', () => {
            res.status(resp.statusCode).json({ 'data': data })
        })
    })
    .on('error', err => {
        res.status(500).json({ 'error': 'Error retrieving data!' })
    })
});

//query missions via http, returning status code
app.get('/https-upgrade-test', (req, res) => {
    http
    .get('http://localhost:80/missions', resp => {
        let data = ''
        resp.on('data', chunk => {
            data += chunk
        })
        resp.on('end', () => {
            res.status(resp.statusCode).json({ 'data': data })
        })
    })
    .on('error', err => {
        res.status(500).json({ 'error': 'Error retrieving data!' })
    })
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
