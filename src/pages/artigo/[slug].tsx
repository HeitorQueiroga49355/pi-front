import React from 'react'
import Footer from '../../components/organism/Footer'
import Header from '../../components/organism/Header'
import TemplateArticle from '../../components/templates/TemplateArticle'
import { GetServerSidePropsContext } from 'next'
import { getArticleData, getArticles } from '../../services/articles'

interface IArticle {
  articleData: any
  recentArticles: any
}

export default function Article({ articleData, recentArticles }: IArticle) {
  return (
    <>
      <Header />
      <TemplateArticle
        articleData={articleData}
        recentArticles={recentArticles}
      />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query
  const articleData = await getArticleData(slug.toString())
  const recentArticles = await getArticles({ limit: 10, offset: 0 })

  return {
    props: {
      articleData,
      recentArticles
    }
  }
}
