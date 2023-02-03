import logo from "./logo.svg";
import axios from "axios";
import Auth from "./components/Auth";
import { react, useState, useEffect } from "react";
import Restaurants from "./components/Restaurants";

import "./App.css";

function App() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [token, settoken] = useState(null);

    useEffect(() => {
        const tok = localStorage.getItem("token");
        if (tok) {
            setIsLoggedin(true);
        }
        settoken(tok);
    }, []);

    const login = async (data) => {
        console.log(data);
        const res = await axios.post("http://localhost:8000/auth/login", data);
        localStorage.setItem("token", res.data);
        settoken(res.data);
        setIsLoggedin(true);
    };

    // const register = async () => {
    //     const res = await axios.get("http://localhost:8000/auth/register");
    // };

    return (
        <div className="App">
            {isLoggedin && <p>logged in</p>}
            <Auth onLogin={login}></Auth>
            {isLoggedin && <Restaurants token={token}></Restaurants>}
        </div>
    );
}

export default App;
