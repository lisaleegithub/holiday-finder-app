import { useState, useEffect } from "react";

const TripForm = (props) => {
    const [countries, setCountries] = useState([]);
    const [trip, setTrip] = useState({
        country: "DEFAULT",
        traveldate: "",
    })

    useEffect(() => {
        fetch("/api/countries")
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
            });
    }, []);

    //create functions that handle the event of user input
    const handleCountryChange = (event) => {
        const country = event.target.value;
        setTrip((trip) => ({ ...trip, country }));
    }

    const handleTraveldateChange = (event) => {
        const traveldate = event.target.value;
        setTrip((trip) => ({ ...trip, traveldate }));
    }

    //A function to handle the post request
    const postTrip = (newTrip) => {
        newTrip.userid = props.user.id;
        return fetch('/api/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTrip)
        }).then((response) => {
            return props.onTripAdded(response);
        });
    }

    const handleOnClick = async (e) => {
        let emptyTrip = {
            country: "DEFAULT",
            traveldate: "",
        }
        e.preventDefault();
        await postTrip(trip); // make the post request to the db
        setTrip(emptyTrip); // clear the fields
    };

    return (
        <div className="container trip-form">
            <form className="form-group" onSubmit={props.getHolidays}>
                <label htmlFor="country">Country: </label>

                <select name="country" id="country" onChange={handleCountryChange} value={trip.country} className="form-control" required>
                    <option disabled={true} value={"DEFAULT"} key="0"> -- Select a Country -- </option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}, {country.code}
                        </option>
                    ))}
                </select><br></br>

                <label htmlFor="traveldate">Travel Date:</label>
                <input type="date" name="traveldate" value={trip.traveldate} onChange={handleTraveldateChange} className="form-control" required /><br></br>
                <br></br>
                <button type="submit" className="submit-button btn btn-primary btn-sm"> Search Holidays </button>
            </form >
            <br></br>
            <button onClick={handleOnClick} className="btn btn-primary btn-sm">Add to list</button><br></br>
        </div>
    )

};

export default TripForm;