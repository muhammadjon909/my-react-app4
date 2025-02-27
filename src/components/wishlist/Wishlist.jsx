import { useStateValue } from "../context";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";
import { useTranslation } from "react-i18next";

const Wishlist = () => {
    const { wishlist, setWishlist } = useStateValue();
    const navigate = useNavigate();

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((product) => product.id !== id));
    };

    const {t,i18n} = useTranslation();

    return (
        <div className="wishlist-container">
            <h2>🛍 Wishlist</h2>

            {wishlist.length === 0 ? (
                <p>{t("wishlistp")} ❤️</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((product) => (
                        <div key={product.id} className="wishlist-box">
                            <img src={product.thumbnail} alt={product.title} className="wishlist-img" />
                            <h5>{product.title}</h5>
                            <p> {t("prics")} : ${product.price}</p>
                            <p> {t("ratings")} : {Array(Math.round(product.rating)).fill("⭐").join("")}</p>

                            <button className="remove-btn" onClick={() => removeFromWishlist(product.id)}>
                                {t("remove")}
                            </button>

                            <button className="details-btn" onClick={() => navigate(`/product/${product.id}`)}>
                                ℹ️ {t("details")}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
