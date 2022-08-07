import { COLORS, TYPE_OUPUT, TYPE_ERROR } from "./consts";
import { outputCustomized } from "./helpers/output-customized";

export class Logger {
    static ERROR(message) {
        this.GENERIC(message, COLORS.RED, TYPE_ERROR.ERROR);
    }

    static WARN(message) {
        this.GENERIC(message, COLORS.YELLOW, TYPE_ERROR.WARN);
    }

    static INFO(message) {
        this.GENERIC(message, COLORS.GREEN, TYPE_ERROR.INFO);
    }

    static DEBUG(message) {
        this.GENERIC(message, COLORS.CYAN, TYPE_ERROR.DEBUG);
    }

    static LOG(message) {
        this.GENERIC(message, COLORS.WHITE, TYPE_ERROR.LOG);
    }

    static GENERIC(message, color, type) {
        outputCustomized(message, color, type, TYPE_OUPUT.RESET);
    }
}