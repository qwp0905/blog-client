import axios from 'axios'
import { RequestMethod } from '../@types/http'
import { ResponseBase } from '../common/interfaces/http.interface'
import { toast } from '../common/utils/popup'
import { store } from '../store'
import { deleteInfo, updateInfo } from '../store/slices/auth.slice'

export const requestGet = (url: string) => {
  return executeRequest('get', url)
}

export const requestPost = (url: string, body?: any) => {
  return executeRequest('post', url, body)
}

export const requestPut = (url: string, body?: any) => {
  return executeRequest('put', url, body)
}

export const requestPatch = (url: string, body?: any) => {
  return executeRequest('patch', url, body)
}

export const requestDelete = (url: string) => {
  return executeRequest('delete', url)
}

export const requestForm = (url: string, data: FormData) => {
  return executeRequest('post', url, data, { 'Content-Type': 'multipart/form-data' })
}

const request = async (method: RequestMethod, url: string, body?: any, headers?: any) => {
  const { data } = await axios.request({
    method,
    url: process.env.REACT_APP_SERVER_HOST + url,
    data: body,
    headers: {
      ...headers,
      'X-Account-Origin': `${store.getState().authSlice.origin}`,
      Authorization: `Bearer ${store.getState().authSlice.access_token}`
    }
  })
  return data as ResponseBase<any>
}

const executeRequest = async (
  method: RequestMethod,
  url: string,
  body?: any,
  headers?: any
) => {
  try {
    const { code, result, message, data } = await request(method, url, body, headers)

    if (result) {
      return data ?? true
    }

    if (code === 401) {
      const access_token = await refreshToken()
      store.dispatch(updateInfo({ access_token }))

      const { result, message, data } = await request(method, url, body, headers)

      if (result) {
        return data ?? true
      }
      toast.error(message)
      return null
    } else {
      toast.error(message)
      return null
    }
  } catch (err: any) {
    return toast.error(err.message)
  }
}

const refreshToken = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_SERVER_HOST}/account/refresh`,
    {
      headers: {
        'X-Account-Origin': `${store.getState().authSlice.origin}`,
        Authorization: `Bearer ${store.getState().authSlice.refresh_token}`
      }
    }
  )

  const { result, data: token }: ResponseBase<any> = data
  if (!result) {
    store.dispatch(deleteInfo())
    throw new Error('다시 로그인해주세요')
  }

  return token
}
