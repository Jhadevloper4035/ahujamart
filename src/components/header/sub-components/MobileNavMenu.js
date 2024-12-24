import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavMenu = () => {
  const { t } = useTranslation();

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>{t("Home")}</Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>{t("About Us ")}</Link>
        </li>

        {/* 
        <li className="menu-item-has-children">
        <Link to={process.env.PUBLIC_URL + "/exclusive-collection"}>
              {t("collection")}
            </Link>
          <ul className="sub-menu">
          </ul>
        </li> */}

        <li>
          <Link to={process.env.PUBLIC_URL + "/exclusive-collection"}>
            {t("collection ")}
          </Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/exclusive-fruits"}>
            {t("Fruits ")}
          </Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/exclusive-vegetable"}>
            {t("Vegetable ")}
          </Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/exclusive-dairy"}>
            {t("Diary ")}
          </Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
