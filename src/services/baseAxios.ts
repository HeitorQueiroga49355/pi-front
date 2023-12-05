import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { tokenRefresh } from './tokenRefresh'

const tokenAccess =
  parseCookies()[process.env.NEXT_PUBLIC_COOKIE_ACCESS as string]
let isRefreshing = false
let failedRequestQueue: any = []

export const baseClientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
  headers: {
    Authorization: `Bearer ${tokenAccess}`
  }
})

baseClientApi.interceptors.request.use(async (req: any) => {
  req.headers.Authorization = `Bearer ${
    parseCookies()[process.env.NEXT_PUBLIC_COOKIE_ACCESS as string]
  }`
  return req
})

baseClientApi.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    if (error.response.status === 401) {
      const originalConfig = error.config
      if (!isRefreshing) {
        isRefreshing = true

        tokenRefresh()
          .then(res => {
            baseClientApi.defaults.headers.common = {
              Authorization: `Bearer ${
                parseCookies()[process.env.NEXT_PUBLIC_COOKIE_ACCESS as string]
              }`
            }
            originalConfig.headers.Authorization = `Bearer ${res}`
            baseClientApi(originalConfig)

            failedRequestQueue.forEach((resquest: any) =>
              resquest.onSuccess(res)
            )
            failedRequestQueue = []
          })
          .catch(() => {
            failedRequestQueue.forEach((onFailure: any) => onFailure(error))
            failedRequestQueue = []
          })
          .finally(() => {
            isRefreshing = false
          })
      } else {
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`
              resolve(baseClientApi(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      }
    }
    throw error
  }
)
