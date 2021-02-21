const http = require('http');
const server = http.createServer((req,res) => 
    {
        res.end('Server listening again on port : 3000')
    }
);

server.listen(process.env.PORT || 3000);

