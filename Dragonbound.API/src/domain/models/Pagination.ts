export interface Pagination<T = any> {
	resources: T[];
	pagination: {
		offset: number;
		count: number;
		totalResults: number;
	};
}
