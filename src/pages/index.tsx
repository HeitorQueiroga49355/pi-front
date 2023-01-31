import React from 'react'
import Header from '../components/organism/Header'
import HomePageTitle from '../components/molecules/HomePageTitle'
import SlideEmphasisArticles from '../components/organism/SlideEmphasisArticles'
import PaginationArticles from '../components/organism/PaginationArticles'
import Footer from '../components/organism/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <HomePageTitle />
      <SlideEmphasisArticles />
      <PaginationArticles />
      <Footer />
    </>
  )
}
