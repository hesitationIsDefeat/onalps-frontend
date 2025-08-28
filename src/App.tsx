import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import './App.css'
import ChoosePage from "./pages/brand/ChoosePage";
import CreateAiInfuPage from "./pages/brand/CreateAiInfuPage";
import CreatePostPage from "./pages/brand/CreatePostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/brand/choose" element={<ChoosePage />} />
        <Route path="/brand/create/ai" element={<CreateAiInfuPage />} />
        <Route path="/brand/create/post" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
}

export default App
