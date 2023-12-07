import axios from 'axios'
import { destroyCookie, parseCookies } from 'nookies'
import { refreshToken } from './account'

export const URL = process.env.NEXT_PUBLIC_BACK_URL
export const [accessVarName, refreshVarName] = [
  process.env.NEXT_PUBLIC_COOKIE_ACCESS,
  process.env.NEXT_PUBLIC_COOKIE_REFRESH
]

export async function getArticles(pagination?: {
  limit: number
  offset: number
}) {
  const articles = await axios.get(
    `${URL}api/v1/articles?${
      pagination ? `limit=${pagination.limit}&offset=${pagination.offset}` : ''
    }`
  )
  return articles.data
}

export async function getArticlesPerAuthor(
  author: string,
  pagination?: {
    limit: number
    offset: number
  }
) {
  const articles = await axios.get(
    `${URL}api/v1/author/${author}/articles?${
      pagination ? `limit=${pagination.limit}&offset=${pagination.offset}` : ''
    }`
  )
  return articles.data
}

export async function getEmphasisArticles() {
  const emphasisArticles = await axios.get(`${URL}api/v1/articles/emphasis/`)
  return emphasisArticles.data
}

export async function getArticleData(articleSlug: string) {
  const articleData = await axios.get(`${URL}api/v1/articles/${articleSlug}`)
  return articleData.data
}

export async function createArticle(data: any, setUserData) {
  const cookies = parseCookies()
  return await axios
    .post(`${URL}api/v1/articles/`, data, {
      headers: {
        Authorization: `Bearer ${cookies[accessVarName]}`
      }
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
          .post(`${URL}api/v1/articles/`, data, {
            headers: { Authorization: `Bearer ${newTokenAccess}` }
          })
          .then(res => {
            return res.data
          })
      }
    })
}

export async function updateArticle(data: any, articleId: string, setUserData) {
  const cookies = parseCookies()
  return await axios
    .patch(`${URL}api/v1/articles/${articleId}/`, data, {
      headers: {
        Authorization: `Bearer ${cookies[accessVarName]}`
      }
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
          .patch(`${URL}api/v1/articles/${articleId}/`, data, {
            headers: { Authorization: `Bearer ${newTokenAccess}` }
          })
          .then(res => {
            return res.data
          })
      }
    })
}
