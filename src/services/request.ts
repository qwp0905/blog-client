import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  timeout: 120000
})

request.interceptors.request.use((config) => {
  const { access_token } = useSelector((state: RootState) => state.authSlice)
  config.headers = { Authorization: access_token! }
  return config
})

request.interceptors.response.use(
  ({ data }) => {
    return data
  },
  (err) => {
    return { result: false, message: err.message }
  }
)

export const getJson = async (url: string): Promise<any> => {
  return request({ url, method: 'get' })
}

export const postJson = async (url: string, data: any): Promise<any> => {
  return request({ url, method: 'post', data })
}

export const putJson = async (url: string, data: any): Promise<any> => {
  return request({ url, data, method: 'put' })
}

export const patchJson = async (url: string, data: any): Promise<any> => {
  return request({ url, data, method: 'patch' })
}

export const deleteJson = async (url: string): Promise<any> => {
  return request({ url, method: 'delete' })
}
