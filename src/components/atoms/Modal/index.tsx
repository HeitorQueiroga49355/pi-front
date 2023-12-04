import React, { createPortal } from 'react-dom'
import styled from 'styled-components'

interface ModalProps {
  children: React.ReactNode
  closeMethod: () => unknown
}

export default function Modal({ children, closeMethod }: ModalProps) {
  if (typeof document === 'undefined') return

  const element = document.getElementById('__next')

  return createPortal(
    <Background onClick={closeMethod}>{children}</Background>,
    element
  )
}

const Background = styled.div`
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`
