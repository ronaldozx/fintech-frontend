import { useState } from "react";
import { Container, NavGroup, NavButton, Divider } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faGear, faHome, faRobot } from "@fortawesome/free-solid-svg-icons";

export function Sidebar() {
    const [active, setActive] = useState("home");

    return (
        <Container>
            <NavGroup>
                <NavButton $active={active === "home"} onClick={() => setActive("home")}>
                    <FontAwesomeIcon icon={faHome} />
                </NavButton>
                <NavButton $active={active === "card"} onClick={() => setActive("card")}>
                    <FontAwesomeIcon icon={faCashRegister} />
                </NavButton>
                <Divider />
                <NavButton $active={active === "robot"} onClick={() => setActive("robot")}>
                    <FontAwesomeIcon icon={faRobot} />
                </NavButton>
            </NavGroup>

            <NavGroup>
                <NavButton $active={active === "gear"} onClick={() => setActive("gear")}>
                    <FontAwesomeIcon icon={faGear} />
                </NavButton>
            </NavGroup>
        </Container>
    );
}