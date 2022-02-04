import express from 'express';
import path from 'path';
import "express-async-errors";
import cors from 'cors';

import routes from "./routes";

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("views", "./src/web/views");
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname + '/public')));
app.use(routes);
app.use(cors({ origin: true }));

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: "error",
        message: "Internal server error: " + err.message
    });
});

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});