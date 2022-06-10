import { HttpResponse } from "@protocols/http";

export interface Middleware<T = any> {
	handle: (httpRequest: T) => Promise<HttpResponse>;
}
