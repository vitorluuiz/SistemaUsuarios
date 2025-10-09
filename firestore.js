const { MongoClient } = require("mongodb");

const url = "mongodb://vitor:A19NMxGSKBSPn5KvbL2XSt-3LAV-0ihsIekmzrUy7yHbnF6b@980d1d45-57f2-4da8-a796-5dd821368380.southamerica-east1.firestore.goog:443/sistema-usuarios?loadBalanced=true&tls=true&authMechanism=SCRAM-SHA-256&retryWrites=false";

const cliente = new MongoClient(url);

async function connectDB() {
    try {
        await cliente.connect();
        console.log("Mongo DB connected!");
        return cliente.db("sistema-usuarios");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;

