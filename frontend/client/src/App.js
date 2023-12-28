import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DoVote from "./Pages/DoVote";
import Success from "./Pages/Success";
import AdminPanel from "./Pages/AdminPanel";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doVote" element={<DoVote />} />
        <Route path="/success" element={<Success />} />
        <Route path='/adminPanel' element={<AdminPanel />} />
        <Route path='/error'   element={<ErrorPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
