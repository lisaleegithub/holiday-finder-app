const TripForm = (props) => {

    return (
        <form className="trip-form" onSubmit={props.getTrip}>
            <label for="country">Country:</label>
            <input type="text" name="country" placeholder="Country" /><br></br>

            <label for="year">Year:</label>
            <input type="text" name="year" placeholder="YYYY" /><br></br>

            <button> Submit </button>

        </form>

    )

};

export default TripForm;