import * as yup from 'yup';

export default yup.object().shape({
    name: yup.string().required().min(6).max(15)
});