import http from 'node:http';
import * as fs from 'fs';


const server = http.createServer((req, res) => {
    const url = req.url;

     // 📝 Explanation:
    // 'req.url' gives you the path part of the URL that the user requested.
    // For example:
    // - If user visits 'http://localhost:8000/', then url === '/'
    // - If user visits 'http://localhost:8000/about', then url === '/about'
    // - If the HTML page includes <link rel="stylesheet" href="/style.css">,
    //   the browser will request '/style.css', so url === '/style.css'
    // You can use this to determine which file to serve.

    if (url === '/') {
        fs.readFile('./public/index.html', function(err, data) {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (url === '/about') {
        fs.readFile('./public/about.html', function(err, data) {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (url === '/style.css') {
        fs.readFile('./public/style.css', function(err, data) {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        });
    } else if (url === '/index.js') {
        fs.readFile('./public/index.js', function(err, data) {
            if (err) throw err;
    
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
        });
    }
    else {
        res.writeHead(400);
        res.end('404 Not Found!');
    }
});

server.listen(8000, () => {console.log('🚀 Server running at http://localhost:8000')});