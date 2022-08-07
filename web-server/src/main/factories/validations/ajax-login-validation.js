import * as yup from "yup";

export const AjaxLoginValidation = yup.object()
    .shape({
        u: yup.string()
            .required("username is required"),
        p: yup.string()
            .required("password is required"),
        r: yup.string()
            .required("password is required")
    })