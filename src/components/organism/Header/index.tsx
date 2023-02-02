import React, { useRef, useState } from 'react'
import Image from 'next/image'
import logo from '../../../../public/assets/imgs/logoWithName.png'
import styled from 'styled-components'
import Link from 'next/link'
import Arrow from '../../../../public/assets/icons/arrow.svg'
import Dropdown, { DropdownFunctions } from '../../atoms/Dropdown'
import DiscordIcon from '../../../../public/assets/imgs/discordIcon.jpg'
import YouTubeIcon from '../../../../public/assets/imgs/youtubeIcon.png'
import InstagramIcon from '../../../../public/assets/imgs/InstagramIcon.png'
import TwitterIcon from '../../../../public/assets/imgs/TwitterIcon.png'
import useGetWidth from '../../../hooks/useGetWidth'

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(false)
  const socialMediaDropdownRef = useRef<DropdownFunctions>()
  const [hideElements, setHideElements] = useState(false)
  const width = useGetWidth()

  return (
    <HeaderDiv>
      <div
        className={
          'content-header-container ' +
          (hideElements && width < 960 ? 'set-to-default-display' : '')
        }
      >
        <div className="main-links">
          <div className={hideElements && width < 960 ? 'hidden' : 'show'}>
            <Link className="logo-link" href="/">
              <Image className="logo" src={logo} alt="logo" />
            </Link>
          </div>
          <nav>
            <WrapperDiv gap="40px">
              <StyledUL gap="8px">
                <li>
                  <Link href="https://paglaum.io">Site oficial</Link>
                </li>
                <li>
                  <div
                    className="social-media-div"
                    onClick={() => {
                      setOpenDropdown(!openDropdown)
                      socialMediaDropdownRef.current.handleChangeOpen()
                    }}
                  >
                    Redes sociais
                    <div
                      className={`wrapper-image-arrow ${
                        openDropdown ? 'open' : 'close'
                      }`}
                    >
                      <Image
                        alt="Seta para abrir dropdown"
                        width={12}
                        height={12}
                        src={Arrow}
                      />
                    </div>
                    <Dropdown
                      ref={socialMediaDropdownRef}
                      top={'40px'}
                      arrowPosition={'left'}
                    >
                      <DropdowContent>
                        <div>
                          Discord
                          <Image
                            className="icon"
                            alt="Ícone do discord"
                            src={DiscordIcon}
                          />
                        </div>
                        <div>
                          YouTube
                          <Image
                            alt="Ícone do youtube"
                            className="icon"
                            src={YouTubeIcon}
                          />
                        </div>
                        <div>
                          Instagram
                          <Image
                            alt="Ícone do instagram"
                            className="icon"
                            src={InstagramIcon}
                          />
                        </div>
                        <div>
                          Twitter
                          <Image
                            alt="Ícone do Twitter"
                            className="icon"
                            src={TwitterIcon}
                          />
                        </div>
                      </DropdowContent>
                    </Dropdown>
                  </div>
                </li>
                <li>
                  <Link href="/editar-documento">Escrever</Link>
                </li>
              </StyledUL>
            </WrapperDiv>
          </nav>
        </div>
        <WrapperDiv gap={'16px'}>
          <SearchBarInput
            onFocus={() => setHideElements(true)}
            onBlur={() => setHideElements(false)}
            placeholder={width > 480 ? 'Pesquisar' : ''}
          />
          <div className={hideElements && width < 960 ? 'hidden' : 'show'}>
            <Button>Login</Button>
          </div>
        </WrapperDiv>
      </div>
    </HeaderDiv>
  )
}

const WrapperDiv = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  gap: ${(props: { gap: string }) => props.gap};
`

const StyledUL = styled.div`
  display: flex;
  font-family: Poppins;
  gap: ${(props: { gap: string }) => props.gap};

  li {
    width: 140px;
    height: 45px;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #98909e;
    text-decoration: none;

    cursor: pointer;
  }

  div.wrapper-image-arrow {
    transition: 0.3s;
    height: 25px;
    width: 12px;
  }

  div.wrapper-image-arrow.open {
    transform: rotate(180deg);
  }

  div.wrapper-image-arrow.close {
    transform: rotate(0deg);
  }

  div.social-media-div {
    display: flex;
    width: 128px;
    justify-content: space-between;
    align-items: center;
  }

  a {
    color: #a6aaad;
    text-decoration: none;
    line-height: 21px;
    font-weight: 500;
  }
`

const HeaderDiv = styled.header`
  width: 100%;
  padding: 15px 80px;

  background-color: #fff;
  border-bottom: 1px solid #eef2f5;

  display: flex;
  justify-content: center;
  align-items: center;

  div.content-header-container {
    max-width: 1200px;
    width: 1200px;
    display: flex;
    justify-content: space-between;
  }

  div.set-to-default-display {
    display: inline;
    justify-content: normal;
  }

  div.main-links {
    display: flex;
  }

  @media (max-width: 960px) {
    nav {
      display: none;
    }

    padding: 8px 20px;

    img.logo {
      width: 130px;
      height: 37.37px;

      margin: 8px 0 0 0;
    }
  }

  div.hidden {
    display: none;
  }

  div.show {
    display: flex;

    height: max-content;
  }

  a.logo-link {
    height: 48px;
  }
`

const SearchBarInput = styled.input`
  background-color: rgb(0, 0, 0, 0);
  border: 1px solid #98909e;
  border-radius: 8px;

  outline: none;

  height: 48px;
  width: 158px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  padding: 16px 16px 16px 52px;

  background-image: url(/assets/imgs/search.png);
  background-size: 24px 24px;
  background-repeat: no-repeat;
  background-position: 16px 11px;

  outline: none;

  transition: width 0.2s;

  &:focus {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 48px;

    padding: 16px 16px 16px 42px;
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;

  width: 90px;
  height: 48px;

  background: #340647;
  border: 1px solid #340647;
  border-radius: 8px;

  color: #fff;
  font-family: Poppins;
  font-weight: 500;

  cursor: pointer;
`

const DropdowContent = styled.div`
  padding: 16px 16px 8px 16px;
  div {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #a6aaad;
    margin: 0 0 8px 0;

    cursor: pointer;
  }

  img.icon {
    margin: 0 0 0 4px;
  }
`
