import React from "react";

const localSearch = ({ setKeyword , keyword}) => {

    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
         }


    return (

        <div className="conatiner pt-4 pb-4">  
         <input type="search" placeholder="filter" value={keyword}  onChange={handleSearchChange} className="form-control mb-4"/>
 </div>
    )


}

export default localSearch