import React from "react";
import "tachyons";

const Card = ( {id, name, username, email} ) => {
    return(
        <>
        <div className="bg-light-yellow dib br3 pa3 ma2 grow bw2 shadow-5"> 
            <img src={` https://robohash.org/${id}?set=set2&size=250x250 `} alt={name}/>
            <div>
                <h2> {name} </h2>
                <h3> User: {username} </h3>
                <p> Email: {email} </p>
            </div>
        </div>
        </>
    );
}

export default Card;