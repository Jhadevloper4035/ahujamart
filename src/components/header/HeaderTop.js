import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({ borderStyle }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const currency = useSelector((state) => state.currency);
  return (
    <div
      className={clsx(
        "header-top-wap",
        borderStyle === "fluid-border" && "border-bottom"
      )}
    >
      <LanguageCurrencyChanger currency={currency} />

      <div className="header-offer">
        <p>{user.user && user.user.email ? user.user.email : "Welcome user"}</p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTop;
