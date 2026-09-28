import type { ReactNode } from "react";
import { Actions, Body, Container, Header, Title } from "./style";

type FrameProps = {
    title: string;
    actions?: ReactNode;
    children: ReactNode;
};

export function Frame({ title, actions, children }: FrameProps) {
    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                {actions && <Actions>{actions}</Actions>}
            </Header>
            <Body>{children}</Body>
        </Container>
    );
}
