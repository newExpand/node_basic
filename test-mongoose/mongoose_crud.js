require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person_model");

mongoose.set("strictQuery", false);

const app = express();
app.use(bodyParser.json());
app.listen("8080", () => {
    console.log("서버시작 포트: 8080");

    const mongoDBUri = process.env.MONGODB_URL;

    mongoose
        .connect(mongoDBUri, { useNewUrlParser: true })
        .then(console.log("몽고DB 연결"));

    // 모든 person 데이터 출력
    app.get("/person", async (req, res) => {
        const person = await Person.find({});
        res.send(person);
    });

    // 특정 이메일로 person 찾기
    app.get("/person/:email", async (req, res) => {
        const person = await Person.findOne({ email: req.params.email });
        res.send(person);
    });

    // person 데이터 추가하기
    app.post("/person", async (req, res) => {
        const person = new Person(req.body);
        await person.save();
        res.send(person);
    });

    // person 데이터 수정하기
    app.put("/person/:email", async (req, res) => {
        const person = await Person.findOneAndUpdate(
            { email: req.params.email },
            { $set: req.body },
            { new: true }
        );
        console.log(person);
        res.send(person);
    });

    // person 데이터 삭제하기
    app.delete("/person/:email", async (req, res) => {
        const person = await Person.deleteMany({ email: req.params.email });
        res.send({ success: true });
    });
});
