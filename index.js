const express = require("express");
const body_parser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authroutes = require("./Routes/auth");
const restroutes = require("./Routes/restuarants");
const cookieparser = require("cookie-parser");

const app = express();

dotenv.config();

if (process.env.NODE_ENV === "development") {
    app.use(
        cors({
            origin: ["http://localhost:3000"],
            credentials: true,
        })
    );
}

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cookieparser());

// console.log(authroutes);
app.use("/auth", authroutes);
app.use("/rest", restroutes);

var server = require("http").createServer(app);
server.listen(process.env.PORT || 8000);
