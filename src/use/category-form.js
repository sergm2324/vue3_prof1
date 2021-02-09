import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useCategoryForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
  })

  const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
    'title',
    yup.string()
      .trim()
      .required('Введите название товара')
  )
  const {value: type, errorMessage: cError, handleBlur: cBlur} = useField(
      'type',
      yup.string()
          .trim()
          .required('Введите категорию')
  )

  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting,
    onSubmit,
    title,
    tBlur,
    tError,
    type,
    cBlur,
    cError,
  }
}
