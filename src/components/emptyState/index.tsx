import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Frame } from "../frame";
import { Description, IconCircle, Title, Wrapper } from "./style";

type EmptyStateProps = {
    icon: IconDefinition;
    title: string;
    description: string;
};

export function EmptyState({ icon, title, description }: EmptyStateProps) {
    return (
        <Frame fit>
            <Wrapper>
                <IconCircle>
                    <FontAwesomeIcon icon={icon} />
                </IconCircle>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </Wrapper>
        </Frame>
    );
}
