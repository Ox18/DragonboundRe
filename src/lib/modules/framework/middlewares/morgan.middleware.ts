import morgan from 'morgan';
export const morganMiddleware = () => {
    return morgan('dev')
}