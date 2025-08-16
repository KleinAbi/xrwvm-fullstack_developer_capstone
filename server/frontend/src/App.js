import LoginPanel from "./components/Login/Login";
import Register from "./components/Register/Register";  // 👈 Import Register
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />  {/* 👈 Add Register route */}
    </Routes>
  );
}

export default App;
