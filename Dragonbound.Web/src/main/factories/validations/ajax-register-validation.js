import * as yup from "yup"
import { GENDER_IN_LETTER_VALID_GROUP, NAME_MAX_LETTER, NAME_MIN_LETTER, PASSWORD_MAX_LETTER, PASSWORD_MIN_LETTER } from "../../../consts"

export const AjaxRegisterValidation = yup.object().shape({
    name: yup.string()
        .min(NAME_MIN_LETTER)
        .max(NAME_MAX_LETTER)
        .required("Name is required"),
    password: yup.string()
        .min(PASSWORD_MIN_LETTER)
        .max(PASSWORD_MAX_LETTER)
        .required("Password is required"),
    gender: yup.string().oneOf(GENDER_IN_LETTER_VALID_GROUP, "El genero seleccionado no es valido")
        .required("Gender is required")
})