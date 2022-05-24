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
        <div className="container float-container">
            <div className="trip-column">
                <div>
                    <h2>🌏Let's Find Holidays🌏</h2>
                    <TripForm onTripAdded={onTripAdded} getHolidays={getHolidays} setHolidays={setHolidays} setMessage={setMessage} user={user} />
                </div>
                <br />
                <div className="long-line"></div>
                <div>
                    <h2>🗓List of Holidays🗓</h2>
                    {holidays ? (<Holiday days={holidays} message={""} />) : (<p>{message}</p>)}
                </div>
            </div>

            <div id="trip-list">
                <h2 >🛫My List🛬</h2>
                <p style={{fontStyle:"italic"}}>View holidays by clicking your saved trip</p>

                <table className="trip-table">
                    <tr>
                        <th style={{fontWeight:"bold", fontSize:"1.5rem", textAlign:"left", textDecoration:"underline"}}>Saved Trips</th>
                        <th style={{fontWeight:"bold", fontSize:"1.5rem", textAlign:"left", textDecoration:"underline"}}>Delete</th>
                    </tr>

                    {trips.map((trip, index) => (
                        <tr className="trip-list" key={index}>
                            <td><button className="btn holiday-btn btn-sm" onClick={() => fetchHolidays(new Date(trip.traveldate), trip.country)} style={{fontSize:"1.2rem"}}> {formatDate(trip.traveldate)} {trip.name} </button></td>
                            <td><button className="btn delete-button btn-sm" onClick={() => { onDelete(trip) }} style={{fontSize:"1.2rem"}}>✖</button></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Trip;