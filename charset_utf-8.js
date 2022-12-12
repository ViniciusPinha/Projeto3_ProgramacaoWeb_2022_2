const { read } = require('fs');
const http = require('http');
let server = http.createServer((req,res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');

    console.log(req.headers);
    console.log(res.getHeaders());
    
    res.write('Olá mundo');
    res.end();
});

server.listen(3000);