import React from 'react'
import AuthorDataSection from '../../components/organism/AuthorDataSection'
import Footer from '../../components/organism/Footer'
import Header from '../../components/organism/Header'
import InfinityScrollArticles from '../../components/organism/PaginationArticles'

export default function Author() {
  return (
    <>
      <Header />
      <AuthorDataSection />
      {/* <InfinityScrollArticles /> */}
      <Footer />
    </>
  )
}
