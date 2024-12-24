import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div className={clsx("copyright", spaceBottomClass, colorClass)}>
      <div className="footer-logo">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src="/assets/img/logo/logo-2.png" style={{ maxHeight: "60px" , marginTop: "-80px"}}  />
        </Link>
      </div>
      <p> 
      Shop No-116, Ina Market, Delhi - 110022 (Opposit Delhi Haat)
      </p>
      <p> <a href="tel:+91-8130692020"> +91-8130692020 </a> </p>
      <p> <a href="mailto:info@ahujamart.com">info@ahujamart.com </a> </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string
};

export default FooterCopyright;
