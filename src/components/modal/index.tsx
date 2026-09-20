import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { Overlay, Dialog, Header, Title, CloseButton, Body, Footer } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
};

function ensureBodyExists() {
  if (typeof document === "undefined") return null;
  let root = document.getElementById("modal-root");
  if (!root) {
    root = document.createElement("div");
    root.setAttribute("id", "modal-root");
    document.body.appendChild(root);
  }
  return root;
}

export function Modal({ isOpen, onClose, title, children, footer, closeOnOverlayClick = true }: ModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const root = ensureBodyExists();
  if (!root) return null;

  const content = (
    <Overlay onMouseDown={(e) => { if (closeOnOverlayClick && e.target === e.currentTarget) onClose(); }}>
      <Dialog role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : 'Modal'} onMouseDown={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseButton aria-label="Fechar" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </Header>
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Dialog>
    </Overlay>
  );

  return createPortal(content, root);
}

export default Modal;
