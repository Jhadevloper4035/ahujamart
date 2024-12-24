import clsx from "clsx";
import CategoryFiveSingle from "../../components/category/CategoryFiveSingle";
import categoryData from "../../data/category/category-five.json";

const CategoryFiveGrid = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("category-grid-area", spaceBottomClass)} style={{ marginTop : "60px", marginBottom : "60px"}}>
       <div className="welcome-content text-center">
          <h1 style={{textTransform : "capitalize"}}>explore our categories </h1>
        </div>
      <div className="container">
        <div className="row">
          {categoryData?.map((single, key) => (
            <div className="col-lg-3 col-md-3  col-sm-3 mb-30" key={key}>
              <CategoryFiveSingle data={single} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFiveGrid;
