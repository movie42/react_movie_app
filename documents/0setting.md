# React와 Setting

[React - CRA (Create-React-App)](https://velog.io/@devmoonsh/React-CRA-Create-React-App)

### CRA 설치

1. 먼저 nodejs가 설치 되어있어야한다.

2. 터미널에서 프로젝트를 생성하고자 하는 위치에서 아래와 같이 입력한다.
   - my-project는 내가 원하는 이름으로 변경할 수 있다.

```
npx create-react-app my-project
```

3. npx가 안되면 먼저 npx를 설치하면 된다.

```
npm install npx -g
```

설치 후 확인은 npx -v 명령어를 실행하면 된다.

4. project로 이동한 뒤 npm start로 실행시키면 로컬 서버 주소를 확인 할 수 있다.

### 업데이트

#### CRA 업데이트

[Create React App-Based Projects를 버전 4 (CRA 4)로 업그레이드](https://ichi.pro/ko/create-react-app-based-projectsleul-beojeon-4-cra-4-lo-eobgeuleideu-237039965311398)
[공식문서 : Updating to New Releases](https://create-react-app.dev/docs/updating-to-new-releases/)
[CRA 깃 저장소](https://github.com/facebook/create-react-app/blob/main/CHANGELOG.md)

나같은 경우는 이미 CRA가 설치된 상황이라 업데이트가 필요했다.

1. 터미널을 열고 프로젝트로 이동한뒤 아래 명령어를 입력한다.

```
npm install --save --save-exact react-scripts@latest
```

#### npm 종속 패키지 최신 버전으로 업데이트 하기

[package.json의 종속성을 최신버전으로 업데이트하는 방법](https://blog.stories.pe.kr/271)
