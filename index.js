require("dotenv").config();
const {createServer} = require("http")
const {app} = require("./src/app");

const port = parseInt(process.env.PORT);

createServer(app).listen(port, () => {
    console.log(`SERVER RUNNING ON ${port}`);
});