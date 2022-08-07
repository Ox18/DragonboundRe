
import contentType from "../middlewares/content-type"
import cookieParser from "../middlewares/cookie-parser"
import cors from "cors";
import bodyParser from "body-parser";
import expressSession from "../middlewares/express-session"
import morgan from "../middlewares/morgan"
import noCache from "../middlewares/no-cache"

export default (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(contentType)
    app.use(cookieParser)
    app.use(cors({ origin: true }))
    app.use(expressSession)
    app.use(morgan)
    app.use(noCache)
}