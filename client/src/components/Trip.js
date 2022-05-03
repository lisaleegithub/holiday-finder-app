import { useState } from "react";
import TripForm from "./TripForm";
import Holiday from "./Holiday";

const Trip = () => {
    // 1. create state
    const [holidays, setHolidays] = useState(null)
    const [message, setMessage] = useState("Find Holidays!");

    // 2. create a function that will be called in child
    // passing a function parent to child
    const getTrip = (e) => {
        e.preventDefault();
        let dateObj = new Date(e.target.elements.traveldate.value)
        let country = e.target.elements.country.value;
        let month = dateObj.getUTCMonth() + 1;
        let year = dateObj.getUTCFullYear();
        // console.log("country entered is", country);
        // console.log("year entered is", year);

        // add to request body
        fetch(`/api/holidays?country=${country}&month=${month}&year=${year}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.response.holidays.length !== 0) {
                    setHolidays(data.response.holidays);
                    console.log("data.res.holidays", data.response.holidays);
                } else {
                    setMessage("No holidays");
                }
            })
            .catch((err) => console.error(`Error: ${err}`));
    }

    return (
        <div>
            <h2>Holiday Finder</h2>
            <TripForm getTrip={getTrip} />
            {!holidays ? (<p>{message}</p>) : (<Holiday days={holidays} />)}
        </div>
    )
}

export default Trip;