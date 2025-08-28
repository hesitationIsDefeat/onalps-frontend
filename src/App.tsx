import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import './App.css'
import ChoosePage from "./pages/brand/ChoosePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/brand/choose" element={<ChoosePage />} />
      </Routes>
    </Router>
  );
}

export default App
