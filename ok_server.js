const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end("OK");
});

server.listen(8080, () => console.log("ok 서버 시작"));
