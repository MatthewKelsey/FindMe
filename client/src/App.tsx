import "./App.css";
import Search from "./components/Search";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Results from "./components/Results";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Search />

        <Routes>
          <Route path="/:paramAddress" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
