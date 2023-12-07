import NextImage from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import UploadImage from '../../../../public/assets/imgs/uploadImage.png'
import { useRouter } from 'next/router'
import { userContext } from '../../../contexts/userDataContext'
import { createArticle, updateArticle } from '../../../services/articles'
interface IEditDocumentContent {
  initialArticleData: any
  isEditingPage?: boolean
}
export default function EditDocumentContent({
  initialArticleData,
  isEditingPage
}: IEditDocumentContent) {
  const [articleCover, setArticleCover] = useState<string | undefined | null>()
  const router = useRouter()
  const { userData, setUserData } = useContext(userContext)
  const articleCoverFile = useRef()

  useEffect(() => {
    if (isEditingPage) {
      const title = document.getElementById('title-input') as HTMLInputElement
      const subtitle = document.getElementById(
        'subtitle-input'
      ) as HTMLInputElement
      const content = document.getElementById('editor')

      title.value = initialArticleData.title
      subtitle.value = initialArticleData.subtitle
      setArticleCover(initialArticleData.cover_image)
      content.innerHTML = initialArticleData.content
    }
  }, [])

  useEffect(() => {
    const table: any = document.querySelector('.icon-table')
    const editor: any = document.querySelector('#editor')
    const upload: any = document.querySelector('#upload')

    table.addEventListener('click', () => {
      const linha = +prompt('Qual número de linhas?')
      const coluna = +prompt('Qual número de colunas?')

      if (linha && coluna) {
        const t = document.createElement('table')
        t.border = '1'
        t.style.borderCollapse = 'collapse'
        t.style.border = '1px solid #ccc'
        t.style.margin = 'auto'

        for (let l = 0; l < linha; l++) {
          const tr = document.createElement('tr')
          tr.style.border = '1px solid #ccc'

          for (let c = 0; c < coluna; c++) {
            const td = document.createElement('td')
            td.style.border = '1px solid #ccc'
            td.innerHTML = ' - '
            tr.appendChild(td)
          }
          t.appendChild(tr)
        }
        editor.appendChild(t)

        const small = document.createElement('small')
        small.innerHTML = 'Fonte:'
        editor.appendChild(small)
      }
    })

    upload.addEventListener('change', (e: any) => {
      const file = e.currentTarget.files[0]
      const reader = new FileReader()
      const img: any = new Image(750)
      reader.onloadend = () => {
        img.src = reader.result
        editor.appendChild(img)
        upload.value = ''
      }
      reader.readAsDataURL(file)
    })
  }, [])

  function uploadArticleCover(event: any) {
    articleCoverFile.current = event.currentTarget.files[0]
    const reader = new FileReader()
    const img: any = new Image(750)
    reader.onloadend = () => {
      img.src = reader.result
      setArticleCover(img.src)
    }
    reader.readAsDataURL(articleCoverFile.current)
  }

  function link() {
    document.execCommand('createlink', false, prompt('Enter a URL:', 'http://'))
  }

  function applyCommand(comand) {
    document.execCommand(comand)
  }

  function handleSubmitNewArticleData(event: any) {
    event.preventDefault()
    const formData = new FormData()
    formData.append(
      'title',
      (document.getElementById('title-input') as HTMLInputElement).value
    )
    formData.append(
      'subtitle',
      (document.getElementById('subtitle-input') as HTMLInputElement).value
    )
    formData.append('cover_image', articleCoverFile.current)
    formData.append('content', document.getElementById('editor').innerHTML)
    createArticle(formData, setUserData)
      .then((res: any) => {
        router.push('/artigo/' + res.id)
      })
      .catch(error => {
        alert(error)
      })
  }

  function handleSubmitArticleUpdates(event: any) {
    event.preventDefault()
    const formData = new FormData()
    formData.append(
      'title',
      (document.getElementById('title-input') as HTMLInputElement).value
    )
    formData.append(
      'subtitle',
      (document.getElementById('subtitle-input') as HTMLInputElement).value
    )
    if (articleCoverFile.current)
      formData.append('cover_image', articleCoverFile.current)
    formData.append('content', document.getElementById('editor').innerHTML)
    updateArticle(formData, router.query.slug.toString(), setUserData)
      .then((res: any) => {
        router.push('/artigo/' + res.id)
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <StyledMain>
      <div className="wrapper-content">
        <input type="file" id="upload" hidden />
        <input
          type="file"
          id="upload-image-cover"
          onChange={uploadArticleCover}
          hidden
        />
        <form>
          <h2>
            {isEditingPage ? 'Criação ' : 'Edição '}
            de artigos
          </h2>

          <input
            type="text"
            placeholder="Título do artigo"
            className="title-input"
            id="title-input"
          />
          <input
            type="text"
            placeholder="Subtitulo da postagem"
            className="subtitle-input"
            id="subtitle-input"
          />
          <label htmlFor="upload-image-cover" className="upload-image-cover">
            {!articleCover ? (
              <>
                <NextImage src={UploadImage} alt="Ícone de upload de imagem" />
                <p>Subir imagem de capa</p>
              </>
            ) : (
              <img src={articleCover} className="uploaded-image" />
            )}
          </label>
          <StyledEditor>
            <div id="painelEditor">
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('justifyLeft')}
              >
                <i className="demo-icon icon-align-left"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('justifyCenter')}
              >
                <i className="demo-icon icon-align-center"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('justifyRight')}
              >
                <i className="demo-icon icon-align-right"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('justifyFull')}
              >
                <i className="demo-icon icon-align-justify"></i>
              </button>

              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('bold')}
              >
                <i className="demo-icon icon-bold"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('italic')}
              >
                <i className="demo-icon icon-italic"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('strikeThrough')}
              >
                <i className="demo-icon icon-strike"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('underline')}
              >
                <i className="demo-icon icon-underline"></i>
              </button>

              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('outdent')}
              >
                <i className="demo-icon icon-indent-left"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('indent')}
              >
                <i className="demo-icon icon-indent-right"></i>
              </button>

              <button className="btnColor" type="button" onClick={link}>
                <i className="demo-icon icon-link"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('redo')}
              >
                <i className="demo-icon icon-ccw"></i>
              </button>
              <button
                className="btnColor"
                type="button"
                onClick={() => applyCommand('undo')}
              >
                <i className="demo-icon icon-cw"></i>
              </button>
              <label htmlFor="upload">
                <i className="demo-icon icon-picture"></i>
              </label>

              <i className="demo-icon icon-table"></i>
            </div>
            <div id="editor" contentEditable />
          </StyledEditor>
          <div className="publish-button-wrapper">
            <button
              onClick={e => {
                if (isEditingPage) handleSubmitArticleUpdates(e)
                else handleSubmitNewArticleData(e)
              }}
            >
              Publicar{isEditingPage ? ' edição' : 'artigo'}
            </button>
          </div>
        </form>
      </div>
    </StyledMain>
  )
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  h2 {
    font-size: 32px;

    margin: 32px 0 0 0;
  }

  div.wrapper-content {
    width: 80%;
    max-width: 750px;
  }

  input.title-input {
    width: 100%;
    height: 65px;

    padding: 16px;
    margin: 32px 0 0 0;

    border: #767676 solid 1px;
    border-radius: 8px;
    color: #767676;

    font-size: 32px;
    line-height: 48px;
  }

  input.subtitle-input {
    width: 100%;
    height: 42px;

    font-size: 20px;
    line-height: 30px;

    border: #767676 solid 1px;
    color: #767676;

    border-radius: 8px;

    margin: 16px 0 0 0;
    padding: 16px;
  }

  label.upload-image-cover {
    display: flex;
    align-items: center;

    margin: 24px 0 0 0;

    cursor: pointer;
  }

  label.upload-image-cover > p {
    font-size: 14px;
    line-height: 21px;
    color: #767676;

    margin: 0 0 0 16px;
  }

  label.upload-image-cover > img.uploaded-image {
    width: 80vw;
    max-width: 750px;
  }

  div.publish-button-wrapper {
    width: 100%;

    display: flex;
    justify-content: end;

    margin: 24px 0 0 0;
  }

  div.publish-button-wrapper > button {
    padding: 12px 16px;

    background: #340647;
    border: 1px solid #340647;
    border-radius: 8px;

    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #f8e8e7;

    cursor: pointer;
  }
`

const StyledEditor = styled.div`
  width: 100%;

  border: 1px solid #ccc;
  border-radius: 3px;

  padding: 0 0 2px 0;
  margin: 36px 0 0 0;

  background-color: #fff;

  body {
    background-color: #eee;
  }

  #painelEditor {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: max-content;
    background-color: #f6fafe;
  }

  #editor {
    padding: 10px;
    height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .btnColor {
    font-size: 15px;
    font-weight: bold;
    outline: none;
    border: none;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 8px 0 8px;
  }
  #fontColor {
    color: #3c8dbc;
  }

  #backColor {
    color: orange;
  }

  #paleta {
    width: 15px;
    height: 15px;
    border: none;
    outline: none;
  }

  .demo-icon {
    cursor: pointer;
    color: #3d3d3d;
  }

  .demo-icon:hover {
    color: gray;
  }

  [class^='icon-']:before,
  [class*=' icon-']:before {
    font-family: 'fontello';
    font-style: normal;
    font-weight: normal;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: 0.2em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-indent-right:before {
    content: '\\e800';
  }
  .icon-indent-left:before {
    content: '\\e801';
  }
  .icon-align-left:before {
    content: '\\e802';
  }
  .icon-align-center:before {
    content: '\\e803';
  }
  .icon-align-right:before {
    content: '\\e804';
  }
  .icon-align-justify:before {
    content: '\\e805';
  }
  .icon-bold:before {
    content: '\\e806';
  }
  .icon-floppy:before {
    content: '\\e807';
  }
  .icon-attach:before {
    content: '\\e808';
  }
  .icon-ccw:before {
    content: '\\e809';
  }
  .icon-cw:before {
    content: '\\e80a';
  }
  .icon-picture:before {
    content: '\\e80b';
  }
  .icon-italic:before {
    content: '\\e80c';
  }
  .icon-help-circled:before {
    content: '\\e80d';
  }
  .icon-link:before {
    content: '\\e80e';
  }
  .icon-resize-full-alt:before {
    content: '\f0b2';
  }
  .icon-strike:before {
    content: '\f0cc';
  }
  .icon-underline:before {
    content: '\f0cd';
  }
  .icon-table:before {
    content: '\f0ce';
  }
  .icon-code:before {
    content: '\f121';
  }
  .icon-code:before {
    content: '\f121';
  }
`
