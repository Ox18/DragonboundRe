import { Router } from "express";
import express from "express";
import { readdirSync } from "fs";
import { join } from "path";
import path from "path";

export default (app) => {
    const router = Router();
    app.use(
		"/static",
		express.static(path.join(__dirname + "/../resources/public"))
	);
	app.use("/", router);
	readdirSync(join(__dirname, "../routes")).map(async (file) => {
		if (file.endsWith(".js")) {
			const route = require(`../routes/${file}`);
			await route.default(router);
		}
	});
}