import "./app.scss";
import Home from "./pages/Home";
import HotelsLists from "./pages/HotelsLists";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BackOrderslist from "./pages/backStage/BackOrderslist";
import BackHotelslist from "./pages/backStage/BackHotelslist";
import BackRoomslist from "./pages/backStage/BackRoomslist";
import BackUserslist from "./pages/backStage/BackUserslist";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* basename="/looking" */}
      <BrowserRouter basename="/looking">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotelsLists" element={<HotelsLists />} />
          <Route path="/hotel/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* 後台 */}
          <Route path="/backOrderslist" element={<BackOrderslist />} />
          <Route path="/backHotelslist" element={<BackHotelslist />} />
          <Route path="/backRoomslist/:id" element={<BackRoomslist />} />
          <Route path="/backUserslist" element={<BackUserslist />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
