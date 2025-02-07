# Showbility

> 쇼빌리티의 앱/서버 모노레포입니다.

## Contributing

### 개발 환경 세팅

#### Node, pnpm 설정

- [`.nvmrc`](.nvmrc)에 명시된 버전의 `node`가 설치되어 있어야 합니다.
- [`package.json`](package.json) > `"packageManager"` 필드에 명시된 `pnpm` 버전을 사용해야 합니다.

<details>
<summary>권장 설정 방법</summary>

`node` 버전 관리를 위해 [`fnm`](https://fnm.vercel.app) 사용을 권장합니다.
`fnm`을 사용하는 경우 `.nvmrc`의 `node` 버전을 자동으로 읽어옵니다.

`pnpm` 버전 관리를 위해서는 `corepack` 사용을 권장합니다. `node`가 설치된 환경에서 아래 명령어를 사용하면 자동으로 `"packageManager"`에 명시된 패키지 매니저를 사용합니다.

```bash
corepack enable
```

</details>

#### 의존성 설치

```bash
pnpm install
```

#### 로컬 환경 변수 설정

[`packages/api/.env.example`](packages/api/.env.example)을 참고해서 `packages/api/.env` 파일을 생성하고 로컬에서 사용할 환경변수를 설정하세요.

#### 로컬 환경 명령어

> 로컬 개발 환경에서 유용한 명령어 목록입니다. 자세한 내용은
> [`package.json`](package.json), [`packages/app/package.json`](packages/app/package.json), [`packages/api/package.json`](packages/api/package.json) 을 참고하세요.

##### 공통

- `pnpm dev` : 앱, 서버 개발 서버 실행

##### App

- `pnpm app dev` : 앱 개발 서버 실행

##### Server

- `pnpm api dev` : 서버 개발 서버 동시 실행
- `pnpm api db generate --name=마이그레이션이름` : DB 마이그레이션 파일 생성
- `pnpm api db migrate` : DB 마이그레이션 파일 생성
- `pnpm api db studio` : 로컬 환경에서 DB에 쉽게 접근하기 위한 [Drizzle studio](https://orm.drizzle.team/docs/drizzle-kit-studio)를 실행합니다.
