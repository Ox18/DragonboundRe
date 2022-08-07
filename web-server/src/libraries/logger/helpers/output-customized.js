import { generateTimestamp } from "./generate-timestamp";

export const outputCustomized = (message, colorFont, typeLogger, typeOutput) => console.log(colorFont, `[${generateTimestamp()}] [${typeLogger}] ${message}`, typeOutput);