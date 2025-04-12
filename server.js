import http from 'node:http';
import * as fs from 'fs';
import qr from 'qr-image';
import url from 'node:url';

const isValidURL = (link) => {
    const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/\w\-.?=&%]*)*\/?$/;
    return regex.test(link);
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/') {
        fs.readFile('./public/index.html', function(err, data) {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (pathname === '/about') {
        fs.readFile('./public/about.html', function(err, data) {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (pathname === '/style.css') {
        fs.readFile('./public/style.css', function(err, data) {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        });
    } else if (pathname === '/index.js') {
        fs.readFile('./public/index.js', function(err, data) {
            if (err) throw err;
    
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
        });
    } else if (pathname === '/generate') {
        const link = query['link-input'];

        if (isValidURL(link)){
            res.writeHead(200, {'Content-Type': 'image/png'});
            let qr_png = qr.image(link, {type : 'png'});
            qr_png.pipe(res);
        } else {
            res.writeHead(200);
            res.end('Invalid link');
        }
    }
    else {
        res.writeHead(400);
        res.end('404 Not Found!');
    }
});

server.listen(8000, () => {console.log('🚀 Server running at http://localhost:8000')});