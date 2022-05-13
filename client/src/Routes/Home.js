import React from "react";
import Landing from "../components/Landing";
import Login from "../components/Login";
import Trip from "../components/Trip";

export default function Home({ user }) {
    return (
        <header>
            <Login user={user}/>
            {user ? <Trip user={user} /> : (<Landing/>)}
        </header>
    )
}