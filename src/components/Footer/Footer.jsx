import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.scss"

export function Footer() {
  const [t] = useTranslation();

  function getPath(lang) {
    return window.location.href.replace(/\/(en|es|uk)\//, `/${lang}/`);
  }

  return <div className="footer">
    <ul className="footer__section">
      <li><Link to="/">{t("About us")}</Link></li>
      <li><Link to="/">{t("Partnership")}</Link></li>
      <li><Link to="/">{t("Contact us")}</Link></li>
      <li><Link to="/">{t("Terms of use")}</Link></li>
    </ul>

    <ul className="footer__section">
      <li><a href={getPath("es")}>Español</a></li>
      <li>|</li>
      <li><a href={getPath("uk")}>Українська</a></li>
      <li>|</li>
      <li><a href={getPath("en")}>English</a></li>
    </ul>
  </div>
}
