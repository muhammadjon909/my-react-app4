import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./Modal";
import "./Navbar.css";
import { memo } from "react";
import { useStateValue } from "../context";
import { useTranslation } from "react-i18next";

function NeonNavbar({ setSearch }) {
    const handleSearch = useCallback((e) => {
        setSearch(e.target.value.toLowerCase());
    }, [setSearch]);

    const { t, i18n } = useTranslation();

    const loggin = () => {
        i18n.changeLanguage(i18n.language === "uz" ? "ru" : "uz");
    };

    const { wishlist, cart } = useStateValue();

    return (
        <nav className="neon-navbar">
            <div className="neon-brand">Asaxiy</div>
            <ul className="neon-links">
                <li>
                    <Link to="/">{t("home")}</Link>
                </li>
            </ul>

            <div className="neon-search">
                <input
                    type="search"
                    placeholder="Search products..."
                    onChange={handleSearch}
                />
            </div>

            <div className="neon-icons">
                <Link to="/wishlist">
                    ❤️ <p>{wishlist.length}</p>
                </Link>
            </div>

            <div className="neon-icons">
                <Link to="/magazen">
                    🛒 <p>{cart.length}</p>
                </Link>
            </div>

            <div>
                <button className="neon-lang-btn" onClick={loggin}>{t("lang")}</button>
            </div>

            <LoginModal />
        </nav>
    );
}

export default memo(NeonNavbar);