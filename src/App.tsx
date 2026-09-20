import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthScreen } from "./pages/auth"
import { Home } from "./pages/home"
import { GlobalStyle } from "./styles/GlobalStyles"

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<AuthScreen/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
