const express = require("express");
const app = express();
const port = 8080;
let posts = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/post", (req, res) => {
    const { title, name, text } = req.body;
    posts.push({ id: posts.length + 1, title, name, text, createdAt: Date() });
    res.json({ title, name, text });
});

app.delete("/post/:id", (req, res) => {
    const id = req.params.id;
    const filteredPosts = posts.filter((post) => post.id !== +id);
    const isLengthChanged = posts.length !== filteredPosts.length;

    posts = filteredPosts;
    if (isLengthChanged) {
        res.json("Remove Success!");
        return;
    }

    return res.json("Not Changed!");
});

app.listen(port, () => {
    console.log(`포트: ${port} 로 서버시작`);
});
