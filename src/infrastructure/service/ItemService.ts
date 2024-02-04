import { instance } from './axiosConfig'

interface FetchItemResponse {
  id: number
  name: string
  price: number
}

export const getItemDetail = (id: number) => {
  return instance.get<FetchItemResponse>(`/items/${id}`)
}
