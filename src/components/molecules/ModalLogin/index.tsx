import Modal from '../../atoms/Modal'
import styled from 'styled-components'
import Image from 'next/image'
import IconClose from '../../../../public/assets/icons/closeIcon.svg'
import Logo from '../../../../public/assets/imgs/logo.png'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { RegisterSchema, LoginSchema } from './schemas'

interface ModalLoginProps {
  closeMethod: () => unknown
}

export default function ModalLogin({ closeMethod }: ModalLoginProps) {
  const [selected, setSeleted] = useState<'left' | 'right'>('left')

  const formRegister = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: values => console.log(values)
  })
  const formLogin = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: values => console.log(values)
  })

  return (
    <Modal closeMethod={closeMethod}>
      <Container onClick={e => e.stopPropagation()}>
        <CloseButton onClick={closeMethod} />
        <ImageContainer>
          <Image
            src={Logo.src}
            alt="Logo da Paglaum"
            width={110}
            height={110}
          />
        </ImageContainer>
        <TextContent>
          <Title>Faça parte da comunidade Paglaum</Title>
          <Text>
            Crie seus próprios artigos, comente e aprenda sobre o mundo cripto
          </Text>
        </TextContent>
        <ModalTypeSelect selected={selected}>
          <SelectButton
            selected={selected === 'left'}
            onClick={() => setSeleted('left')}
            className="left"
          >
            Cadastrar
          </SelectButton>
          <SelectButton
            selected={selected === 'right'}
            onClick={() => setSeleted('right')}
            className="right"
          >
            Entrar
          </SelectButton>
        </ModalTypeSelect>
        <FormsContainer
          onSubmit={
            selected === 'left'
              ? formRegister.handleSubmit
              : formLogin.handleSubmit
          }
        >
          {selected === 'left' ? (
            <>
              <Label htmlFor="firstName">Nome</Label>
              <Input
                name="firstName"
                id="firstName"
                type="text"
                value={formRegister.values.firstName}
                onChange={formRegister.handleChange}
              />
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input
                name="lastName"
                id="lastName"
                type="text"
                value={formRegister.values.lastName}
                onChange={formRegister.handleChange}
              />
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                id="email"
                type="email"
                value={formRegister.values.email}
                onChange={formRegister.handleChange}
              />
              <Label htmlFor="password">Senha</Label>
              <Input
                name="password"
                id="password"
                type="password"
                value={formRegister.values.password}
                onChange={formRegister.handleChange}
              />
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                value={formRegister.values.confirmPassword}
                onChange={formRegister.handleChange}
              />
            </>
          ) : (
            <>
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                id="email"
                type="email"
                value={formLogin.values.email}
                onChange={formLogin.handleChange}
              />
              <Label htmlFor="password">Senha</Label>
              <Input
                name="password"
                id="password"
                type="password"
                value={formLogin.values.password}
                onChange={formLogin.handleChange}
              />
            </>
          )}
          <Button type="submit">
            {selected === 'left' ? 'Cadastrar-se' : 'Entrar'}
          </Button>
        </FormsContainer>
      </Container>
    </Modal>
  )
}

const Container = styled.section`
  position: relative;
  background: white;
  border-radius: 8px;
  min-width: 400px;
  max-width: 600px;
  max-height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  z-index: 2;
`

const CloseButton = styled.span`
  position: absolute;
  background-image: url(${IconClose.src});
  background-size: 16px;
  background-position: center;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.span`
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 20px;
  color: black;
`

const Text = styled.span`
  font-family: 'Poppins';
  font-size: 12px;
  color: black;
  text-align: center;
  max-width: 300px;
`

const ModalTypeSelect = styled.div<{ selected: 'left' | 'right' }>`
  position: relative;
  background-color: #efefef;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;

  &::before {
    content: '';
    transition: all 200ms;
    background-color: #4e096a;
    left: ${({ selected }) => (selected === 'left' ? '0' : '97px')};
    width: ${({ selected }) => (selected === 'left' ? '116px' : '90px')};
    height: 44px;
    position: absolute;
    border-radius: 32px;
  }
`

const SelectButton = styled.button<{ selected: boolean }>`
  border: none;
  cursor: pointer;
  padding: 12px 16px;
  background: transparent;
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  z-index: 1;

  &.left {
    border-radius: 32px 0 0 32px;
    padding-left: 24px;
  }
  &.right {
    border-radius: 0 32px 32px 0;
    padding-right: 24px;
  }
`

const FormsContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Label = styled.label`
  font-family: 'Poppins';
  font-size: 16px;
  color: #4e096a;
`

const Input = styled.input`
  width: 100%;
  padding: 6px 8px;
  outline: none;
  border-radius: 4px;
  border: 1px solid grey;
  margin-bottom: 8px;

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  background-color: #4e096a82;
  cursor: pointer;
  color: white;
  margin: 16px auto 0;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;

  &:hover {
    transition: background-color 250ms;
    background-color: #4e096ab0;
  }
`
