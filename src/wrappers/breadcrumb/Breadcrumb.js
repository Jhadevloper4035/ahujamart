import PropTypes from "prop-types";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";

const BreadcrumbWrap = ({pages}) => {
  return (
    <div className="breadcrumb-area pt-35 pb-35 bg-gray-3 d-flex justify-content-center "  style={{
      backgroundImage: "url('/assets/img/banner/banner5.jpg')",
      backgroundSize: "cover", 
      backgroundPosition: "center",
      height : "230px"
    }}>
      <div className="container d-flex justify-content-center">
        <Breadcrumb style={{display : "flex" , justifyContent :"center" , alignItems : "center"}}>
            {pages?.map(({ path, label }, i) => i !== pages.length - 1 ? (
                <Breadcrumb.Item key={label} linkProps={{to: path}} linkAs={Link}>
                  {label}
                </Breadcrumb.Item>
            ) : (                
              <Breadcrumb.Item key={label} active>
                {label}
              </Breadcrumb.Item>
            ))}
        </Breadcrumb>
      </div>
    </div>
  );
};

BreadcrumbWrap.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })).isRequired
}

export default BreadcrumbWrap;
