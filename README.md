# Showbility App

## Specification

- React Native (expo)
- Node v19.7.0

## Run expo dev server

```bash
$ yarn install
$ yarn start
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
