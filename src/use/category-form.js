import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useCategoryForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
    'title',
    yup.string()
      .trim()
      .required('Введите название товара')
  )
  const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
    'phone',
    yup.string()
      .trim()
      .required('Телефон не может быть пустым')
  )
  const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
    'amount',
    yup.number()
      .required('Введите сумму')
      .min(0, 'Сумма не может быть меньше 0')
  )
  const {value: status} = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    status,
    isSubmitting,
    onSubmit,
    title,
    tBlur,
    tError,
    phone,
    amount,
    pError,
    pBlur,
    aError,
    aBlur
  }
}
