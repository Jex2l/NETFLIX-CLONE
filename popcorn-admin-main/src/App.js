import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import MessageState from "./context/states/MessageState";
import Login from "./pages/Login";
import AddWebseries from "./pages/AddWebseries";
import AddEpisode from "./pages/AddEpisode";
import AddSeason from "./pages/AddSeason";
import ChangeCarousel from "./pages/ChangeCarousel";
function App() {
  return (
    <>
      <MessageState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/addmovie" element={<AddMovie />} />
            <Route exact path="/addwebseries" element={<AddWebseries />} />
            <Route exact path="/addepisode" element={<AddEpisode />} />
            <Route exact path="/addseason" element={<AddSeason />} />
            <Route exact path="/change-carousel" element={<ChangeCarousel />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </MessageState>
    </>
  );
}

export default App;
