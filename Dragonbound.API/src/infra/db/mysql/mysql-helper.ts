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
};
