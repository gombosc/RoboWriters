import React from "react";

const Card = ( {id, name, username, email} ) => {
    return(
        <>
            <div className="tc bg-light-yellow dib br3 pa3 ma2 grow bw2 shadow-5"> 
                <img src={` https://robohash.org/${id}?set=set2&size=250x250 `} alt={name}/>
            </div> 

            <div>
                <h2> {name} </h2>
                <h3> User Name: {username} </h3>
                <p> {email} </p>
            </div>
        </>
    );
}

export default Card;