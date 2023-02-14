# [Coins](https://coins.yvogeldhof.nl) &middot; ![GitHub license](https://img.shields.io/badge/license-BSD3-green.svg) 

Make your coin collection portable using this [Progressive Web App](https://web.dev/progressive-web-apps/) (PWA).

# Features:

- No app store required to install the app ([PWA](https://web.dev/progressive-web-apps/))
- View your collection offline
- Authorization support (privatize your collection)
- Connectivity detection
- Supports both Android and iOS
- Loads fast, because it is built as a static app ([SSG](https://nextjs.org/docs/advanced-features/static-html-export))
- Simple table view & filters (powered by [Material-React-Table](https://github.com/KevinVandy/material-react-table))

# Getting Started

> Node >= v16.14.0 and < 17

## Development

1. Create a `.env.local` in the project root and set correct values based on `.env.local.example`.

2. Run:
```
npm i
npm run dev
```

The app is now running at [http://localhost:3000](http://localhost:3000).

> Service worker is disabled by default in the development build, this means no offline support when developing

## Production

```
npm i
npm run build
```

## Production (local)

```
npm run prod:local
```

> Especially handy to debug the service worker locally

# Generating PWA assets

This is automated using [pwa-asset-generator]('https://github.com/elegantapp/pwa-asset-generator'). The output will be meta tags to add. Please note: they are already added to this project.

1. Delete `public/icons` and `public/splash-screens`

2. Run the following command from the project root to generate the assets:

```
npm run gen:assets
```

# Technologies

[TypeScript]('https://www.typescriptlang.org/'), [React]('https://reactjs.org/'), [SWR]('https://swr.vercel.app/'), [Next.js]('https://nextjs.org/'), [Mui5]('https://mui.com/'), [Material-React-Table](https://github.com/KevinVandy/material-react-table)

# Authorization

Currently, authorization was built to support signed and encrypted cookies (seals) by [iron-session](https://github.com/vvo/iron-session).