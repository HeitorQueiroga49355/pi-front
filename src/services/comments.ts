import axios from 'axios'
import { URL, accessVarName, refreshVarName } from './articles'
import { destroyCookie, parseCookies } from 'nookies'
import { refreshToken } from './account'

export async function getCommentsPerArticle(articleId: number) {
  const comments = await axios.get(`${URL}api/v1/article/${articleId}/comments`)
  return comments.data
}

export async function createComment(text, articleId, setUserData) {
  const cookies = parseCookies()
  return await axios
    .post(
      `${URL}api/v1/article/${articleId}/comments`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${cookies[accessVarName]}`
        }
      }
    )
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
          .post(
            `${URL}api/v1/article/${articleId}/comments`,
            { text },
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
