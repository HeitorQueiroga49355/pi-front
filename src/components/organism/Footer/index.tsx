import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import LogoFooterWithName from '../../../../public/assets/imgs/LogoFooterWithName.png'
import Facebook from '../../../../public/assets/imgs/socialMediaIcons/Facebook.png'
import Instagram from '../../../../public/assets/imgs/socialMediaIcons/Instagram.png'
import Twitter from '../../../../public/assets/imgs/socialMediaIcons/Twitter.png'
import Youtube from '../../../../public/assets/imgs/socialMediaIcons/Youtube.png'

export default function Footer() {
  return (
    <StyledFooter>
      <CompanyInformation>
        <div className="logo-and-email">
          <Image
            src={LogoFooterWithName}
            alt={'Logo da Paglaum'}
            width={167}
            height={47}
          />
          <div className="text">Artigos cripto de excelência</div>
          <address className="text email">comunicativo@paglaum.io</address>
        </div>
        <span></span>
        <div className="section-footer">
          <div className="title-section-footer">Soluções</div>
          <div className="element-section-footer">Faça parte</div>
          <div className="element-section-footer">Parceiros</div>
        </div>
        <span></span>
        <div className="section-footer">
          <div className="title-section-footer">Institucional</div>
          <div className="element-section-footer">Sobre nós</div>
          <div className="element-section-footer">Ajuda</div>
          <div className="element-section-footer">Contato</div>
        </div>
        <span></span>
        <div className="section-footer">
          <div className="title-section-footer">Central de ajuda</div>
          <div className="element-section-footer">Política de privacidade</div>
          <div className="element-section-footer">Central de ajuda</div>
        </div>
      </CompanyInformation>
      <SecondLayerFooter>
        <span>© Copyright 2022. Todos os direitos reservados</span>
        <div className="social-media">
          <a target="_blank" rel="noreferrer" href="https://instagram.com">
            <Image src={Instagram} alt="Logo do Insta" width={24} height={24} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://twitter.com">
            <Image src={Twitter} alt="Logo do Twitter" width={24} height={24} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://facebook.com">
            <Image src={Facebook} alt="Logo do Face" width={24} height={24} />
          </a>
          <a target="_blank" rel="noreferrer" href="https://youtube.com">
            <Image src={Youtube} alt="Logo do Youtube" width={24} height={24} />
          </a>
        </div>
      </SecondLayerFooter>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  width: 100%;
  height: 315px;

  background: #280633;

  margin: 64px 0 0 0;
  padding: 48px 0 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 600px;

    padding: 0;
  }
`

const CompanyInformation = styled.div`
  display: grid;
  grid-template-columns: 251fr 200fr 88fr 188fr 117fr 188fr 184fr;
  width: 90%;
  height: 147px;

  div.logo-and-email {
    width: 251px;
    height: 143px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div.text,
  address.text {
    font-family: 'Poppins';
    font-size: 16px;
    line-height: 24px;

    color: #d3c7db;
  }

  address.email {
    font-weight: 700;
    font-style: normal;

    color: #fbf5ff;
  }

  div.title-section-footer {
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;

    color: #fbf5ff;
  }

  div.element-section-footer {
    font-family: 'Poppins';
    font-size: 15.5px;
    line-height: 24px;
    font-weight: 400;

    color: #d3c7db;

    margin: 16px 0 0 0;

    cursor: pointer;
  }

  hr {
    display: none;

    width: 100%;

    position: absolute;
    left: 0;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    width: max-content;
    height: auto;

    hr {
      display: inline;
    }

    div.logo-and-email {
      height: max-content;

      display: flex;
      align-items: center;
    }

    div.element-section-footer {
      margin: 0 0 0 20px;

      display: flex;
      align-items: center;
    }

    div.section-footer {
      margin: 16px 0 0 0;

      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`

const SecondLayerFooter = styled.div`
  display: flex;
  justify-content: space-between;

  height: 24px;
  width: 90%;

  margin: 48px 0 0 0;

  span {
    font-family: 'Poppins';
    font-size: 15.5px;
    line-height: 24px;

    color: #d3c7db;
  }

  div.social-media {
    width: 168px;

    display: flex;
    justify-content: space-between;
  }

  a > img {
    object-fit: contain;

    cursor: pointer;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    margin: 36px 0 0 0;

    height: max-content;

    div.social-media {
      margin: 24px 0 0 0;
      width: 60%;
    }
  }
`
