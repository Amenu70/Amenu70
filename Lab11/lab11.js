//Question 1
Array.prototype.even = function () {
    console.log( this.filter(num => num % 2 === 0));
};

Array.prototype.odd = function () {
    console.log(this.filter(num => num % 2 !== 0));
};

[1, 2, 3, 4, 5, 6, 7, 8].even();
[1, 2, 3, 4, 5, 6, 7, 8].odd(); 

//Question 2
const fs = require('fs');
const path = require('path');
const http = require('http');

const server=http.createServer((req, res) => {
    if (req.url === '/app.pdf') {
        fs.readFile(path.join(__dirname, 'app.pdf'), (err, content) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            res.writeHead(200, { 'Content-Type': 'application/pdf' });
            res.end(content);
        })
    }
})
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server has started at port ${PORT}`));