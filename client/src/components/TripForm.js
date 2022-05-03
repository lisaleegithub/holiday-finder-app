import { useState, useEffect } from "react";

const TripForm = (props) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("/api/countries")
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.response.countries);
            });
    }, []);

    return (
        <form className="trip-form" onSubmit={props.getTrip}>
            <label for="country">Select a Country: </label>
            <select name="country" id="country" required>
                {countries.map((country) => (
                    <option value={country["iso-3166"]}>
                        {country.country_name}
                    </option>
                ))}
            </select><br></br>

            {/* <label for="year">Enter Year:</label>
            <input type="text" name="year" placeholder="YYYY" required /><br></br> */}

            <label for="traveldate">Enter Travel Date:</label>
            <input type="date" name="traveldate" required /><br></br>

            <button> Submit </button>

        </form >

    )

};

export default TripForm;