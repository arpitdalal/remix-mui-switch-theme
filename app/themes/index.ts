import { DEFAULT_THEME } from '~/constants';
import darkTheme from '~/themes/dark';
import lightTheme from '~/themes/light';

import type { Theme } from '@mui/material';

export type ThemeNames = "dark" | "light";

const themes: Record<ThemeNames, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

/**
 * Return the MUI Theme object
 */
export function getTheme(themeName: ThemeNames = DEFAULT_THEME): Theme {
  return themes.hasOwnProperty(themeName)
    ? themes[themeName]
    : themes[DEFAULT_THEME];
}
