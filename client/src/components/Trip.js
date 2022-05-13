import { useState, useEffect } from "react";
import TripForm from "./TripForm";
import Holiday from "./Holiday";

const Trip = ({ user }) => {
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
                    setMessage("No holidays");
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
            month: 'long',
        });
        return month + " " + year;
    }

    return (
        <div>
            <div>
                <h2>Holiday Finder</h2>
                <TripForm onTripAdded={onTripAdded} getHolidays={getHolidays} user={user} />
                {holidays ? (<Holiday days={holidays} message={""} />) : (<p>{message}</p>)}
            </div>
            <div className="list-column">
                <h2> {user.name}'s Saved Trips </h2>
                <ul className="list-container">
                    {trips.map((trip, index) =>
                        <li key={index}>
                            <button onClick={() => fetchHolidays(new Date(trip.traveldate), trip.country)}>Trip{" "}{index + 1}{": "} {trip.name}{", "} {formatDate(trip.traveldate)}</button>
                            <button type="button" className="delete-button" onClick={() => { onDelete(trip) }}>Delete</button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Trip;