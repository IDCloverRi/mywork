import VxspList from "./component/VxspList";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VxspTable from "./component/table/table";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VxspList />} />
          <Route path="table" element={<VxspTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
