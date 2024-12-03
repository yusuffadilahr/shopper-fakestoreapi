import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Harap diisi terlebih dahulu!'),
    password: Yup.string().required('Harap diisi terlebih dahulu!')
})