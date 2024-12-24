import PropTypes from "prop-types";
import clsx from "clsx";
import featureIconData from "../../data/feature-icons/feature-icon-seven.json";
import FeatureIconSevenSingle from "../../components/feature-icon/FeatureIconSevenSingle.js";

const FeatureIconSeven = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("support-area", spaceTopClass, spaceBottomClass)}     style={{
      backgroundImage: "url('/assets/img/banner/banner3.jpg')",
      backgroundPosition: "left",
      backgroundSize: "cover",
      backgroundRepeat : "no-repeat"
    }} >
      <div className="container" style={{padding : "60px 0px"}} >
        <div className="welcome-content text-center">
          <h1>Why Choose Ahuja Mart</h1>
        </div>
        <div className="row feature-icon-two-wrap"  style={{ paddingTop : "40px"}} >
          {featureIconData?.map((single, key) => (
            <div className="col-md-4" key={key}>
              <FeatureIconSevenSingle
                data={single}
                spaceBottomClass="mb-30"
                textAlignClass="text-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

FeatureIconSeven.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default FeatureIconSeven;
