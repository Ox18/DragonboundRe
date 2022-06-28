import contentType from "../middlewares/content-type";
import cors from "../middlewares/cors";
import morgan from "../middlewares/morgan";
import bodyParser from "body-parser";

export default (app) => {
    app.use(bodyParser.json());
    // in latest body-parser use like below.
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(contentType);
    app.use(cors);
    app.use(morgan);
}