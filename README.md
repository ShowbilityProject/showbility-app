# Showbility App

## Specification

- React Native (expo)
- Node version specified in `.nvmrc`
- pnpm version specified in `package.json > "packageManager"`

## Setup dev environment

```bash
# Switch to node version specified in `.nvmrc`
nvm use # or `fnm use`

# Enable pnpm via corepack
corepack enable
```

## Run expo dev server

```bash
pnpm install
pnpm dev
```

## Run eas development build

For developments that requires native dependences (i.e. Kakao login)

Install eas cli

```bash
npm install -g eas-cli
```

If there are new native dependency changes, create development profile

```bash
eas build --platform ios --profile development
```

Or use existing development profile in expo

Run development server

```bash
yarn start --dev-client
```
