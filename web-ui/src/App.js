import React from 'react';
import Home from "./components/Home";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Favorites from "./components/Favorites";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/favorites">
                    <Favorites/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>

        </Router>
    );
}

export default App;
