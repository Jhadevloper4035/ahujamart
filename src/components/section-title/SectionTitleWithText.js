import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h1 style={{textTransform : "capitalize"}}>Ahuja Mart collection of the week</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt labor et dolore magna aliqua. Ut enim ad
            minim veniam,
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
