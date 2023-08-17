require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URL;

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};
