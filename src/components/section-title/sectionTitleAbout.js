import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithTextAbout = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div 
    className={clsx("welcome-area", spaceTopClass, spaceBottomClass)} 
    style={{
        backgroundImage : "url(/assets/img/banner/banner2.jpg)" ,
        backgroundSize : "cover",
        backgroundPosition : "center",
        backgroundRepeat : "no-repeat"
        }} 
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who We Are</h5>
          <h1>Welcome to Ahuja Mart, your trusted source & one-stop place.  </h1>
          <p>
          Ahuja Mart takes pleasure in presenting a diverse selection of fruits, vegetables, and dairy goods to meet every requirement. We provide everything you need, from common essentials to rare, exotic products. Our commitment to supplying fresh, high-quality materials has made us a popular destination for individuals, restaurants, and companies alike.
          <br/>  <br/>
            It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithTextAbout.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithTextAbout;
