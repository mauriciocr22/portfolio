import i18next from "i18next";
import languages from "./locales";
import { initReactI18next } from "react-i18next";

export default i18next.use(initReactI18next).init({
  debug: true,
  resources: languages,
  fallbackLng: "ptBr",
  interpolation: {
    escapeValue: false,
  },
});
