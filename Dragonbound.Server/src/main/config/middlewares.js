import bodyParserJson from "../middlewares/body-parser-json";
import bodyParserUrl from "../middlewares/body-parser-url";
import cookieParser from "../middlewares/cookie-parser";
import helmet from "../middlewares/helmet";

export default (app) => {
    app.use(bodyParserJson);
    app.use(bodyParserUrl);
    app.use(cookieParser);
    app.use(helmet);
}