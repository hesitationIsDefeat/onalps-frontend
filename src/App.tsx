import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import './App.css'
import ChoosePage from "./pages/brand/ChoosePage";
import CreateAiInfuPage from "./pages/brand/CreateAiInfuPage";
import CreatePostPage from "./pages/brand/CreatePostPage";
import CreateBrandPage from "./pages/marketplace/CreateBrandPage";
import SocialFeed from "./pages/user/SocialFeed";
import { BrandPage } from "./pages/user/BrandPage";
import BrandFeed from "./pages/user/BrandFeed";
import AiInfusPage from "./pages/brand/AiInfusPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/marketplace/create/brand/marketplace/:marketplaceId" element={<CreateBrandPage />} />
        <Route path="/brand/choose/marketplace/:marketplaceId/brand/:brandId" element={<ChoosePage />} />
        <Route path="/brand/ai/marketplace/:marketplaceId/brand/:brandId" element={<AiInfusPage />} />
        <Route path="/brand/create/ai/marketplace/:marketplaceId/brand/:brandId" element={<CreateAiInfuPage />} />
        <Route path="/brand/create/post/marketplace/:marketplaceId/brand/:brandId" element={<CreatePostPage />} />
        <Route path="/user/social_feed/marketplace/:marketplaceId" element={<SocialFeed />} />
        <Route path="/user/brand_page/marketplace/:marketplaceId/brand/:brandId" element={<BrandPage />} />
        <Route path="/user/brand_feed/marketplace/:marketplaceId/brand/:brandId/index/:index" element={<BrandFeed />} />
      </Routes>
    </Router>
  );
}

export default App
