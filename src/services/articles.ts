import axios from 'axios'

export const URL = process.env.NEXT_PUBLIC_BACK_URL

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
