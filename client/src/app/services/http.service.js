import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const { isFireBase, apiEndpointFireBase, apiEndpointMongoDb } = configFile

//создание instance или экземпляра axios с необходимой конфигурацией
const http = axios.create({
  baseURL: isFireBase ? apiEndpointFireBase : apiEndpointMongoDb
})

//изменение стандартной конфигурации axios
//axios.defaults.baseURL = isFireBase ? apiEndpointFireBase : apiEndpointMongoDb

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getExpiresKeyToken()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresDate < Date.now()

    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

      if (isExpired) {
        const data = await authService.refresh()
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in,
          idToken: data.id_token,
          localId: data.user_id
        })
      }

      const accessToken = localStorageService.getAccessToken()

      if (accessToken) config.params = { ...config.params, auth: accessToken }
    } else {
      if (isExpired) {
        const data = await authService.refresh()
        localStorageService.setTokens(data)
      }
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`
        }
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : data
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) }
    } else {
      res.data = { content: res.data }
    }
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedErrors) {
      console.log(error)
      toast.error('Something was wrong. Try later.')
    }
    return Promise.reject(error)
  }
)

export const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
}
