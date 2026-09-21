import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    background-color: ${theme.colors.background};
    background-image:
        radial-gradient(ellipse 70% 50% at 8% -10%, rgba(34,211,238,0.16) 0%, transparent 60%),
        radial-gradient(ellipse 55% 45% at 100% 0%, rgba(139,92,246,0.14) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 50% 120%, rgba(34,211,238,0.07) 0%, transparent 70%);
    background-attachment: fixed;
    position: relative;

    &::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image:
            linear-gradient(rgba(125,211,252,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(125,211,252,0.035) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(ellipse 85% 75% at 50% 35%, black 0%, transparent 100%);
        pointer-events: none;
        z-index: 0;
    }
  }

  #root {
    position: relative;
    z-index: 1;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    color: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ::selection {
    background: rgba(34,211,238,0.3);
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(125,211,252,0.18);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.accent};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
