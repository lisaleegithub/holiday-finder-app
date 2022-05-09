import { useState, useEffect } from "react";
import TripForm from "./TripForm";
import Holiday from "./Holiday";

const Trip = () => {
    const [holidays, setHolidays] = useState(null)
    const [message, setMessage] = useState("Find Holidays!");
    const [trips, setTrips] = useState([{
        country: "",
        traveldate: "",
    }])

    const getHolidays = (e) => {
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

    useEffect(() => {
        fetch("/api/trips")
            .then((response) => response.json())
            .then(trips => {
                setTrips(trips);
            })
    }, []);

    // function to handle add to list functionality
    const addTrips = (newTrip) => {
        setTrips((trips) => [...trips, newTrip]);
        console.log("line 41 trips", trips);
    }

    return (
        <div>
            <div>
                <h2>Holiday Finder</h2>
                <TripForm addTrips={addTrips} getHolidays={getHolidays} />
                {holidays ? (<Holiday days={holidays} />) : (<p>{message}</p>)}
            </div>
            <div className="list-column">
                <h2> List of Trips </h2>
                <ul className="list-container">
                    {trips.map((trip, index) =>
                        <li key={index}>
                            <ul className="circle">
                                <li>{trip.country}</li>
                                <li>{trip.traveldate}</li>
                            </ul>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Trip;