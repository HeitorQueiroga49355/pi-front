import axios from 'axios'
import { URL, accessVarName, refreshVarName } from './articles'
import nookies, { parseCookies, destroyCookie, setCookie } from 'nookies'
import { Dispatch, SetStateAction } from 'react'

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
      headers: { Authorization: `Bearer ${cookies[accessVarName]}` }
    })
    .then(res => {
      return res.data
    })
    .catch(async res => {
      if (res.response.status === 401) {
        const newTokenAccess = await refreshToken(setUserData)
        if (!newTokenAccess) {
          destroyCookie(null, accessVarName)
          destroyCookie(null, refreshVarName)
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
    .post(`${URL}api/token/refresh/`, { refresh: cookies[refreshVarName] })
    .then(res => {
      setCookie(null, accessVarName, res.data.access)
      return res.data.access
    })
    .catch(() => {
      destroyCookie(null, accessVarName)
      destroyCookie(null, refreshVarName)
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
        headers: { Authorization: `Bearer ${cookies[accessVarName]}` }
      }
    )
    .catch(async res => {
      if (res.response.status === 401) {
        const newTokenAccess = await refreshToken(setUserData)
        if (!newTokenAccess) {
          destroyCookie(null, accessVarName)
          destroyCookie(null, refreshVarName)
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

export async function logout(setUserData) {
  setUserData({})
  destroyCookie(null, accessVarName)
  destroyCookie(null, refreshVarName)
}

export async function registerUser(data: any, setUserData) {
  return await axios.post(`${URL}api/v1/user/`, data).then(async res => {
    await submitLogin(
      {
        email: data.get('email'),
        password: data.get('password')
      },
      setUserData
    ).then(() => {
      sendConfirmationEmail(setUserData)
    })
  })
}

function sendConfirmationEmail(setUserData) {
  const cookies = parseCookies()
  axios
    .post(
      `${URL}api/v1/send-confirmation-email/`,
      {},
      {
        headers: { Authorization: `Bearer ${cookies[accessVarName]}` }
      }
    )
    .then(() => {
      alert('Valide a sua conta pelo email que acabamos de lhe enviar')
      setUserData({})
    })
    .catch(async res => {
      if (res.response.status === 401) {
        const newTokenAccess = await refreshToken(setUserData)
        if (!newTokenAccess) {
          destroyCookie(null, accessVarName)
          destroyCookie(null, refreshVarName)
          return
        }
        return await axios
          .post(
            `${URL}api/v1/send-confirmation-email/`,
            {},
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
