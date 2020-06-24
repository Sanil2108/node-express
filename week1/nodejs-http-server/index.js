const http = require('http');
// To read and write files
const fs = require('fs');
// Allows operations on paths
const path = require('path');

const HOST_NAME = 'localhost';
const PORT = 3000;

const server = http.createServer(async (req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        const fileUrl = `${(req.url === '/') ? '/index' : req.url}.html`;
        // Getting the path of the file
        const filePath = path.join(path.resolve('', 'public'), fileUrl);

        // Finding if the file exists or not
        const exists = await new Promise((resolve, reject) => {
            fs.exists(`${filePath}`, (exists) => {
                resolve(exists);
            });
        });

        // Only return html files
        res.setHeader('Content-Type', 'text/html')
        if (exists) {
            res.statusCode = 200;
            // Basically we are creating a read stream which will pipe whatever it gets to
            // another stream, which is the response
            // https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-read-stream/
            return fs.createReadStream(filePath).pipe(res)
        }
        else {
            res.statusCode = 404;
            res.end('<h1>404</h1>');
        }
    }
    else {
        res.statusCode = 405;
        res.end();
    }
});

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server listening at ${HOST_NAME}:${PORT}`);
})
