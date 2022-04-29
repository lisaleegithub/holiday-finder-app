import { useState } from "react";
import TripForm from "./TripForm";
import Holiday from "./Holiday";

const Trip = () => {
    // 1. create state
    const [holidays, setHolidays] = useState(null)

    // 2. create a function that will be called in child
    // passing a function parent to child
    const getTrip = (e) => {
        e.preventDefault();
        let country = e.target.elements.country.value;
        console.log("this is country", country);
        // add to request body
        fetch(`http://localhost:5000/api/holidays?country=${country}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setHolidays(data.response.holidays);
                console.log("data.res.holidays", data.response.holidays);
            })
            .catch((err) => console.error(`Error: ${err}`));
    }

    return (
        <div>
            <h2>Holidays</h2>
            <TripForm getTrip={getTrip} />
            {!holidays ? (<p>Please search for your holidays</p>) : (<Holiday days={holidays}/>)}
        </div>
    )
}

export default Trip;