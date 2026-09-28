import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, NavGroup, NavItem } from "./style";
import { NAV_ITEMS } from "./items";

export function Sidebar() {
    return (
        <Container aria-label="Navegação principal">
            <NavGroup>
                {NAV_ITEMS.map((item) => (
                    <NavItem key={item.path} to={item.path} title={item.label} aria-label={item.label}>
                        <FontAwesomeIcon icon={item.icon} />
                    </NavItem>
                ))}
            </NavGroup>
        </Container>
    );
}
