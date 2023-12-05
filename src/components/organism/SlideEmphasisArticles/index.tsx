import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

interface ISlideEmphasisArticles {
  emphasisArticles: any
}

export default function SlideEmphasisArticles({
  emphasisArticles
}: ISlideEmphasisArticles) {
  const swiperRef = useRef<any>()

  return (
    <GeneralWrapper>
      <WrapperSlide>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSwiper={swiper => {
            swiperRef.current = swiper
          }}
        >
          {emphasisArticles.map(element => {
            return (
              <SwiperSlide key={element.id}>
                <SlideContent>
                  <div className="wrapper-image">
                    <Link href={`/artigo/${element.id}`}>
                      <Image
                        objectFit="cover"
                        fill
                        src={
                          process.env.NEXT_PUBLIC_BACK_URL + element.cover_image
                        }
                        alt="Capa do artigo"
                      />
                    </Link>
                  </div>
                  <div>
                    <h3>
                      <Link href={`/artigo/${element.id}`}>
                        {element.title}
                      </Link>
                    </h3>
                    <Link href={`/artigo/${element.id}`}>
                      <p>{element.subtitle}</p>
                    </Link>
                  </div>
                </SlideContent>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <ButtonNextSled
          onClick={() => {
            swiperRef.current.slidePrev()
          }}
          className="previous-slide-button"
        >
          <div />
        </ButtonNextSled>
        <ButtonNextSled
          onClick={() => {
            swiperRef.current.slideNext()
          }}
          className="next-slide-button"
        >
          <div />
        </ButtonNextSled>
      </WrapperSlide>
    </GeneralWrapper>
  )
}

const WrapperSlide = styled.div`
  max-width: 1086px;
  width: min-content;
  display: flex;
  justify-content: center;
  position: relative;

  @media (max-width: 1340px) {
    max-width: 80%;
  }
  @media (max-width: 470px) {
    max-width: 75%;
  }
`

const GeneralWrapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;

  a {
    color: #000000;
    text-decoration: none;
  }
`

const SlideContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 74px 0 0 0;

  cursor: pointer;

  div {
    font-family: Poppins;

    height: 275px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 48px;

    text-overflow: ellipsis;
  }

  p {
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 27px;
    height: 54px;

    display: block;
    display: -webkit-box;
    max-height: 54px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;

    color: #545454;
  }

  div.wrapper-image {
    min-width: 400px;
    min-height: 300px;
    width: 100%;
    /* height: 500px; */

    /* height: max-content; */
    object-fit: cover;
    position: relative;

    margin: 0 60px 0 0;
  }

  @media (max-width: 1340px) {
    img.wrapper-image {
      min-width: 450px;
      margin: 0 30px 0 0;
    }

    h3 {
      font-size: 28px;
      line-height: 42px;
    }

    p {
      font-size: 18px;
    }

    div {
      height: 242px;
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;

    margin: 40px 0 0 0;

    img.wrapper-image {
      width: 100%;
    }

    div {
      height: 200px;
    }
  }

  @media (max-width: 470px) {
    h3 {
      font-size: 22px;
      line-height: 32px;
    }

    div {
      height: 180px;
    }

    p {
      font-size: 16px;
    }
  }
`

const ButtonNextSled = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 50%;

  &.next-slide-button {
    right: -90px;
    transform: rotate(225deg);
  }

  &.previous-slide-button {
    left: -90px;
    transform: rotate(45deg);
  }

  div {
    width: 20px;
    height: 20px;
    box-shadow: 2px -2px 0 1px #000 inset;
  }

  @media (max-width: 960px) {
    &.next-slide-button {
      right: -40px;
      transform: rotate(225deg);
    }

    &.previous-slide-button {
      left: -40px;
      transform: rotate(45deg);
    }

    div {
      width: 30px;
      height: 30px;
    }
  }

  @media (max-width: 470px) {
    div {
      width: 20px;
      height: 20px;
    }
  }
`
