import React from "react";

const Searchbox = ({searchChange}) => {
    return(
        <div className="pa1">
            <input 
            className="fa1 pa3 ba ma3" 
            type="text" 
            placeholder="Search Writer"
            onChange={searchChange} />
        </div>
    )
}

export default Searchbox;