import { useState, useEffect } from "react";
import TripForm from "./TripForm";
import Holiday from "./Holiday";

const Trip = ({ user }) => {
    const [holidays, setHolidays] = useState(null)
    const [message, setMessage] = useState("Nothing to display yet!");
    const [trips, setTrips] = useState([{
        country: "",
        traveldate: "",
    }])

    const getHolidays = (e) => {
        e.preventDefault();
        let dateObj = new Date(e.target.elements.traveldate.value)
        let country = e.target.elements.country.value;
        fetchHolidays(dateObj, country);
    }

    function fetchHolidays(dateObj, country) {
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
                    setMessage(`No national holidays to display!`);
                }
            })
            .catch((err) => console.error(`Error: ${err}`));
    }

    useEffect(fetchTrips, [user]);

    // function to handle add to list functionality
    const onTripAdded = () => {
        return fetchTrips();
    }

    function fetchTrips() {
        fetch(`/api/${user.id}/trips/`)
            .then((response) => response.json())
            .then(trips => {
                setTrips(trips);
            });
    };

    // a function to handle the Delete functionality
    const onDelete = (trip) => {
        return fetch(`/api/trips/${trip.id}`, {
            method: "DELETE"
        }).then((response) => {
            if (response.ok) {
                fetchTrips();
            }
        })
    }

    // to formate date and time
    function formatDate(input) {
        let date = new Date(input);
        let year = date.getFullYear();
        let month = date.toLocaleString([], {
            month: 'short',
        });
        return month + " " + year;
    }

    return (
        <div className="container">
            <div className="column">
                <div>
                    <h2>🗓Let's Find Holidays🌏</h2>
                    <TripForm onTripAdded={onTripAdded} getHolidays={getHolidays} user={user} />
                </div>

                <div>
                    <h2>List of Holidays</h2>
                    {holidays ? (<Holiday days={holidays} message={""} />) : (<p>{message}</p>)}
                </div>
            </div>
            <div className="column">
                <h2>🛫My Saved Trips🛬</h2>
                <ul id="list-container">
                    {trips.map((trip, index) =>
                        <li className="trip-list" key={index}>
                            <button className="btn delete-button btn-sm" onClick={() => { onDelete(trip) }}>✖</button>
                            <button className="btn holiday-btn btn-sm" onClick={() => fetchHolidays(new Date(trip.traveldate), trip.country)}> {formatDate(trip.traveldate)}{" | "}{trip.name} </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Trip;