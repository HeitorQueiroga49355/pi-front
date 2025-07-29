import styled from 'styled-components'
import React, { useContext, useEffect, useState } from 'react'
import AuthorImage from '../../../../public/assets/imgs/devlopImages/AuthorImage.png'
import VerifiedIcon from '../../../../public/assets/imgs/VerifiedIcon.png'
import Image from 'next/image'
import {
  createComment,
  getCommentsPerArticle
} from '../../../services/comments'
import { useRouter } from 'next/router'
import { userContext } from '../../../contexts/userDataContext'

export function CommentsOnArticle() {
  const [commentList, setCommentList] = useState([])
  const router = useRouter()
  const { setUserData, userData } = useContext(userContext)

  useEffect(() => {
    getCommentsPerArticle(parseInt(router.query.slug.toString())).then(res => {
      setCommentList(res)
    })
  }, [])

  function handleSubmitComment() {
    const commentInput = document.getElementById(
      'comment-to-submit'
    ) as HTMLInputElement
    const commentText = commentInput.value
    createComment(commentText, router.query.slug, setUserData).then(res => {
      setCommentList(prev => [
        ...prev,
        {
          ...res,
          author: {
            id: userData.id,
            image_profile: userData.image_profile,
            username: userData?.username,
            is_staff: userData.is_staff
          }
        }
      ])
    })
  }

  return (
    <StyledWrapper>
      <h3>Comentários</h3>
      <div className="wrapper-send-camp">
        <input
          type="text"
          id="comment-to-submit"
          placeholder="Escreva um comentário..."
        />
        <button onClick={handleSubmitComment}>Enviar</button>
      </div>
      {commentList.map(element => {
        return (
          <StyledCardComment key={element}>
            <div className="comment">
              <div className="comment-profile">
                <Image
                  src={element.author.image_profile}
                  width={70}
                  height={70}
                  alt="Author image profile"
                  className="image_profile"
                />
              </div>
              <div className="comment-data">
                <strong className="comment-data__authorName">
                  {element.author.username}
                  {element.author.is_staff && (
                    <Image
                      alt="Ícone de verificado"
                      src={VerifiedIcon}
                      width={20}
                      height={20}
                      className="verified-icon"
                    />
                  )}
                </strong>
                <span className="comment-data__content">{element.text}</span>
              </div>
            </div>
          </StyledCardComment>
        )
      })}
    </StyledWrapper>
  )
}

export const StyledWrapper = styled.div`
  h3 {
    font-size: 1.5rem;
    line-height: 1.2rem;

    margin: 2rem 0 0 0;
  }

  .wrapper-send-camp {
    width: 100%;

    display: grid;
    grid-template-columns: 90fr 10fr;
    column-gap: 1.5rem;

    margin: 1rem 0 0 0;

    input {
      border-radius: 8px;
      border: solid 0.0625rem #898989;

      font-size: 1rem;

      padding: 0.2rem;
    }

    button {
      border: none;
      border-radius: 8px;

      color: #fff;

      background: #280633;
    }
  }
`

const StyledCardComment = styled.div`
  .image_profile {
    width: 60px;
    height: 60px;

    border-radius: 100%;
  }

  .comment {
    display: flex;

    margin: 24px 0 0 0;
  }

  .comment-profile {
  }

  .comment-data {
    display: flex;
    flex-direction: column;
  }

  .comment-data__authorName {
    font-weight: 700;
    font-size: 16px;

    line-height: 22px;

    margin: 0 0 8px 16px;

    .verified-icon {
      width: 20px;
      height: 20px;

      margin: 0 0 -4px 12px;
    }
  }

  .comment-data__content {
    font-weight: 400;
    font-size: 18px;

    line-height: 20px;

    margin: 0 0 0 16px;
  }
`
