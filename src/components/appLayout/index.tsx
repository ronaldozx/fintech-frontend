import { Outlet } from "react-router-dom";
import { NavBar } from "../navBar";
import { Sidebar } from "../sidebar";
import { Main } from "./style";

export function AppLayout() {
    return (
        <>
            <NavBar />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </>
    );
}
