import { Route, Routes } from "react-router-dom";
import PaymentComponent from "./components/PaymentComponent";

function App() {
  return (
      <Routes>
        <Route path="/card-verify" element={<PaymentComponent />} />
      </Routes>
  );
}

export default App;
