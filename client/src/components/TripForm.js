import { useState, useEffect } from "react";

const TripForm = (props) => {
    const [countries, setCountries] = useState([]);
    const [trip, setTrip] = useState({
        country: "",
        traveldate: "",
    })

    useEffect(() => {
        fetch("/api/countries")
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.response.countries);
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
        // let emptyTrip = {
        //     country: null,
        //     traveldate: null,
        // }
        e.preventDefault();
        // console.log("current trip is (obj)" + JSON.stringify(trip));
        // setTrip(trip); // set usestate for the form
        await postTrip(trip); // make the post request to the db
        // setTrip(emptyTrip); // clear the fields
    };

    return (
        <div>
            <form className="trip-form" onSubmit={props.getHolidays}>
                <label for="country">Country: </label>

                <select name="country" id="country" onChange={handleCountryChange} required>
                    <option disabled={true} selected={true} value={null}> -- Select a Country -- </option>
                    {countries.map((country) => (
                        <option value={country["iso-3166"]}>
                            {country.country_name}, {country["iso-3166"]}
                        </option>
                    ))}
                </select><br></br>

                <label for="traveldate">Travel Date:</label>
                <input type="date" name="traveldate" onChange={handleTraveldateChange} required /><br></br>

                <button> Search Holidays </button>

            </form >
            <button onClick={handleOnClick}>Add to list</button>
        </div>
    )

};

export default TripForm;