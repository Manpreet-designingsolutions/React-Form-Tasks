import { Routes, Route } from "react-router-dom";
import ControlledForm from "./Components/ControlledForm";
import UnControlledForm from "./Components/UnControlledForm";
import CustomUnControlledForm from "./Components/CustomUnControlledForm";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ControlledForm />} />
        <Route path="/uncontrolled" element={<UnControlledForm />} />
        <Route path="/custom" element={<CustomUnControlledForm />} />

      </Routes>

    </>
  );
}

export default App;
