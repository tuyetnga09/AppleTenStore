import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../translation/i18n";
import { readAll } from "../../service/size.service";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import queryString from "query-string";

const Functional = () => {
  const { t } = useTranslation();

  const changeLocaleEn = () => {
    // i18n.options.fallbackLng = "en";
    // i18n.language = "en";
    // i18n.languages[0] = "en";
    // i18n.resolvedLanguage = "en";
    // i18n.store.options.lng = "en";
    i18n.translator.language = "en";
  };

  const changeLocaleVi = () => {
    // i18n.options.fallbackLng = "vi";
    // i18n.language = "vi";
    // i18n.languages[0] = "vi";
    // i18n.resolvedLanguage = "vi";
    // i18n.store.options.lng = "vi";
    i18n.translator.language = "vi";
    console.log();
  };

  const [filters, setFilters] = useState({
    page: 0,
    key: "",
  });

  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const paramsString = queryString.stringify(filters);
    readAll(paramsString)
      .then((response) => {
        console.log(response.data);
        setDisplay(response.data.content);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, [filters]);

  return (
    <div className="col-md-6">
      <div className="card p-2">
        <div className="card-body">
          <h5 class="card-title">{t("content.class")}</h5>
          {display.map((dl) => {
            return <h5 class="card-title">{t(dl.code)}</h5>;
          })}
        </div>
        <Link to="#">
          <button onClick={changeLocaleEn}>En</button>
        </Link>
        <Link to="#">
          <button onClick={changeLocaleVi}>Vi</button>
        </Link>
      </div>
    </div>
  );
};

export default Functional;
