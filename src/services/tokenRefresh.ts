import { parseCookies, setCookie } from 'nookies'
import { baseClientApi } from './baseAxios'

export async function tokenRefresh() {
  try {
    const cookies = parseCookies()
    const res = await baseClientApi.post('autenticacao/token/refresh/', {
      refresh: cookies[process.env.NEXT_PUBLIC_COOKIE_REFRESH as string]
    })
    saveTokensInCookies(res.data)
    return res.data.access
  } catch (_) {
    return null
  }
}

export function saveTokensInCookies(tokens: {
  access: string
  refresh: string
}) {
  setCookie(
    null,
    process.env.NEXT_PUBLIC_COOKIE_ACCESS as string,
    tokens.access,
    {
      maxAge: 60 * 60,
      path: '/'
    }
  )
  setCookie(
    null,
    process.env.NEXT_PUBLIC_COOKIE_REFRESH as string,
    tokens.refresh,
    {
      maxAge: 60 * 60 * 24 * 15,
      path: '/'
    }
  )
}
