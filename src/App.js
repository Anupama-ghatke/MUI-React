import './App.css';
import DataCollections from './pages/data/data.component';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList/Product.Component';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DataCollections/>} />
        <Route path='/product-list' element={<ProductList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
