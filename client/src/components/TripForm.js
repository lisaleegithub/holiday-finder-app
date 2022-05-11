import { useState, useEffect } from "react";

const TripForm = (props) => {
    const [countries, setCountries] = useState([]);
    const [trips, setTrips] = useState({
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
        setTrips((trips) => ({ ...trips, country }));
    }

    const handleTraveldateChange = (event) => {
        const traveldate = event.target.value;
        setTrips((trips) => ({ ...trips, traveldate }));
    }

    //A function to handle the post request
    const postTrips = (newTrip) => {
        newTrip.userid = props.user.id;
        return fetch('/api/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTrip)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            // console.log("From the post ", data);
            props.addTrips(data);
        });
    }

    const handleOnClick = (e) => {
        // let emptyTrip = {
        //     country: null,
        //     traveldate: null,
        // }
        e.preventDefault();
        // console.log("current trip is (obj)" + JSON.stringify(trips));
        setTrips(trips); // set usestate for the form
        postTrips(trips); // make the post request to the db
        // setTrips(emptyTrip); // clear the fields
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