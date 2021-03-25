import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import MainPage from "./MainPage";
import CoverPage from "./CoverPage";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={CoverPage} />
                    <Route path="/main" component={MainPage} />
                </div>
            </BrowserRouter>
        </div>
    )
}


export default App;

