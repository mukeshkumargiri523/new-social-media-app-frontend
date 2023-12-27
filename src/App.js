import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import { Navigate, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <div className="blur" style={{ top: "33%", left: "4rem" }}></div>
      <div className="blur" style={{ top: "10%", right: "10rem" }}></div>
      <div
        className="blur"
        style={{ top: "70%", left: "15rem", backgroundColor: "#83f2dd" }}
      ></div>
      <div
        className="blur"
        style={{ top: "70%", right: "4rem", backgroundColor: "#83f2dd" }}
      ></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>

      {/* <Home /> */}
      {/* <Profile /> */}
      {/* <Auth /> */}
    </div>
  );
}

export default App;
