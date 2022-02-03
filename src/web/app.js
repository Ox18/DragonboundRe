import express from 'express';
import "express-async-errors";
import cors from 'cors';

import routes from "./routes";

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
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