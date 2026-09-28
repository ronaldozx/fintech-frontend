import type { ReactNode } from "react";
import { Actions, Body, Container, Header, Title } from "./style";

type FrameProps = {
    title: string;
    actions?: ReactNode;
    fit?: boolean;
    children: ReactNode;
};

export function Frame({ title, actions, fit = false, children }: FrameProps) {
    return (
        <Container $fit={fit}>
            <Header>
                <Title>{title}</Title>
                {actions && <Actions>{actions}</Actions>}
            </Header>
            <Body>{children}</Body>
        </Container>
    );
}
