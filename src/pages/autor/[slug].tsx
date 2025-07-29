import React from 'react'
import AuthorDataSection from '../../components/organism/AuthorDataSection'
import Footer from '../../components/organism/Footer'
import Header from '../../components/organism/Header'
import InfinityScrollArticles from '../../components/organism/PaginationArticles'
import { GetServerSidePropsContext } from 'next'
import { getArticlesPerAuthor } from '../../services/articles'
import { getAuthorData } from '../../services/account'
import Head from 'next/head'

interface IAuthor {
  articles: any
  authorData: any
}

export default function Author({ articles, authorData }: IAuthor) {
  return (
    <>
      <Head>
        <title>{authorData.username}</title>
      </Head>
      <Header />
      <AuthorDataSection
        countArticle={articles.count}
        authorData={authorData}
      />
      <InfinityScrollArticles articlesList={articles} />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const currentPageObject = query.page
    ? { limit: 20, offset: (parseInt(query.page.toString()) - 1) * 20 }
    : { limit: 20, offset: 0 }

  const promises = [
    getArticlesPerAuthor(query.slug.toString(), currentPageObject),
    getAuthorData(query.slug.toString())
  ]
  const [articles, authorData] = await Promise.all(promises)
  return {
    props: {
      articles,
      authorData
    }
  }
}
