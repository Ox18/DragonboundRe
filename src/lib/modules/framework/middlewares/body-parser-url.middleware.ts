import * as bodyParser from "body-parser";

export const bodyParserUrlMiddleware = bodyParser.urlencoded({
    extended: true
});