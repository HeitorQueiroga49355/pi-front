import React from 'react'
import EditDocumentContent from '../components/organism/EditDocumentContent'
import Footer from '../components/organism/Footer'
import Header from '../components/organism/Header'
import Head from 'next/head'

export default function EditDocument() {
  return (
    <>
      <Head>
        <title>Criar artigo</title>
      </Head>
      <Header />
      <EditDocumentContent />
      <Footer />
    </>
  )
}
