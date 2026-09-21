import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthScreen } from "./pages/auth"
import { Home } from "./pages/home"
import { Transactions } from "./pages/transactions"
import { Accounts } from "./pages/accounts"
import { Budgets } from "./pages/budgets"
import { Insights } from "./pages/insights"
import { GlobalStyle } from "./styles/GlobalStyles"
import { GuestRoute, ProtectedRoute } from "./components/routeGuard"
import { AppLayout } from "./components/appLayout"

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route element={<GuestRoute/>}>
          <Route path="/" element={<AuthScreen/>}/>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route element={<AppLayout/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/transacoes" element={<Transactions/>}/>
            <Route path="/contas" element={<Accounts/>}/>
            <Route path="/orcamentos" element={<Budgets/>}/>
            <Route path="/insights" element={<Insights/>}/>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
