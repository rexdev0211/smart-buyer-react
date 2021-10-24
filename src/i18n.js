import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: localStorage.getItem("translation") || "en",
    fallbackLng: "en",
    // saveMissing: true,
    keySeparator: false, // we do not use keys in form messages.welcome
    pluralSeparator: '_',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: process.env.NODE_ENV === "development",
  });

export default i18n;
