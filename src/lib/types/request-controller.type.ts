export type RequestController<T> = {
    data: T;
    queryParams: Record<string, string>;
    params: Record<string, string>;
    session: RequestSessionController;
}

export type RequestSessionController = {
    set: (key: string, value: any) => void;
    data: {
        user: string;
        account: string;
    };
    destroy: (callbackError?: (error: any) => void) => void;
    isActive: boolean;
}