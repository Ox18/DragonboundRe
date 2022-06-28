require("dotenv").config();

export default {
	port: process.env.PORT || 3000,
	db: {
		host: process.env.NODE_ENV === "production" ? process.env.DB_HOST : "localhost",
		user: process.env.NODE_ENV === "production" ? process.env.DB_USER : "root",
		password: process.env.NODE_ENV === "production" ? process.env.DB_PASSWORD : "wilmerdelgadoalama",
		database: process.env.NODE_ENV === "production" ? process.env.DB_NAME : "gunbound",
		port: process.env.NODE_ENV === "production" ? process.env.DB_PORT : 3306,
	}
};