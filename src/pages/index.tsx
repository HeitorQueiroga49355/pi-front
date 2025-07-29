import React, { useEffect } from 'react'
import Header from '../components/organism/Header'
import HomePageTitle from '../components/molecules/HomePageTitle'
import SlideEmphasisArticles from '../components/organism/SlideEmphasisArticles'
import PaginationArticles from '../components/organism/PaginationArticles'
import Footer from '../components/organism/Footer'
import { GetServerSidePropsContext } from 'next'
import { getArticles, getEmphasisArticles } from '../services/articles'
import Head from 'next/head'

interface IHome {
  articles: any
  emphasisArticles: any
}

export default function Home({ articles, emphasisArticles }: IHome) {
  return (
    <>
      <Head>
        <title>Página inicial</title>
      </Head>
      <Header />
      <HomePageTitle />
      <SlideEmphasisArticles emphasisArticles={emphasisArticles} />
      <PaginationArticles articlesList={articles} />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const currentPageObject = query.page
    ? { limit: 20, offset: (parseInt(query.page.toString()) - 1) * 20 }
    : { limit: 20, offset: 0 }
  const articles = await getArticles(currentPageObject)
  if (articles.results.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const emphasisArticles = await getEmphasisArticles()
  return {
    props: {
      articles,
      emphasisArticles
    }
  }
}
