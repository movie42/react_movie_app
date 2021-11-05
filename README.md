# React로 movie app 만들기

> Start 2020.7.28
> Update 2021.11.1  
> Deploying https://trusting-wilson-9143af.netlify.app

## 목차

- [React로 movie app 만들기](#react로-movie-app-만들기)
  - [목차](#목차)
  - [참고](#참고)
  - [새롭게 넣어보기](#새롭게-넣어보기)
    - [2021년 11월에 해볼것 들](#2021년-11월에-해볼것-들)
  - [프로젝트를 만들며 배운 것들](#프로젝트를-만들며-배운-것들)
    - [React와 세팅](#react와-세팅)
    - [JSX란?](#jsx란)
    - [컴포넌트 만들기](#컴포넌트-만들기)
    - [버튼 이벤트 처리하기](#버튼-이벤트-처리하기)
    - [함수형 컴포넌트 vs 클래스](#함수형-컴포넌트-vs-클래스)
    - [Hooks](#hooks)
    - [특정 조건일 때만 렌더링 하기](#특정-조건일-때만-렌더링-하기)
    - [여러 개의 데이터를 반복적으로 렌더링하기](#여러-개의-데이터를-반복적으로-렌더링하기)
    - [이벤트](#이벤트)
    - [사용자의 입력을 효과적으로 받는 폼 만들기](#사용자의-입력을-효과적으로-받는-폼-만들기)
    - [PureComponent](#purecomponent)

## 참고

- 이 포트폴리오는 [노마드코더의 리액트 맴버십](https://nomadcoders.co/react-for-beginners)을 토대로 만들었다.(2021.5)
- 리액트를 다시 복습은 [clelab](https://clelab.io/course/react)을 참고해서 복습하였다.

## 새롭게 넣어보기

### 2021년 11월에 해볼것 들

- [ ] mongoDB와 연결 해보기
  - 회원 가입, 회원 정보
  - 업적(예전에 토스 채용공고 사이트에서 봤던거 만들어보기)
  - 영화 평가, 보고 싶은 영화 정보 저장하고 불러오기
- [ ] Express 만들고 heroku로 depoloying 해보기

- 고민되는 부분
  - MOVIE DB에서 불러온 API 정보를 DB에 전부 저장해야할까? (그럴 필요가 있을까? 아마 그럴필요는 없을듯?)
  - 회원이 보고싶다고 저장한 영화 정보만 DB에 저장해도 되지 않을까?
  - 그럼... 만약에 회원이 보고싶다고 저장한 영화 정보는 어떤식으로 불러오게 해야할까?
  - DB에 저장한것을 그대로 불러와야할까 아니면 영화 제목 혹은 아이디를 이용해서 MOVIE DB에서 요청해야할까?

## 프로젝트를 만들며 배운 것들

### React와 세팅

[세팅 방법 정리](documents/0setting.md)

### JSX란?

[JSX란 무엇일까?](documents/1whatIsJsx.md)

### 컴포넌트 만들기

[컴포넌트를 만드는 방법과 내가 작성한 코드 컴포넌트로 리펙토링하기](documents/2makeComponents.md)

### 버튼 이벤트 처리하기

[리엑트에서 이벤트는 어떻게 처리할까?](documents/3makeBtn.md)

### 함수형 컴포넌트 vs 클래스

[함수형 컴포넌트를 사용하면 어떤 장점이 있을까?](documents/3functionVsClass.md)
[리엑트 훅을 배워보기](documents/4Hooks.md)

### Hooks

[Hooks](documents/4Hooks.md)

### 특정 조건일 때만 렌더링 하기

[조건부 렌더링](./documents/5conditional.md)

### 여러 개의 데이터를 반복적으로 렌더링하기

[컴포넌트 반복](./documents/6repeat.md)

### 이벤트

[이벤트](./documents/7handleEvent.md)

### 사용자의 입력을 효과적으로 받는 폼 만들기

[폼](./documents/8form.md)

### PureComponent

[PureComponent](./documents/9pure.md)
