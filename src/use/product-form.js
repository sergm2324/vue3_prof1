import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useProductForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      cat: 'fruit'
    }
  })

  const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
    'title',
    yup.string()
      .trim()
      .required('Введите название продукта')
  )
  const {value: img, errorMessage: iError, handleBlur: iBlur} = useField(
    'img',
    yup.string()
      .trim()
      .required('Изображение не выбрано')
  )
  const {value: price, errorMessage: pError, handleBlur: pBlur} = useField(
    'price',
    yup.number()
      .required('Введите цену')
      .min(0, 'Цена не может быть меньше 0')
  )
  const {value: count, errorMessage: cError, handleBlur: cBlur} = useField(
      'count',
      yup.number()
          .required('Введите количество')
          .min(0, 'Количество не может быть меньше 0')
  )
  const {value: cat} = useField('cat')

  const onSubmit = handleSubmit(fn)

  return {
    status,
    isSubmitting,
    onSubmit,
    title,
    tBlur,
    tError,
    img,
    iError,
    iBlur,
    price,
    pError,
    pBlur,
    count,
    cError,
    cBlur,
    cat
  }
}
