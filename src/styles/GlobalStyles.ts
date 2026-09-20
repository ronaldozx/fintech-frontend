import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #0B0E14;
    color: #E2E8F0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background-color: #050810;
    background-image:
        radial-gradient(ellipse 80% 60% at 10% 20%, rgba(79,209,197,0.13) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 80%, rgba(56,178,172,0.09) 0%, transparent 55%),
        radial-gradient(ellipse 40% 40% at 50% 50%, rgba(15,30,60,0.8) 0%, transparent 80%);
    position: relative;
    background-size: 100% 100%; 
    background-repeat: no-repeat; 
    background-attachment: fixed;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(79,209,197,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,209,197,0.04) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
        pointer-events: none;
        z-index: 0; 
    }

    &::after {
        content: '';
        position: absolute;
        left: 0; right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(79,209,197,0.3), rgba(79,209,197,0.6), rgba(79,209,197,0.3), transparent);
        top: 40%;
        pointer-events: none;
        z-index: 0;
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0B0E14;
  }
  ::-webkit-scrollbar-thumb {
    background: #21262D;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #4FD1C5;
  }
`;