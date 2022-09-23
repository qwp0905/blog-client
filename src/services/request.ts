import axios from 'axios'
import { ResponseBase } from '../common/interfaces/http.interface'
import { toast } from '../common/utils/popup'
import { store } from '../store'

const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  timeout: 120000
})

request.interceptors.request.use(
  (config) => {
    const access_token = store.getState().authSlice?.access_token
    config.headers = { ...config.headers, Authorization: `Bearer ${access_token}` }
    return config
  },
  (err) => {
    return toast.error(err.message)
  }
)

request.interceptors.response.use(
  ({ data }) => {
    const { result, message, data: real_data }: ResponseBase<any> = data
    if (result) {
      return real_data || true
    } else {
      toast.error(message)
      return null
    }
  },
  (err) => {
    return toast.error(err.message)
  }
)

export const getJson = async (url: string): Promise<any> => {
  return request({ url, method: 'get' })
}

export const postJson = async (url: string, data: any = {}): Promise<any> => {
  return request({ url, method: 'post', data })
}

export const putJson = async (url: string, data: any = {}): Promise<any> => {
  return request({ url, data, method: 'put' })
}

export const patchJson = async (url: string, data: any = {}): Promise<any> => {
  return request({ url, data, method: 'patch' })
}

export const deleteJson = async (url: string): Promise<any> => {
  return request({ url, method: 'delete' })
}

export const formJson = async (url: string, data: FormData) => {
  return request({
    url,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post'
  })
}
