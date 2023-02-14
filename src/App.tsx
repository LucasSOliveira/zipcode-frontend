import { Routes, Route } from "react-router-dom";
import Main from "./pages/main"
import Home from "./pages/home"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
