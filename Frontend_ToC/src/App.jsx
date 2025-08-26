import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import GameDetail from "./pages/GameDetail";
import Category from "./components/category";
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </div>
    </div>
  );
}
