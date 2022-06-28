const { Router } = require("express");
const { readdirSync } = require("fs");
const { join } = require("path");

export default (app) => {
    const router = Router();
    app.use("/", router);
    readdirSync(join(__dirname, "../routes")).map(async (file) => {
        if (file.endsWith(".js")) {
            const r = require(`../routes/${file}`);
            await r.default(router);
        }
    });
};