import React from 'react'
import EditDocumentContent from '../../components/organism/EditDocumentContent'
import Footer from '../../components/organism/Footer'
import Header from '../../components/organism/Header'
import { GetServerSidePropsContext } from 'next'
import { getArticleData } from '../../services/articles'
import Head from 'next/head'

interface IEditDocument {
  initialArticleData: any
}

export default function EditDocument({ initialArticleData }: IEditDocument) {
  return (
    <>
      <Head>
        <title>Editar artigo</title>
      </Head>
      <Header />
      <EditDocumentContent
        initialArticleData={initialArticleData}
        isEditingPage
      />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const initialArticleData = await getArticleData(query.slug.toString())
  return {
    props: { initialArticleData }
  }
}
