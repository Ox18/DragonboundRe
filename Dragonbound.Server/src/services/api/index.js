

import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:9001",
    timeout: 10000
})