import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./Modal";
import "./Navbar.css";
import { memo } from "react";
import { useStateValue } from "../context";
import { useTranslation } from "react-i18next";

function CustomNavbar({ setSearch }) {
    const handleSearch = useCallback((e) => {
        setSearch(e.target.value.toLowerCase());
    }, [setSearch]);

    const {t,i18n} = useTranslation();

    const loggin = () => {
        i18n.changeLanguage(i18n.language === "uz" ? "ru" : "uz");
    }

    const { wishlist, cart } = useStateValue();

    return (
        <nav className="custom-navbar">
            <div className="navbar-brand">MyShop</div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">{t("home")}</Link>
                </li>
            </ul>

            <div className="navbar-search">
                <input
                    type="search"
                    placeholder="Search products..."
                    onChange={handleSearch}
                />
            </div>

            <div className="alpest">
                <Link to="/wishlist">
                    ❤️ <p>{wishlist.length}</p>
                </Link>
            </div>

            <div className="alpest">
                <Link to="/magazen">
                    🛒 <p>{cart.length}</p>
                </Link>
            </div>
            
            <div>
                <button className="langss" onClick={loggin}>{t("lang")}</button>
            </div>

            <LoginModal />
        </nav>
    );
}

export default memo(CustomNavbar);