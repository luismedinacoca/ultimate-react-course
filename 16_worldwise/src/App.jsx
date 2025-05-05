import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";

import HomePage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";

const BASE_URL = "http://localhost:9000"

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json();
        setCities(data);
      } catch(err) {
        alert('There was an error loading data...')
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

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
          <Route index element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
          <Route path="form" element={<p>Form 💼 </p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>  
    </BrowserRouter>
  )
}

export default App
