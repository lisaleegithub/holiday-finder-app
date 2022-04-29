const TripForm = (props) => {

    return (
        <form className="trip-form" onSubmit={props.getTrip}>
            <input type="text" name="country" placeholder="Country" />

            <button> Submit </button>

        </form>

    )

};

export default TripForm;