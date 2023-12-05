import React, { useEffect } from 'react'
import styled from 'styled-components'
import CardArticle from '../../molecules/CardArticle'
import { useRouter } from 'next/router'

interface IInfinityScrollArticles {
  articlesList: any
}

export default function InfinityScrollArticles({
  articlesList
}: IInfinityScrollArticles) {
  const router = useRouter()

  useEffect(() => {
    if (router.query.page) {
      window.scrollTo(0, 438)
    }
  }, [router.query.page])

  function getArrayOfNumberOfPages() {
    const array = []
    // const qunt_
    for (let i = 0; i < articlesList.count / 20; i++) {
      array.push(i + 1)
    }
    return array
  }

  return (
    <Section>
      <Main>
        {articlesList.results.map(element => {
          return <CardArticle key={element.id} articleData={element} />
        })}
      </Main>
      <ArticlePagination>
        <button className="selected">{'<'}</button>
        {getArrayOfNumberOfPages().map((element, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                router.push(`/?page=${element}`)
              }}
              className={
                !router.query.page && element === 1
                  ? 'selected'
                  : parseInt(router.query.page as string) === element
                  ? 'selected'
                  : ''
              }
            >
              {element}
            </button>
          )
        })}
        <button className="selected">{'>'}</button>
      </ArticlePagination>
    </Section>
  )
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  column-gap: 64px;
  row-gap: 56px;

  margin: 56px 0 56px 0;

  @media (max-width: 1160px) {
    column-gap: 48px;
    row-gap: 40px;
  }

  @media (max-width: 1000px) {
    margin: 20px 0 20px 0;
  }

  @media (max-width: 880px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 630px) {
    column-gap: 20px;
    row-gap: 20px;
  }

  @media (max-width: 510px) {
    grid-template-columns: 1fr;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`

const ArticlePagination = styled.div`
  display: flex;
  button {
    border: none;
    border-radius: 4px;
    cursor: pointer;

    width: 20px;
    height: 30px;

    font-size: 16px;
    color: #8a8a8a;

    margin: 0 8px 0 8px;

    background: #cec2cf;
    &.selected {
      color: #fff;
      width: 30px;
      background: #320848;
    }
  }
`
