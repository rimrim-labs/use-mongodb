import { date, number, object, setLocale, string } from 'yup'

setLocale({
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

export const CreateItemSchema = object({
  id: number().integer().positive().required(),
  name: string().required(),
  remain: number().integer().positive().required(),
  price: number().integer().positive().required(),
  owner: string().required(),
  createdAt: date().required(),
})
