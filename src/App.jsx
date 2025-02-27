import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/Navbar";
import CustomCarousel from "./components/carusel/Carusel";
import ProductDetail from "./productsdetail/ProductDetail";
import { useState } from "react";
import Footer from "./components/footer/Footer";
import Magazen from "./components/magazen/Magazen";
import Wishlist from "./components/wishlist/Wishlist";
import "./components/utils/i18n";

function App() {
    const [search, setSearch] = useState("");

    return (
        <>
            <header>
                <Navbar setSearch={setSearch} />
                <Routes>
                    <Route path="/" element={<CustomCarousel search={search} />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/magazen" element={<Magazen />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
                <Footer />
            </header>
        </>
    );
}

export default App;