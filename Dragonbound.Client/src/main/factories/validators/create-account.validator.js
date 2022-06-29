import * as yup from "yup";

export default yup.object().shape({
    name: yup.string().required().min(6).max(70),
    password: yup.string().required().min(6).max(15),
    gender: yup.string().required().min(1).max(1)
        .test("validate type", "Only 'm' or 'f'", val => ["m", "f"].includes(val))
})