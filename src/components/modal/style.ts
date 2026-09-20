import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2,6,10,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  backdrop-filter: blur(4px);
`;

export const Dialog = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 16px;
  background: rgba(5,8,16,0.98);
  background-color: #050810;
  background-image:
        radial-gradient(ellipse 80% 60% at 10% 20%, rgba(79,209,197,0.13) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 80%, rgba(56,178,172,0.09) 0%, transparent 55%),
        radial-gradient(ellipse 40% 40% at 50% 50%, rgba(15,30,60,0.8) 0%, transparent 80%);  
  border: 1px solid rgba(79,209,197,0.08);
  border-radius: 12px;
  box-shadow: 0 12px 36px rgba(2,6,10,0.6);
  padding: 20px;
  color: #E6EEF6;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform-origin: center top;
  animation: modalShow 220ms cubic-bezier(.2,.9,.3,1) both;

  @keyframes modalShow {
    from {
      transform: translateY(-8px) scale(0.995);
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
  font-size: 16px;
  color: #F0F4F8;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: background 120ms ease, color 120ms ease;

  &:hover {
    background: rgba(255,255,255,0.02);
    color: #D1EDEA;
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
