import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Carusel.css";
import { useStateValue } from "../context";
import { useTranslation } from "react-i18next";

function CustomCarousel({ search }) {
    const totalCarouselItems = 15;
    const itemsPerPage = 5;
    const [index, setIndex] = useState(0);
    const [carouselProducts, setCarouselProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { setWishlist, wishlist, setCart, cart } = useStateValue();

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((data) => {
                setCarouselProducts(data.products.slice(0, totalCarouselItems));
                setAllProducts(data.products);
                setSortedProducts(data.products);
            });
    }, []);


    const {t,i18n} = useTranslation();


    const filteredProducts = sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const nextSlide = () => {
        if (index < totalCarouselItems - itemsPerPage) {
            setIndex((prevIndex) => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (index > 0) {
            setIndex((prevIndex) => prevIndex - 1);
        }
    };

    const sortByPriceAsc = () => {
        const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
    };

    const sortByPriceDesc = () => {
        const sorted = [...sortedProducts].sort((a, b) => b.price - a.price);
        setSortedProducts(sorted);
    };

    const sortByRatingAsc = () => {
        const sorted = [...sortedProducts].sort((a, b) => a.rating - b.rating);
        setSortedProducts(sorted);
    };

    const sortByRatingDesc = () => {
        const sorted = [...sortedProducts].sort((a, b) => b.rating - a.rating);
        setSortedProducts(sorted);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} style={{ color: i < rating ? "gold" : "lightgray", fontSize: "18px" }}>
                ★
            </span>
        ));
    };

    const addWishlist = (product) => {
        setWishlist((prev) => {
            const wishlistArray = Array.isArray(prev) ? prev : [];
            if (wishlistArray.some((item) => item.id === product.id)) {
                return wishlistArray;
            }
            return [...wishlistArray, product];
        });
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const cartArray = Array.isArray(prev) ? prev : [];
            const existingProduct = cartArray.find((item) => item.id === product.id);
            if (existingProduct) {
                return cartArray.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...cartArray, { ...product, quantity: 1 }];
        });
    };

    return (
        <div>
            <div className="sort-buttons">
                <button className="reginch" onClick={sortByPriceAsc}>{t("price")}</button>
                <button className="reginch" onClick={sortByPriceDesc}>{t("pricetwo")}</button>
                <button className="reginch" onClick={sortByRatingAsc}>{t("rating")}</button>
                <button className="reginch" onClick={sortByRatingDesc}>{t("ratingtwo")}</button>
            </div>

            <div className="carousel-container">
                <button className="carousel-btn left" onClick={prevSlide} disabled={index === 0}>
                    ❮
                </button>

                <div className="carousel-wrapper">
                    {carouselProducts.slice(index, index + itemsPerPage).map((product) => (
                        <div key={product.id} className="carousel-box">
                            <img src={product.thumbnail} alt={product.title} className="carousel-img" />
                            <h5>{product.title}</h5>
                            <p> {t("prics")} : ${product.price}</p>
                            <p> {t("ratings")} : {renderStars(Math.round(product.rating))}</p>

                            <button
                                className="wishlistbtn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addWishlist(product);
                                }}
                            >
                                ❤️ {t("wishlist")}
                            </button>

                            <button
                                className="cartbtn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                            >
                                🛒 {t("savat")}
                            </button>
                        </div>
                    ))}
                </div>

                <button className="carousel-btn right" onClick={nextSlide} disabled={index >= totalCarouselItems - itemsPerPage}>
                    ❯
                </button>
            </div>

            {showModal && selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={closeModal}>✖️</button>
                        <div className="modal-img-container">
                            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="modal-img" />
                        </div>
                        <h5>{selectedProduct.title}</h5>
                        <p>{selectedProduct.description}</p>
                        <p> {t("prics")} : ${selectedProduct.price}</p>
                        <p> {t("ratings")} : {renderStars(Math.round(selectedProduct.rating))}</p>
                        <button className="reginch" onClick={() => navigate(`/product/${selectedProduct.id}`)}>
                            {t("modalbtn")}
                        </button>
                    </div>
                </div>
            )}

            <div className="products_div">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bx_div" onClick={() => openModal(product)}>
                        <img src={product.thumbnail} alt={product.title} className="product-img" />
                        <h5>{product.title}</h5>
                        <p> {t("prics")} : ${product.price}</p>
                        <p> {t("ratings")} : {renderStars(Math.round(product.rating))}</p>
                        <button
                            className="wishlistbtn"
                            onClick={(e) => {
                                e.stopPropagation();
                                addWishlist(product);
                            }}
                        >
                            ❤️ {t("wishlist")}
                        </button>

                        <button
                            className="cartbtn"
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                        >
                            🛒 {t("savat")}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CustomCarousel;