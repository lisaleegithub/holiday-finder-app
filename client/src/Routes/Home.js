import React from "react";
import Landing from "../components/Landing";
import Login from "../components/Login";
import Trip from "../components/Trip";

export default function Home({ user }) {
    return (
        <div className="page">
            <Login user={user} />
            {user ? <Trip user={user} /> : (<Landing />)}
        </div>
    )
}