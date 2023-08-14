const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if (path in urlMap) {
        urlMap[path](req, res);
    } else {
        notFound(req, res);
    }
}).listen("8080", () => console.log("라우터를 만들어보자"));

const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;

    res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
};

const feed = (req, res) => {
    res.end(`<ul>
            <li>그림1</li>
            <li>그림2</li>
            <li>그림3</li>
        </ul>
        `);
};

const notFound = (req, res) => {
    res.end("404 page not found");
};

const urlMap = {
    "/": (req, res) => res.end("홈"),
    "/user": user,
    "/feed": feed,
};
