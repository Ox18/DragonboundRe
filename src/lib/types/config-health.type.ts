export type ConfigHealth = {
    service: {
        port: number;
        name: string;
    };
    session: {
        secret: string;
    };
}