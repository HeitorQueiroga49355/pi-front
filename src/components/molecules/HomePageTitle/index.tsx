import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import Logo from '../../../../public/assets/imgs/logo.png'
import LiteIcon from '../../../../public/assets/imgs/coins/litecoin.png'
import CardanoIcon from '../../../../public/assets/imgs/coins/cardano.png'
import SolanaIcon from '../../../../public/assets/imgs/coins/solana.png'
import BitcoinIcon from '../../../../public/assets/imgs/coins/bitcoin.png'
import XrpIcon from '../../../../public/assets/imgs/coins/xrp.png'
import TetherIcon from '../../../../public/assets/imgs/coins/tether.png'
import UsdCoinIcon from '../../../../public/assets/imgs/coins/usdcoin.png'
import EthereumIcon from '../../../../public/assets/imgs/coins/ethereum.png'

export default function HomePageTitle() {
  return (
    <Wrapper>
      <Container>
        <div className="title-and-slogan">
          <h2>Paglaum DAO</h2>
          <p>
            <span className="highlight"> Compartilhe</span>,
            <span className="highlight"> descubra</span>,{' '}
            <span className="develop-style">
              {' '}
              {'<'}desenvolva
              {'/>'}
            </span>{' '}
            e<span className="highlight"> evolua </span> no mundo cripto
          </p>
        </div>
        <Image
          src={Logo}
          alt="Logo"
          width="303.13"
          height="309"
          className="logo"
        />
        <BackgroundImages>
          <Image
            className="LiteIcon"
            src={LiteIcon}
            alt="Icone de background"
          />
          <Image
            className="CardanoIcon"
            src={CardanoIcon}
            alt="Icone de background"
          />
          <Image
            className="SolanaIcon"
            src={SolanaIcon}
            alt="Icone de background"
          />
          <Image
            className="BitcoinIcon"
            src={BitcoinIcon}
            alt="Icone de background"
          />
          <Image className="XrpIcon" src={XrpIcon} alt="Icone de background" />
          <Image
            className="TetherIcon"
            src={TetherIcon}
            alt="Icone de background"
          />
          <Image
            className="UsdCoinIcon"
            src={UsdCoinIcon}
            alt="Icone de background"
          />
          <Image
            className="EthereumIcon"
            src={EthereumIcon}
            alt="Icone de background"
          />
        </BackgroundImages>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;

  border-bottom: #eef2f5 solid 1px;
`

const Container = styled.div`
  height: 421px;
  width: 1277.22px;

  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;

  h2 {
    font-family: 'Fira Code';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 66px;
  }

  p {
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 23px;
    line-height: 38px;
  }

  span.highlight {
    color: #4e096a;
  }

  span.develop-style {
    font-family: 'Fira Code';
  }

  img.logo {
    margin: 0 0 0 61px;
  }

  @media (max-width: 1200px) {
    div.title-and-slogan {
      margin: 0 0 0 70px;
    }
  }

  @media (max-width: 1024px) {
    div.title-and-slogan {
      margin: 0 0 0 30px;
    }
  }

  @media (max-width: 768px) {
    img.logo {
      display: none;
    }

    div.title-and-slogan {
      margin: 0 30px 0 30px;
    }
  }
`

const BackgroundImages = styled.div`
  img {
    position: absolute;
  }
  img.LiteIcon {
    left: 0%;
    top: 288px;
  }
  img.CardanoIcon {
    left: 0.2%;
    top: 18px;
  }
  img.SolanaIcon {
    left: 12.76%;
    top: 171px;
  }
  img.BitcoinIcon {
    left: 24.27%;
    top: 18px;
  }
  img.XrpIcon {
    left: 27.87%;
    top: 288px;
  }
  img.TetherIcon {
    left: 46.11%;
    top: 148px;
  }
  img.UsdCoinIcon {
    left: 60.83%;
    top: 18px;
  }
  img.EthereumIcon {
    left: 61.3%;
    top: 288px;
  }

  @media (max-width: 1024px) {
    img.SolanaIcon {
      left: calc(25% - 65px);
    }

    img.TetherIcon {
      left: calc(75% - 65px);
    }

    img.UsdCoinIcon {
      left: calc(100% - 130px);
    }

    img.EthereumIcon {
      left: calc(100% - 130px);
    }

    img.XrpIcon {
      left: calc(50% - 77.5px);
    }

    img.BitcoinIcon {
      left: calc(50% - 65px);
    }
  }

  @media (max-width: 768px) {
    img.SolanaIcon {
      display: none;
    }

    img.TetherIcon {
      display: none;
    }

    img.BitcoinIcon {
      top: 80px;
    }

    img.LiteIcon {
      left: 8%;
      top: 248px;
    }
  }

  @media (max-width: 500px) {
    img.XrpIcon {
      display: none;
    }

    img.BitcoinIcon {
      left: 45%;
      top: 130px;
    }
  }
`
