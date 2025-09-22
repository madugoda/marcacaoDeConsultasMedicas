import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      error: string;
      success: string;
      warning: string;
      white: string;
      border: string;
    };
    typography: {
      title: {
        fontSize: number;
        fontWeight: string;
      };
      subtitle: {
        fontSize: number;
        fontWeight: string;
      };
      body: {
        fontSize: number;
        fontWeight: string;
      };
      caption: {
        fontSize: number;
        fontWeight: string;
      };
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
  }
}
