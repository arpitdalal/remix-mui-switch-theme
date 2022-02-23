# Remix MUI Switch Theme

Using Remix to create a persistent MUI theme switcher with HTTP cookie.

## Preview

Open this example on [CodeSandbox](https://codesandbox.com):

[![Open in CodeSandbox](https://codesandbox.io/s/github/arpitdalal/remix-mui-switch-theme)

## Features

- Persist theme in cookie and toggle it from any page/component.
- Full SSR support
- Works without/before JS.
- Considers the user-preferred-theme by utilizing the `Sec-CH-Prefers-Color-Scheme` header ([read more](https://web.dev/user-preference-media-features-headers/)).
- Theme is persisted even in root `CatchBoundary` and `ErrorBoundary`

## Details

[app/entry.server.tsx](./app/entry.server.tsx) - creates the emotion cache and provides the theme using `MuiThemeProvider` and `EmotionThemeProvider` to the component tree on the server. Styles are inserted in the html markup after `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>` using emotion. The `theme` cookie is also set to the headers before sending the markup.

[app/entry.client.tsx](./app/entry.client.tsx) - uses the React context to keep track of emotion cache.

[app/root.tsx](./app/root.tsx) - has `<meta name="emotion-insertion-point" content="emotion-insertion-point" />` in the `html` that is very important because using this tag, styles are inserted in `entry.server.tsx`. `EmotionThemeProvider` and `MuiThemeProvider` provides the theme to the front-end from default exported React component. It is important to have same theme in both places: `entry.server.tsx` and `root.tsx` and that is done using the `getUserTheme` function from `utils/theme.server.ts`. This file has a loader that provides the theme which is also utilized in the `index` route and an action to toggle that theme which can be called from any route or even any component.

[app/utils/theme.server.ts](./app/utils/theme.server.ts) - creates a cookie named `theme` and exports function `getUserTheme` to get theme from cookie OR system preferred theme OR default theme.

[app/themes/index.ts](./app/themes/index.ts) - exports a function `getTheme` that returns the corresponding MUI Theme when providing it with a theme mode of `light` or `dark`

## Related Links

This example is built upon the [official example](https://github.com/mui/material-ui/tree/master/examples/remix-with-typescript) created by [mui](https://github.com/mui/material-ui/)
