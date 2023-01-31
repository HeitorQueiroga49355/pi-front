import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import DefaultBackgroundAuthorProfile from '../../../../public/assets/imgs/devlopImages/DefaultBackgroundAuthorProfile.png'
import AuthorImage from '../../../../public/assets/imgs/devlopImages/AuthorImage.png'
import VerifiedIcon from '../../../../public/assets/icons/VerifiedIcon.svg'
import useGetWidth from '../../../hooks/useGetWidth'

export default function AuthorDataSection() {
  const width = useGetWidth()
  const [editDescription, setEditDescription] = useState(false)
  return (
    <>
      <StyledSection>
        <div className="background-image">
          <Image
            alt="Background user profile"
            src={DefaultBackgroundAuthorProfile}
          />
        </div>
        <StyledAuthorData>
          <div className="author-image">
            <Image src={AuthorImage} alt="Author profile image" />
          </div>
          <div className="author-name">
            <div className="container">
              <h2>
                Heitor Queiroga Duarte
                <Image
                  src={VerifiedIcon}
                  alt="Verified icon"
                  width={width <= 480 ? 30 : 37}
                  height={width <= 480 ? 30 : 37}
                />
              </h2>
              <span>Perfil verificado pela equipe Paglaum</span>
            </div>
          </div>
        </StyledAuthorData>
      </StyledSection>
      <StyledDescriptionSection>
        <div className="container-description">
          <div className="activity">
            <p className="activity-p">👋 Entrou em 2 de outubro de 2022</p>
            <p className="activity-p">📝 5 artigos publicados</p>
            <p className="activity-p">❤ 1534 Reações</p>
          </div>
          <div>
            <button
              onClick={() => {
                setEditDescription(!editDescription)
                setTimeout(() => {
                  const description = document.getElementById('description')
                  description.focus()
                }, 100)
              }}
            >
              {editDescription ? 'Salvar' : 'Editar descrição do perfil'}
            </button>
            <p
              id="description"
              className="description"
              contentEditable={editDescription}
            >
              Desenvolvedor front-end, solidity e rust para smart-contracts
              solana. Estudante do Instituto federal do Rio Grande do Norte
              (IFRN). Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </StyledDescriptionSection>
    </>
  )
}

const StyledSection = styled.section`
  width: 100%;
  height: max-content;

  border: 1px solid #eef2f5;

  margin: 0 0 16px 0;

  div.background-image {
    height: 240px;
    overflow: hidden;
  }
`

const StyledAuthorData = styled.div`
  div.author-image > img {
    width: 160px;
    height: 160px;

    border-radius: 100%;
    border: solid #d9d9d9 5px;
  }
  div.author-image {
    width: 100%;

    display: flex;
    justify-content: center;

    margin: -40px 0 0 0;
  }

  h2 {
    margin: 16px 0 0 0;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
  }

  h2 > img {
    margin: 0 0 0 8px;
  }

  span {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    width: 100%;
  }

  div.container {
    width: max-content;
  }

  div.author-name {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 28px;
      line-height: 40px;
    }
  }

  @media (max-width: 480px) {
    div.container {
      width: 90%;
    }
  }
`

const StyledDescriptionSection = styled.section`
  display: flex;
  justify-content: center;

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;

  color: #000000;

  div.container-description {
    display: flex;
    justify-content: center;
  }

  p.activity-p + p.activity-p {
    margin: 24px 0 0 0;
  }

  div.activity {
    margin: 0 40px 0 0;
  }

  p.description {
    max-width: 789px;
  }

  button {
    background: #340647;
    border: 1px solid #340647;
    border-radius: 8px;

    color: #f8e8e7;
    font-weight: 500;

    padding: 12px 8px;
    margin: 0 0 16px 0;
  }

  @media (max-width: 1240px) {
    p.description {
      max-width: 600px;
    }
  }

  @media (max-width: 1024px) {
    div.container-description {
      flex-direction: column;
      align-items: center;
      width: 90%;
    }

    div.activity {
      margin: 0 0 24px 0;
    }
  }
`
