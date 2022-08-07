import * as yup from "yup"
import { NAME_MAX_LETTER, NAME_MIN_LETTER } from "../../../consts"

export const ChecknameValidation = yup.object().shape({
    name: yup.string()
        .min(NAME_MIN_LETTER)
        .max(NAME_MAX_LETTER)
        .required("Name is required"),
})