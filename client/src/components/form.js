import { useState } from "react";

const Form = (props) => {
    // Initial trip in case that you want to update a new trip
    const { initialTrip = {
        id: null, location: "",
        startdate: "",
        enddate: ""
    } } = props;


    // We're using that initial trip as our initial state                       
    const [trip, setTrip] = useState(initialTrip);

    // create functions that handle the event of the user typing into the form
    const handleLocationChange = (event) => {
        const location = event.target.value;
        setTrip((trip) => ({ ...trip, location }));
    }

    const handleStartDateChange = (event) => {
        const startdate = event.target.value;
        setTrip((trip) => ({ ...trip, startdate }));
    }

    const handleEndDateChange = (event) => {
        const enddate = event.target.value;
        setTrip((trip) => ({ ...trip, enddate }));
    }

    // //A function to handle the post request
    // const postTrip = (newTrip) => {
    //     return fetch('/api/students', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'}, 
    //     body: JSON.stringify(newStudent)
    //   }).then((response) => {
    //       return response.json()
    //   }).then((data) => {
    //     console.log("From the post ", data);
    //     props.saveStudent(data);
    // });
    // }

    // //a function to handle the Update request
    // const updateStudent = (existingStudent) =>{
    //     return fetch(`/api/students/${existingStudent.id}`, {
    //         method: 'PUT',
    //         headers: {'Content-Type': 'application/json'}, 
    //         body: JSON.stringify(existingStudent)
    //       }).then((response) => {
    //           return response.json()
    //       }).then((data) => {
    //         console.log("From put request ", data);
    //         props.saveStudent(data);
    //     });
    // }

    // // Than handle submit function now needs the logic for the update scenario 
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(student.id){
    //         updateStudent(student);
    //     } else {
    //         postStudent(student);
    //     } 
    // };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>

                {/* maybe a dropdown */}
                <label>Location</label>
                <input
                    type="text"
                    id="add-location"
                    placeholder="Enter Country"
                    required
                    value={trip.location}
                    onChange={handleLocationChange}
                />

                <label>Start Date</label>
                <input
                    type="date"
                    id="add-startdate"
                    // placeholder=""
                    required
                    value={trip.startdate}
                    onChange={handleStartDateChange}
                />

                <label>End Date</label>
                <input
                    type="date"
                    id="add-enddate"
                    // placeholder=""
                    required
                    value={trip.enddate}
                    onChange={handleEndDateChange}
                />
            </fieldset>

            <button type="submit">{!trip.id ? "Add" : "Save"}</button>
        </form>
    );
};

export default Form;