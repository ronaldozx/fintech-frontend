import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(4,5,7,0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  backdrop-filter: blur(6px);
`;

export const Dialog = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  margin: 16px;
  padding: 22px;
  color: ${theme.colors.text};
  background: ${theme.colors.panelSolid};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.glow.soft};
  display: flex;
  flex-direction: column;
  gap: 14px;
  transform-origin: center top;
  animation: modalShow 220ms cubic-bezier(.2,.9,.3,1) both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent);
    opacity: 0.7;
  }

  @keyframes modalShow {
    from {
      transform: translateY(-8px) scale(0.99);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const Title = styled.h3`
  margin: 0;
  font-family: ${theme.fonts.display};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.text};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.textMuted};
  cursor: pointer;
  padding: 6px 8px;
  border-radius: ${theme.radius.small};
  transition: background 120ms ease, color 120ms ease;

  &:hover {
    background: ${theme.colors.accentSoft};
    color: ${theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
  }
`;

export const Body = styled.div`
  display: block;
`;

export const Footer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
`;
