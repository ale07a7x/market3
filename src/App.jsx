import { Routes, Route } from "react-router-dom";
import Pay from "./components/Pay";
import Welcome from "./components/Welcome";
import Success from "./components/Success"

function App() {
  return (
    <div className="min-h-screen bg-fondo p-4">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
