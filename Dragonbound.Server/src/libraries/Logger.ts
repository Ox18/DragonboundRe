import colors from 'colors';

class Logger{
    public static INFO(message: string){
        console.log(colors.green("[INFO] " + message));
    }

    public static ERROR(message: string){
        console.log(colors.red("[ERROR] " + message));
    }

    public static WARNING(message: string){
        console.log(colors.yellow("[WARNING] " + message));
    }

    public static DEBUG(message: string){
        console.log(colors.blue("[DEBUG] " + message));
    }

    public static SUCCESS(message: string){
        console.log(colors.green("[SUCCESS] " + message));
    }

    public static FAIL(message: string){
        console.log(colors.red("[FAIL] " + message));
    }

    public static LOG(message: string){
        console.log(colors.white("[LOG] " + message));
    }
}

export default Logger;