import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uzTrans from "./locales/uz.json";
import ruTrans from "./locales/ru.json";

// translation catalog
const resources = {
  uz: {
    translation: uzTrans
  },
  ru: {
    translation: ruTrans
  }
};

// initialize i18next with catalog and language to use
i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "uz",
      lng: "uz",
      interpolation: {
        escapeValue: false
      }
    });

export default i18n;