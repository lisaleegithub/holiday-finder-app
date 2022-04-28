import { useState, useEffect } from "react";
import Form from "./form";

function Students() {

    //Original state in the parent component so the page will now when to render new students
    const [students, setStudents] = useState([]);

    // New state to check if we are working on editing a student 
    const [editingStudentId, setEditingStudentId] = useState(null);

    // async function returning promise
    const loadHolidays = (country, year) => {
        return fetch(`https://calendarific.com/api/v2/holidays?&api_key=bc565bd81fa7886bfa6025942d302a467d63bded&type=national&country=${country}&year=${year}`)
        .then((response) => response.json())
        .then(data => data.response.holidays)
    }

    // Use effect hook to render the students in the app. This will change any time that our initial state change
    useEffect(() => {
        loadHolidays("US", 2022)
        .then(response => console.log("this is response", response));
    }, []);


    // A function to handle the Delete funtionallity
    const onDelete = (student) => {
        return fetch(`/api/students/${student.id}`, {
            method: "DELETE"
        }).then((response) =>{
            //console.log(response);
            if(response.ok){
                loadStudents();
            }
        })
    }

    // A function to handle the Add a nwe Student funtionallity 
    const addStudent = (newStudent) => {
        //console.log(newStudent);
        //postStudent(newStudent);
        setStudents((students) => [...students, newStudent]);
    }

    // A function to update the list of students when the user edit a student 
    const updateStudent = (savedStudent) =>{
        setStudents((students) => {
            const newStudents = [];
            for(let student of students){
                if(student.id === savedStudent.id){
                    newStudents.push(savedStudent);
                } else{
                    newStudents.push(student);
                }
            }
            return newStudents;
        })

        // This line is just to close the form! 
        setEditingStudentId(null);

    }

    //A function to grab the student.id of the student that we want to edit
    const onEdit = (student) =>{
        const editingId = student.id;
        setEditingStudentId(editingId);

    }


    return (
        <div className="students">
            <h2> List of Students </h2>
            <ul>
                {students.map((student) => {
                    if(student.id === editingStudentId){
                        return <Form initialStudent={student} saveStudent={updateStudent} />
                    } else {
                        return (
                        <li key={student.id}> {student.firstname} {student.lastname} 
                        <button type="button" onClick={() =>{onDelete(student)}}>X</button> 
                        <button type="button" onClick={() => {onEdit(student)}}>Edit</button></li>
                        );
                    }}
                    )}
            </ul>
            {/* <Form saveStudent={addStudent} /> */}
        </div>
    );
}

export default Students;