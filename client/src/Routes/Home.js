import React from "react";
import Trip from "../components/Trip";

export default function Home({ user }) {
    return (
        <header>
            {user ? <Trip user={user}/> : (<h3>Please login</h3>)}
        </header>
    )
}