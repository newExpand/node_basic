require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, { useNewUrlParser: true });

async function main() {
    try {
        await client.connect();

        console.log("몽고DB 접속");

        // 문서 하나 추가
        const collection = client.db("test").collection("person");
        await collection.insertOne({ name: "승민", age: 20 });
        console.log("문서 추가 완료");

        // 문서 찾기
        const documents = await collection.find({ name: "승민" }).toArray();
        console.log("찾은 문서 : ", documents);

        // 문서 갱신하기
        await collection.updateOne({ name: "승민" }, { $set: { age: 30 } });
        console.log("문서 업데이트");

        const updatedDocument = await collection.find({ name: "승민" }).toArray();
        console.log("갱신된 문서 : ", updatedDocument);

        // 문서 삭제하기
        // await collection.deleteOne({ name: '승민' });
        // console.log('문서 삭제');

        await client.close();
    } catch (err) {
        console.error(err);
    }
}

main();
