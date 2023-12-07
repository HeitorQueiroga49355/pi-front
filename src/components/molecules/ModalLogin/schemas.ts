import * as Yup from 'yup'

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Preencha o campo'),
  lastName: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Preencha o campo'),
  username: Yup.string().required('preencha o campo'),
  email: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .email('Formato de E-mail inválido')
    .required(),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Senhas devem ser iguais'
  )
})

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .email('Formato de E-mail inválido')
    .required(),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .required()
})
