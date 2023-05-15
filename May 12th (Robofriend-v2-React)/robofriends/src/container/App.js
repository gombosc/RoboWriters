import React, { useEffect, useState } from "react";
import CardList from "../components/CardList";
import { robots } from "../robots";
import Searchbox from "../components/Searchbox";
import Scroll from "../components/Scroll";

function App () {
    const [searchField, setSearchField] = useState(" ");
    const [robots2, setRobots] = useState(robots);

    // For simplicity sake let's let the onSearchChange filter the robots

    const onSearchChange = ( event ) => {
        const filteredRobots = robots.filter( robot =>{
            return robot.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setSearchField(event.target.value);
        setRobots(filteredRobots); 
    }

    //  ----------------------useEffect Method 

    //   const onSearchChange = (event) =>
    //     {
    //         setSearchField(event.target.value);
    //         console.log(searchField);
    //     }

    // useEffect( () =>{
    //     const filteredRobots = robots.filter(robot =>{
    //         return robot.name.toLocaleLowerCase().includes(searchField)
    //     })
    //     setRobots(filteredRobots)
    // }, 
    // [searchField]);
    // -------------------------------------

    return(
        <div className="tc">
            <h1 className="f1 t">Robo Writers</h1>
            <Searchbox  searchChange = {onSearchChange}/>
            <Scroll>
                <CardList robots={robots2} />
            </Scroll>
        </div>
    )
}

export default App;