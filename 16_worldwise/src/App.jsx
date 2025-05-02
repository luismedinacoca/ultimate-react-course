import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />*/}
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        {/* Nested Routes */}
        <Route path="app" element={<AppLayout />} >
          <Route index element={<p>List of Cities</p>} />
          <Route path="cities" element={<p>List of Cities 🌟 </p>} />
          <Route path="countries" element={<p>Countries 🤡 </p>} />
          <Route path="form" element={<p>Form 💼 </p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>  
    </BrowserRouter>
  )
}

export default App
