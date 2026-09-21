import { faBullseye, faCalendarDays, faHome, faLightbulb, faReceipt, faWallet, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type NavItemConfig = {
    path: string;
    label: string;
    icon: IconDefinition;
};

export const NAV_ITEMS: NavItemConfig[] = [
    { path: "/home", label: "Visão geral", icon: faHome },
    { path: "/transacoes", label: "Transações", icon: faReceipt },
    { path: "/contas", label: "Contas e cartões", icon: faWallet },
    { path: "/orcamentos", label: "Orçamentos e metas", icon: faBullseye },
    { path: "/insights", label: "Insights", icon: faLightbulb },
    { path: "/agenda", label: "Agenda", icon: faCalendarDays },
];
