import mysql from "mysql2/promise";
import { CONFIG } from "./mysql-config";

export const MySQLHelper = {
	async query(sql: string, params: any[] = []): Promise<any> {
		const connection = await mysql.createConnection(CONFIG);
		const [results] = await connection.execute(sql, params);
		return results;
	},
};
