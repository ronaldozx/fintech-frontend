import type { ReactNode } from "react";
import { Header, Heading, Toolbar } from "./style";

type PageHeaderProps = {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
};

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
    return (
        <Header>
            <Heading>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </Heading>
            {actions && <Toolbar>{actions}</Toolbar>}
        </Header>
    );
}
