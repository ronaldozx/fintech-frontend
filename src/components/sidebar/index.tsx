import { useState } from "react";
import { Container, NavGroup, NavButton, Divider } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faGear, faHome, faRobot } from "@fortawesome/free-solid-svg-icons";

export function Sidebar() {
    const [active, setActive] = useState("home");

    return (
        <Container>
            <NavGroup>
                <NavButton title="Visão geral" aria-label="Visão geral" $active={active === "home"} onClick={() => setActive("home")}>
                    <FontAwesomeIcon icon={faHome} />
                </NavButton>
                <NavButton title="Transações" aria-label="Transações" $active={active === "card"} onClick={() => setActive("card")}>
                    <FontAwesomeIcon icon={faCashRegister} />
                </NavButton>
                <Divider />
                <NavButton title="Assistente" aria-label="Assistente" $active={active === "robot"} onClick={() => setActive("robot")}>
                    <FontAwesomeIcon icon={faRobot} />
                </NavButton>
            </NavGroup>

            <NavGroup>
                <NavButton title="Configurações" aria-label="Configurações" $active={active === "gear"} onClick={() => setActive("gear")}>
                    <FontAwesomeIcon icon={faGear} />
                </NavButton>
            </NavGroup>
        </Container>
    );
}