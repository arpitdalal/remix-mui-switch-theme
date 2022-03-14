import React, { useState } from 'react';
import { hydrate } from 'react-dom';

import { RemixBrowser } from 'remix';
import { DEFAULT_THEME } from '~/constants';
import ClientStyleContext from '~/context/ClientStyleContext';
import type { ThemeNames } from '~/themes';
import createEmotionCache from '~/utils/createEmotionCache';
import {
  getCookie,
  getParsedCookie,
} from '~/utils/theme.client';

import { CacheProvider } from '@emotion/react';

function ClientCacheProvider({ children }: React.PropsWithChildren<{}>) {
  const [cache, setCache] = useState(createEmotionCache());

  const themeCookie = getCookie("theme");
  let parsedCookie = "";
  if (themeCookie) {
    parsedCookie = getParsedCookie(themeCookie);
  }
  let defaultThemeName: ThemeNames = DEFAULT_THEME;
  if (parsedCookie === "dark" || parsedCookie === "light") {
    defaultThemeName = parsedCookie;
  }

  const [themeName, setThemeName] = useState<ThemeNames>(defaultThemeName);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset, themeName, setThemeName }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrate(
  <React.StrictMode>
    <ClientCacheProvider>
      <RemixBrowser />
    </ClientCacheProvider>
  </React.StrictMode>,
  document
);
