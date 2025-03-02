import { useStateValue } from "../context";
import { useNavigate } from "react-router-dom";
import "./Magazen.css";
import { useTranslation } from "react-i18next";

const NeonCart = () => {
    const { cart, setCart } = useStateValue();
    const navigate = useNavigate();

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((product) => product.id !== id));
    };

    const increaseQuantity = (id) => {
        setCart((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, quantity: (product.quantity || 1) + 1 }
                    : product
            )
        );
    };

    const { t, i18n } = useTranslation();

    return (
        <div className="neon-cart-container">
            <h2>🛒 Neon Cart</h2>

            {cart.length === 0 ? (
                <p>{t("cartop")} 🛒</p>
            ) : (
                <div className="neon-cart-grid">
                    {cart.map((product) => (
                        <div key={product.id} className="neon-cart-box">
                            <img src={product.thumbnail} alt={product.title} className="neon-cart-img" />
                            <h5>{product.title}</h5>
                            <p> {t("prics")} : ${product.price * (product.quantity || 1)}</p>
                            <p> {t("ratings")} : {Array(Math.round(product.rating)).fill("⭐️").join("")}</p>
                            <p> {t("countity")} : {product.quantity || 1}</p>

                            <div className="neon-cart-buttons">
                                <button
                                    className="neon-quantity-btn"
                                    onClick={() => increaseQuantity(product.id)}
                                >
                                    {t("Zakaz")}
                                </button>

                                <button
                                    className="neon-remove-btn"
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    {t("remove")}
                                </button>

                                <button
                                    className="neon-details-btn"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    ℹ️ {t("details")}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NeonCart;