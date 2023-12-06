import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import DefaultBackgroundAuthorProfile from '../../../../public/assets/imgs/devlopImages/DefaultBackgroundAuthorProfile.png'
import VerifiedIcon from '../../../../public/assets/icons/VerifiedIcon.svg'
import useGetWidth from '../../../hooks/useGetWidth'
import { userContext } from '../../../contexts/userDataContext'
import { updateBiography } from '../../../services/account'

interface IAuthorDataSection {
  authorData: any
  countArticle: number
}

export default function AuthorDataSection({
  authorData,
  countArticle
}: IAuthorDataSection) {
  const width = useGetWidth()
  const [editDescription, setEditDescription] = useState(false)
  const [monthJoined, setMonthJoined] = useState('')
  const { userData, setUserData } = useContext(userContext)

  useEffect(() => {
    setMonthJoined(getFormatMonth())
  }, [])

  function getFormatMonth() {
    const option = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const locale = 'pt-br'
    const date = new Date(authorData.date_joined)
    return date.toLocaleDateString(locale, option as any)
  }
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
            <Image
              src={authorData.image_profile}
              alt="Author profile image"
              fill
            />
          </div>
          <div className="author-name">
            <div className="container">
              <h2>
                {`${authorData.first_name} ${authorData.last_name}`}
                {authorData.is_staff && (
                  <Image
                    src={VerifiedIcon}
                    alt="Verified icon"
                    width={width <= 480 ? 30 : 37}
                    height={width <= 480 ? 30 : 37}
                  />
                )}
              </h2>
              {authorData.is_staff && (
                <span>Perfil verificado pela equipe Paglaum</span>
              )}
            </div>
          </div>
        </StyledAuthorData>
      </StyledSection>
      <StyledDescriptionSection>
        <div className="container-description">
          <div className="activity">
            <p className="activity-p">👋 Entrou em {monthJoined}</p>
            <p className="activity-p">📝 {countArticle} artigos publicados</p>
            {/* <p className="activity-p">❤ 1534 Reações</p> */}
          </div>
          <div>
            {userData?.id === authorData.id && (
              <button
                onClick={() => {
                  const biographyCamp = document.getElementById('description')
                  setEditDescription(!editDescription)
                  if (editDescription) {
                    updateBiography(biographyCamp.innerHTML, setUserData)
                  } else {
                    setTimeout(() => {
                      biographyCamp.focus()
                    }, 100)
                  }
                }}
              >
                {editDescription ? 'Salvar' : 'Editar descrição do perfil'}
              </button>
            )}
            <p
              id="description"
              className="description"
              contentEditable={editDescription}
            >
              {authorData.biography}
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
    width: 100%;
    height: 240px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
`

const StyledAuthorData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div.author-image {
    width: 160px;
    height: 160px;

    position: relative;

    overflow: hidden;

    border-radius: 100%;
    border: solid #d9d9d9 5px;

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
