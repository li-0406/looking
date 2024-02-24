import "./app.scss";
import Home from "./pages/Home";
import HotelsLists from "./pages/HotelsLists";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orderslist from "./pages/backStage/Orderslist";
import Hotelslist from "./pages/backStage/Hotelslist";
import Roomslist from "./pages/backStage/Roomslist";
import Userslist from "./pages/backStage/Userslist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotelsLists" element={<HotelsLists />} />
          <Route path="/hotel/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* 後台 */}
          <Route path="/orderslist" element={<Orderslist />} />
          <Route path="/hotelslist" element={<Hotelslist />} />
          <Route path="/roomslist/:id" element={<Roomslist />} />
          <Route path="/userslist" element={<Userslist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
