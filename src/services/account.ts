import axios from 'axios'
import { URL } from './articles'
import nookies, { parseCookies, destroyCookie, setCookie } from 'nookies'
import { Dispatch, SetStateAction, useContext } from 'react'
import { userContext } from '../contexts/userDataContext'

const [access, refresh] = [
  process.env.NEXT_PUBLIC_COOKIE_ACCESS,
  process.env.NEXT_PUBLIC_COOKIE_REFRESH
]

export async function submitLogin(
  data: { email?: string; password?: string },
  setUserData: Dispatch<SetStateAction<any>>
) {
  await axios.post(`${URL}api/token/`, data).then(res => {
    nookies.set(null, process.env.NEXT_PUBLIC_COOKIE_ACCESS, res.data.access)
    nookies.set(null, process.env.NEXT_PUBLIC_COOKIE_REFRESH, res.data.refresh)
    getMeData(setUserData).then(res => {
      setUserData(res)
    })
  })
}

export async function getMeData(setUserData: Dispatch<SetStateAction<any>>) {
  const cookies = parseCookies()
  return axios
    .get(`${URL}api/v1/user/me`, {
      headers: { Authorization: `Bearer ${cookies[access]}` }
    })
    .then(res => {
      return res.data
    })
    .catch(async res => {
      if (res.response.status === 401) {
        const newTokenAccess = await refreshToken(setUserData)
        if (!newTokenAccess) {
          destroyCookie(null, access)
          destroyCookie(null, refresh)
          return
        }
        return await axios
          .get(`${URL}api/v1/user/me`, {
            headers: { Authorization: `Bearer ${newTokenAccess}` }
          })
          .then(res => {
            return res.data
          })
      }
    })
}

export async function refreshToken(setUserData: Dispatch<SetStateAction<any>>) {
  const cookies = parseCookies()
  return axios
    .post(`${URL}api/token/refresh/`, { refresh: cookies[refresh] })
    .then(res => {
      setCookie(null, access, res.data.access)
      return res.data.access
    })
    .catch(() => {
      destroyCookie(null, access)
      destroyCookie(null, refresh)
      setUserData({})
    })
}

export async function getAuthorData(slug: string) {
  return axios.get(`${URL}api/v1/user/${slug}/`).then(res => res.data)
}

export async function updateBiography(content, setUserData) {
  const cookies = parseCookies()
  return await axios
    .patch(
      `${URL}api/v1/user/me`,
      {
        biography: content
      },
      {
        headers: { Authorization: `Bearer ${cookies[access]}` }
      }
    )
    .catch(async res => {
      if (res.response.status === 401) {
        const newTokenAccess = await refreshToken(setUserData)
        if (!newTokenAccess) {
          destroyCookie(null, access)
          destroyCookie(null, refresh)
          return
        }
        return await axios
          .patch(
            `${URL}api/v1/user/me`,
            { biography: content },
            {
              headers: { Authorization: `Bearer ${newTokenAccess}` }
            }
          )
          .then(res => {
            return res.data
          })
      }
    })
}
