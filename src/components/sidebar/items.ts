import { faHome, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type NavItemConfig = {
    path: string;
    label: string;
    icon: IconDefinition;
};

export const NAV_ITEMS: NavItemConfig[] = [
    { path: "/home", label: "Visão geral", icon: faHome },
];
