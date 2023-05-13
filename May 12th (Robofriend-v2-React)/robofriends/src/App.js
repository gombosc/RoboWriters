import React from "react";
import CardList from "./CardList";
import { robots } from "./robots";
import Searchbox from "./Searchbox"

const App = () => {
    return(
        <div className="tc">
            <h1>Monster Writers</h1>
            <Searchbox />
            <CardList robots={robots} />
        </div>
    )
}

export default App;