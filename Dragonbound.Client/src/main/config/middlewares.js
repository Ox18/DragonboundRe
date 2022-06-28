import bodyParser from "../middlewares/body-parser"
import contentType from "../middlewares/content-type"
import cookieParser from "../middlewares/cookie-parser"
import cors from "../middlewares/cors"
import expressSession from "../middlewares/express-session"
import helmet from "../middlewares/helmet"
import morgan from "../middlewares/morgan"
import noCache from "../middlewares/no-cache"

export default (app) => {
    app.use(bodyParser)
    app.use(contentType)
    app.use(cookieParser)
    app.use(cors)
    app.use(expressSession)
    app.use(helmet)
    app.use(morgan)
    app.use(noCache)
}