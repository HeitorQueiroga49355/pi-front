import React from 'react'
import styled from 'styled-components'
import VerifiedIcon from '../../../../public/assets/imgs/VerifiedIcon.png'
import Image from 'next/image'
import exampleContentArticle from './articleContentExample'
import AuthorImage from '../../../../public/assets/imgs/devlopImages/AuthorImage.png'

export default function TemplateArticle() {
  return (
    <StyledContainer>
      <div className="content-wrapper">
        <StyledMain>
          <h1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </h1>
          <StyledCreationData>
            <div>
              Por: Heitor Queiroga Duarte
              <Image
                alt="Ícone de verificado"
                src={VerifiedIcon}
                width={18}
                height={18}
                className="verified-icon"
              />
            </div>
            <div>Editado a última vez em: 01/10/2022</div>
          </StyledCreationData>
          <StyledContent dangerouslySetInnerHTML={exampleContentArticle} />
        </StyledMain>
        <StyledAside>
          <button>
            Doar para o autor<strong>{'>'}</strong>
          </button>
          <h3>Artigos recentes</h3>
          {[1, 2, 3, 4, 5, 6, 7].map((element, index) => {
            return (
              <StyledCardRecentArticle key={index}>
                <div className="title-article">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor
                </div>
                <div className="author">
                  <Image alt={'imagem do autor'} src={AuthorImage} />
                  Heitor Queiroga Duarte
                </div>
              </StyledCardRecentArticle>
            )
          })}
        </StyledAside>
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.section`
  width: 100%;

  display: flex;
  justify-content: center;

  margin: 40px 0 0 0;

  div.content-wrapper {
    width: max-content;

    position: relative;

    display: flex;
  }

  @media (max-width: 900px) {
    div.content-wrapper {
      width: 90%;
    }
  }
`

const StyledMain = styled.main`
  width: 750px;

  font-family: 'Poppins';
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
  color: #000000;

  h1 {
    margin: 0 0 8px 0;
  }

  @media (max-width: 1150px) {
    width: 600px;
  }

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 500px) {
    font-size: 22px;
  }
`
const StyledAside = styled.aside`
  width: 300px;

  margin: 0 0 0 50px;

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: #000000;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 160px;
    height: 45px;

    background: #340647;
    border: 1px solid #340647;
    border-radius: 8px;

    font-family: 'Poppins';
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;

    color: #f8e8e7;
  }

  strong {
    font-size: 25px;
    font-weight: 400;
  }

  @media (max-width: 1150px) {
    width: 200px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`

const StyledCreationData = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin: 0 0 10px 0;

  div {
    display: flex;
    align-items: center;

    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    color: #000000;
  }

  img.verified-icon {
    margin: 0 0 0 8px;
  }
`

const StyledContent = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;

  color: #000000;

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const StyledCardRecentArticle = styled.div`
  margin: 12px 0 0 0;

  cursor: pointer;
  text-decoration: none;

  div.title-article {
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;

    color: #000000;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;

    height: 54px;
  }

  div.author {
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;

    height: 24px;

    margin: 6px 0 0 0;

    display: flex;
    align-items: center;

    color: #000000;
  }

  img {
    width: 25px;
    height: 25px;

    border-radius: 100%;

    margin: 0 0.75rem 0 0;
  }
`
