import { HttpResponse } from "@protocols/index";

export interface Controller<T = any> {
	handle: (request: T) => Promise<HttpResponse>;
}
