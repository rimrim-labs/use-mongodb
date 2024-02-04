import axios, { AxiosError } from 'axios'
import BaseError from '../../errors/BaseError'
import IllegalStateError from '../../errors/IllegalStateError'
import ServerError from '../../errors/ServerError'

interface ServeErrorResponse {
  code: string
  message: string
}

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://localhost:9000/api',
  timeout: 3000,
})

const errorHandler = (error: AxiosError<ServeErrorResponse>) => {
  let externalError: BaseError = new ServerError('문제가 생겼습니다. 다시 시도해주세요.')

  // 타임아웃
  if (error.code === 'ECONNABORTED') {
    return Promise.reject(externalError)
  }

  // 존재하지 않는 id
  if (error.response && error.response.data.code === 'NotFound') {
    externalError = new IllegalStateError('존재하지 않습니다.')
  }

  return Promise.reject(externalError)
}

instance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error)
)
