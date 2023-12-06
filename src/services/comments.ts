import axios from 'axios'
import { URL } from './articles'

export async function getCommentsPerArticle(articleId: number) {
  const comments = await axios.get(`${URL}api/v1/article/${articleId}/comments`)
  return comments.data
}
