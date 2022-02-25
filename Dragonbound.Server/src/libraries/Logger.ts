import colors from 'colors';

class Logger{
    public static INFO(message: string){
        console.log(colors.green(message));
    }

    public static ERROR(message: string){
        console.log(colors.red(message));
    }

    public static WARNING(message: string){
        console.log(colors.yellow(message));
    }

    public static DEBUG(message: string){
        console.log(colors.blue(message));
    }

    public static SUCCESS(message: string){
        console.log(colors.green(message));
    }

    public static FAIL(message: string){
        console.log(colors.red(message));
    }

    public static LOG(message: string){
        console.log(colors.white(message));
    }
}

export default Logger;