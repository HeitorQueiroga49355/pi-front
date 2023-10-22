import React from 'react'
import { StyledWrapper } from './styles'

export function CommentsOnArticle() {
  return (
    <StyledWrapper>
      <h3>Comentários</h3>
      <div className="wrapper-send-camp">
        <input type="text" placeholder="Escreva um comentário..." />
        <button>Enviar</button>
      </div>
    </StyledWrapper>
  )
}
