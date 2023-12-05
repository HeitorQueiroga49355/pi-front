import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import ArticleMainImage from '../../../../public/assets/imgs/devlopImages/ArticleMainImage.png'
import AuthorImage from '../../../../public/assets/imgs/devlopImages/AuthorImage.png'

interface ICardArticle {
  articleData: any
}

export default function CardArticle({ articleData }: ICardArticle) {
  return (
    <CardWrapper>
      <WrapperImage>
        <Link href={`/artigo/${articleData.id}`}>
          <Image
            className="front-cover-article"
            alt="Capa do artigo"
            src={articleData.cover_image}
            quality={50}
            fill
          />
        </Link>
      </WrapperImage>
      <DataArticle>
        <Link href={`/artigo/${articleData.id}`}>
          <h4>{articleData.title}</h4>
          <p>{articleData.subtitle}</p>
        </Link>
        <DataAuthor>
          <Image
            className="author-image"
            src={articleData.author.image_profile}
            alt="Foto do autor do artigo"
            width={25}
            height={25}
          />
          <Link href="/autor/exemplo">Heitor Queiroga</Link>
        </DataAuthor>
        <PostDate>19 de Setembro de 2022</PostDate>
      </DataArticle>
    </CardWrapper>
  )
}

const WrapperImage = styled.div`
  position: relative;
  overflow: hidden;
  width: 338px;
  height: 151px;
  border-radius: 8px 8px 0 0;

  img.front-cover-article {
    object-fit: cover;
  }

  @media (max-width: 1160px) {
    width: 280px;
  }

  @media (max-width: 1000px) {
    width: 240px;
  }

  @media (max-width: 880px) {
    width: 320px;
  }

  @media (max-width: 730px) {
    width: 280px;
  }

  @media (max-width: 600px) {
    width: 240px;
  }

  @media (max-width: 510px) {
    width: 320px;
  }
`
const DataArticle = styled.div`
  width: 338px;
  height: 164px;

  border-radius: 0 0 8px 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);

  font-family: Poppins;

  padding: 13px 0 4px 14px;

  p,
  h4 {
    width: 92%;

    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;
  }

  h4 {
    height: 42px;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
  }

  p {
    height: 32px;

    font-family: Poppins;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;

    color: #545454;

    margin: 9px 0 0 0;
  }
  @media (max-width: 1160px) {
    width: 280px;
  }

  @media (max-width: 1000px) {
    width: 240px;
  }

  @media (max-width: 880px) {
    width: 320px;
  }

  @media (max-width: 730px) {
    width: 280px;
  }
  @media (max-width: 880px) {
    width: 320px;
  }

  @media (max-width: 730px) {
    width: 280px;
  }

  @media (max-width: 600px) {
    width: 240px;
  }

  @media (max-width: 510px) {
    width: 320px;
  }
`

const DataAuthor = styled.div`
  margin: 12px 0 0 0;

  display: flex;

  img.author-image {
    border-radius: 100%;
  }

  a {
    font-family: Poppins;
    font-weight: 500;
    font-size: 11px;

    height: 25px;

    margin: 0 0 0 8px;

    display: flex;
    align-items: center;
  }
`

const PostDate = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  margin: 9px 0 0 0;

  color: #000;
`

const CardWrapper = styled.div`
  cursor: pointer;
  width: max-content;

  a {
    color: #000;
    text-decoration: none;
  }
`
