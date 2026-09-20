import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthScreen } from "./pages/auth"
import { Home } from "./pages/home"
import { GlobalStyle } from "./styles/GlobalStyles"
import { GuestRoute, ProtectedRoute } from "./components/routeGuard"

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route element={<GuestRoute/>}>
          <Route path="/" element={<AuthScreen/>}/>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
