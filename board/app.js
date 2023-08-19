const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");
const { ObjectId } = require("mongodb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    "handlebars",
    handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
    }).engine
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";

    try {
        const [posts, paginator] = await postService.list(collection, page, search);
        res.render("home", { title: "테스트 게시판", search, paginator, posts });
    } catch (err) {
        console.error(err);
        res.render("home", { title: "테스트 게시판" });
    }
});

app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판", mode: "create" });
});

app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);

    res.redirect(`/detail/${result.insertedId}`);
});

app.post("/write-comment", async (req, res) => {
    const { id, name, password, comment } = req.body;
    const post = await postService.getPostById(collection, id);

    if (post.comments) {
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    } else {
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            },
        ];
    }

    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});

app.delete("/write-comment", async (req, res) => {
    const { id, idx, password } = req.body;

    const post = await collection.findOne(
        {
            _id: ObjectId(id),
            comments: { $elemMatch: { idx: parseInt(idx), password } },
        },
        postService.projectionOption
    );

    if (!post) {
        return res.json({ isSuccess: false });
    }

    post.comments = post.comments.filter((comment) => comment.idx != idx);
    postService.updatePost(collection, id, post);
    
    return res.json({ isSuccess: true });
});

app.get("/modify/:id", async (req, res) => {
    const post = await postService.getPostById(collection, req.params.id);

    res.render("write", { title: "테스트 게시판", mode: "modify", post });
});

app.post("/modify/", async (req, res) => {
    const { id, title, write, password, content } = req.body;

    const post = {
        title,
        write,
        password,
        content,
        createdDt: new Date().toISOString(),
    };

    try {
        await postService.updatePost(collection, id, post);
        res.redirect(`/detail/${id}`);
    } catch (err) {
        console.error(err);
    }
});

app.delete("/delete", async (req, res) => {
    const { id, password } = req.body;
    try {
        const result = await collection.deleteOne({
            _id: ObjectId(id),
            password: password,
        });

        if (result.deletedCount !== 1) {
            console.log("삭제 실패");
            return res.json({ isSuccess: false });
        }
        res.json({ isSuccess: true });
    } catch (err) {
        console.error(err);
        return res.json({ isSuccess: false });
    }
});

app.get("/detail/:id", async (req, res) => {
    const result = await postService.getDetailPost(collection, req.params.id);

    res.render("detail", { title: "테스트 게시판", post: result.value });
});

app.post("/check-password", async (req, res) => {
    const { id, password } = req.body;

    const post = await postService.getPostByIdAndPassword(collection, { id, password });

    if (!post) {
        return res.status(404).json({ isExist: false });
    } else {
        return res.json({ isExist: true });
    }
});

let collection;
app.listen(8080, async () => {
    console.log("서버 시작");

    const mongoClient = await mongodbConnection();

    collection = mongoClient.db().collection("post");
    console.log("몽고DB 연결");
});
