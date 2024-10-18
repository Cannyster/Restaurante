import { defaultTheme } from '../styles/themes/default';
import 'styled-components';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface defaultTheme extends ThemeType {}
}
