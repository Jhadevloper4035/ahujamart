import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      )}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>{t("Home")}</Link>
          </li>

          <li>
            <Link to={process.env.PUBLIC_URL + "/about"}>
              {t("About Us")}
            </Link>
          </li>

          <li>
            <Link to={process.env.PUBLIC_URL + "/exclusive-collection"}>
              {t("collection")}
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
            <Link to={process.env.PUBLIC_URL + "/exclusive-collection"}>
              {t("Grocery")}
            </Link>
          </li>

          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("contact_us")}
            </Link>
          </li>

      
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
