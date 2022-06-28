import { urlencoded } from "body-parser";

export default [
    urlencoded(),
    urlencoded({ extended: true })
]