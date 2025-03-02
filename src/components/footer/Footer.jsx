import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const NeonFooter = () => {
    const { t, i18n } = useTranslation();

    return (
        <footer className="neon-footer">
            <div className="neon-footer-content">
                <p>&copy; {new Date().getFullYear()} {t("footp")}.</p>
                <ul className="neon-footer-links">
                    <li><a href="/about">{t("footpe")}</a></li>
                    <li><a href="/contact">{t("footpeo")}</a></li>
                    <li><a href="/privacy">{t("footpp")}</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default NeonFooter;