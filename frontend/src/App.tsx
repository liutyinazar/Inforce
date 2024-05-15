import ProductDetail from "./Components/Product/ProductDetail";
import ProductsList from "./Components/ProductsList/ProductsList";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetail/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
