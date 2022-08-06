import axios from 'axios'

const base = process.env.REACT_APP_SERVER_HOST || 'http://localhost:3000'

export const getJson = async (url: string, token?: string) => {
  const { data } = await axios.get(
    base + url,
    token
      ? {
          headers: { Authorization: token }
        }
      : {}
  )
  return data
}

export const postJson = async (url: string, body: any, token?: string) => {
  const { data } = await axios.post(
    base + url,
    body,
    token
      ? {
          headers: { Authorization: token }
        }
      : {}
  )
  return data
}

export const putJson = async (url: string, body: any, token?: string) => {
  const { data } = await axios.put(
    base + url,
    body,
    token
      ? {
          headers: { Authorization: token }
        }
      : {}
  )
  return data
}

export const patchJson = async (url: string, body: any, token?: string) => {
  const { data } = await axios.patch(
    base + url,
    body,
    token
      ? {
          headers: { Authorization: token }
        }
      : {}
  )
  return data
}

export const deleteJson = async (url: string, token?: string) => {
  const { data } = await axios.delete(
    base + url,
    token
      ? {
          headers: { Authorization: token }
        }
      : {}
  )
  return data
}
