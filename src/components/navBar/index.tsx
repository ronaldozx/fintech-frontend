import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NotificationBell } from "../notificationBell";
import { Container, Logo, LogoMark, LogoText, ContainerRight, DividerV, UserMenu, Avatar, UserInfo, UserName, UserRole, UserSideBar, Content, UserEmail, UserContent, LinkedText } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#050810" strokeWidth="2" strokeLinecap="round">
        <path d="M2 7h10M7 2v10"/>
    </svg>
);

export function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [ menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleModalToggle = () => {
        setMenuOpen(!menuOpen);
    }

    function getInitials(name?: string) {
        if (!name) return "";

        const parts = name.trim().split(" ");

        if (parts.length === 1) {
            return parts[0][0].toUpperCase();
        }

        const first = parts[0][0];
        const last = parts[parts.length - 1][0];

        return (first + last).toUpperCase();
    }

    return (
        <Container>
            <Logo>
                <LogoMark>
                    <PlusIcon />
                </LogoMark>
                <LogoText>Fin<span>tech</span></LogoText>
            </Logo>

            <ContainerRight>
                <NotificationBell />

                <DividerV />

                <div ref={menuRef} style={{ position: "relative" }}>
                    <UserMenu
                        onClick={handleModalToggle}>
                        <Avatar>{getInitials(user?.fullName)}</Avatar>
                        <UserInfo>
                            <UserName>{user?.fullName}</UserName>
                            <UserRole>Pro plan</UserRole>
                        </UserInfo>
                    </UserMenu>
                    {menuOpen && (
                        <UserSideBar>
                            <Content>
                                <UserContent>
                                    <Avatar>
                                        {getInitials(user?.fullName)}
                                    </Avatar>
                                    <UserInfo>
                                        <UserName>{user?.fullName}</UserName>
                                        <UserEmail>{user?.email}</UserEmail>
                                        <UserRole>Pro plan</UserRole>
                                    </UserInfo>
                                </UserContent>
                        
                                <LinkedText onClick={() => { setMenuOpen(false); navigate("/configuracoes"); }}><FontAwesomeIcon icon={faGear} />Configurações</LinkedText>
                                <LinkedText onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} />Sair</LinkedText>
                            </Content>
                        </UserSideBar>
                    )}
                </div>
            </ContainerRight>
        </Container>
    );
}