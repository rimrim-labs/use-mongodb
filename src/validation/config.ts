import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: (params) => `${params.path} 은(는) 필수 값입니다.`,
    notType: (params) => `${params.path} 은(는) ${params.type} 타입이어야 합니다.`,
  },
  number: {
    integer: (params) =>
      `${params.path} 은(는) 정수 값이어야 합니다. 주어진 값: ${params.originalValue}`,
    positive: (params) =>
      `${params.path} 은(는) 양수 값이어야 합니다. 주어진 값: ${params.originalValue}`,
  },
})

export default yup
