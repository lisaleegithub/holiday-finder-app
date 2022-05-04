import { useState } from "react";
import TripForm from "./TripForm";
import Holiday from "./Holiday";

const Trip = () => {
    const [holidays, setHolidays] = useState(null)
    const [message, setMessage] = useState("Find Holidays!");

    const getTrip = (e) => {
        e.preventDefault();
        let dateObj = new Date(e.target.elements.traveldate.value)
        let country = e.target.elements.country.value;
        let month = dateObj.getUTCMonth() + 1;
        let year = dateObj.getUTCFullYear();

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
            {holidays ? (<Holiday days={holidays} />) : (<p>{message}</p>)}
        </div>
    )
}

export default Trip;