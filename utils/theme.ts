/**
 * overrides for themes will go here. We can override things like colors, shadows and etc.
 *
 * https://chakra-ui.com/docs/theming/customize-theme#customizing-theme-tokens
 */

import { extendTheme, ColorModeOptions, Colors } from '@chakra-ui/react';

const config: ColorModeOptions = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const colors: Partial<Colors> = {};

const customTheme = extendTheme({ config, colors });

export default customTheme;
