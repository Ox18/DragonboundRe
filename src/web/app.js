var express = require('express');
import "express-async-errors";
var cors = require('cors');

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(cors({ origin: true }));

app.set('port', process.env.PORT || 3000);

app.use((err, req, res, next) => {
    return res.status(500).json({
        status: "error",
        message: "Internal server error: " + err.message,
    });
});

app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'));
});