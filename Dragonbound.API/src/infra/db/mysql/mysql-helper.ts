import mysql from "mysql2/promise";
import { CONFIG } from "./mysql-config";

export const MySQLHelper = {
	getOffset(currentPage: number = 1, listPerPage: number): number {
		return (currentPage - 1) * listPerPage;
	},
	emptyOrRows(rows: any[]): any[] {
		if (!rows) {
			return [];
		}
		return rows;
	},
	async query(sql: string, params: any[] = []): Promise<any> {
		const connection = await mysql.createConnection(CONFIG);
		const [results] = await connection.execute(sql, params);
		return results;
	},
	async getMultiple(page: number = 1) {
		const offset = MySQLHelper.getOffset(page, 10);
		const rows =
			await MySQLHelper.query(`SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
        FROM programming_languages LIMIT ${offset},${10}`);
		const data = MySQLHelper.emptyOrRows(rows);
		const meta = { page };
		return {
			data,
			meta,
		};
	},
};
