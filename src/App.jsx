import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import CalculatorPage from './pages/CalculatorPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/calculator" element={<CalculatorPage />} />
    </Routes>
  )
}
