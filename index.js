require("dotenv").config();
const {createServer} = require("http")
const {app} = require("./src/app");
const {connect, connection} = require("mongoose");

const port = parseInt(process.env.PORT);
// const port = 8000;

const connectDatabase = () => {
    return connect("mongodb://127.0.0.1:27017/products")
}

connection.on("connected", () => {
    console.log("DATABASE CONNECTED");
});

connectDatabase()
    .then( () => {
        createServer(app).listen(port, () => {
            console.log(`SERVER RUNNING ON ${port}`);
        });
    })
