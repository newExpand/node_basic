const url = require("url");
const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`서버 시작: ${port}`);
});

app.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html; charset=utf-8" });
    res.end("홈");
});
app.get("/user", (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    res.json(`[user] name: ${userInfo.name} age: ${userInfo.age}`);
});
app.get("/feed", (req, res) => {
    res.json(`
        <ul>
            <li>그림1</li>
            <li>그림2</li>
            <li>그림3</li>
        </ul>
    `);
});
