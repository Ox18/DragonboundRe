export * from "./http-status-code"
export * from "./response-generic"

export const RESPONSE_CHECKNAME = Object.freeze({
    NAME_EXIST: "Name Exists",
    OK: "OK",
    BAD_NAME: "Bad Name"
})

export const GENDER_IN_LETTER = Object.freeze({
    MALE: "m",
    FEMALE: "f"
});

export const GENDER_IN_LETTER_VALID_GROUP = Object.freeze([
    GENDER_IN_LETTER.FEMALE, GENDER_IN_LETTER.MALE
]);

export const NAME_MIN_LETTER = 2;
export const NAME_MAX_LETTER = 15;

export const PASSWORD_MIN_LETTER = 6;
export const PASSWORD_MAX_LETTER = 70;

export const VERSION_GAME = 133;