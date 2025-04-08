import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import './index.css'
import { Navigate } from "react-router-dom"
import { UserProvider } from "./context/UserContext"

const App = () => {
  return (
    <UserProvider>
    <Router>

      <Routes>

        <Route path="/dashboard" element={<Home />} />
        <Route path='/' element={<Navigate to="/dashboard" replace />} />
      </Routes>

    </Router>
    </UserProvider>
  )
}

export default App
