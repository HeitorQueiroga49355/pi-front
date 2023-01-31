import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'
export interface DropdownFunctions {
  handleChangeOpen: () => void
  handleOpenDropdown: () => void
  handleCloseDropdown: () => void
  opening: boolean
}

interface DropdownProps {
  arrowPosition: 'right' | 'left'
  top?: string
  right?: string
  left?: string
  bottom?: string
  children: React.ReactNode
}

export default forwardRef(function Dropdown(props: DropdownProps, ref) {
  const [opening, setOpening] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      handleChangeOpen,
      handleOpenDropdown,
      handleCloseDropdown,
      opening
    }
  })

  const handleChangeOpen = () => {
    setOpening(!opening)
  }
  const handleOpenDropdown = () => {
    setOpening(true)
  }
  const handleCloseDropdown = () => {
    setOpening(false)
  }

  if (opening) {
    return (
      <DivMain
        arrowPosition={props.arrowPosition}
        bottom={props.bottom}
        left={props.left}
        right={props.right}
        top={props.top}
      >
        <Arrow arrowPosition={props.arrowPosition} />
        <SectionWrapperDropdown>{props.children}</SectionWrapperDropdown>
      </DivMain>
    )
  } else {
    return <></>
  }
})

interface ArrowProps {
  arrowPosition: 'right' | 'left'
}
const Arrow = styled.div<ArrowProps>`
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid #fff;
  position: absolute;
  top: 0;
  right: ${props => (props.arrowPosition === 'right' ? '0' : '')};
  margin-top: -8px;
  margin-left: 8px;
  margin-right: 10px;
`

const DivMain = styled.div<DropdownProps>`
  width: max-content;
  height: max-content;
  background: #fff;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.15);

  border-radius: 8.8px;
  left: ${props => props.left};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  right: ${props => props.right};
  z-index: 10;
  position: absolute;
`
const SectionWrapperDropdown = styled.div``
