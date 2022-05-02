const express = require('express');
const cors = require('cors');
const path = require('path');
const { auth } = require('express-openid-connect');
require('dotenv').config()
const db = require('../server/db/db-connection.js');
const { count } = require('console');
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
const app = express();
const axios = require('axios').default;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER
};

const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());
app.use(auth(config));

// create an endpoint for the route /api
app.get('/', (req, res) => {
    // console.log(req.oidc.isAuthenticated());
    res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});

// create an endpoint for the route for the user authenticated
app.get('/api/me', (req, res) => {
    console.log(req.oidc.isAuthenticated());
    // res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
    if (req.oidc.isAuthenticated()) {
        console.log("req.oidc.user", req.oidc.user)
        res.json(req.oidc.user);
    } else {
        res.status(401).json({error: "Error in the auth0"});
    }
});

app.use(express.static(REACT_BUILD_DIR));

// create the get request for users table
app.get('/api/users', cors(), async (req, res) => {
    try {
        const { rows: users } = await db.query('SELECT * FROM users');
        res.send(users);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// create the get request for trips table
app.get('/api/trips', cors(), async (req, res) => {
    try {
        const { rows: trips } = await db.query('SELECT * FROM trips');
        res.send(trips);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// Make the GET request with the country and year (that it's the redirect from the user)
app.get("/api/holidays", cors(), async (req, res) => {
    country = req.query.country;
    year = req.query.year;
    console.log("this is country", country);
    console.log("this is year", year);

    const url = `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&type=national&country=${country}&year=${year}`;
    try {
        const requestResult = await axios.get(url);
        // console.log("data", data)

        // console.log("msg", data.response.holidays)

        // const result = await data.json();
        // console.log("result", result);

        res.send(requestResult.data);

    } catch (err) {
        console.error("Fetch error: ", err);
    }
});

// Make the GET request with the country name and country code
app.get("/api/countries", cors(), async (req, res) => {
    const url = `https://calendarific.com/api/v2/countries?api_key=${process.env.API_KEY}`;
    try {
        const countriesResult = await axios.get(url);
        res.send(countriesResult.data);
    } catch (err) {
        console.error("Fetch error: ", err);
    }
});

// //create the POST request
// app.post('/api/students', cors(), async (req, res) => {
//     const newUser = { firstname: req.body.firstname, lastname: req.body.lastname }
//     console.log([newUser.firstname, newUser.lastname]);
//     const result = await db.query(
//         'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
//         [newUser.firstname, newUser.lastname]
//     );
//     console.log(result.rows[0]);
//     res.json(result.rows[0]);
// });

// // delete request
// app.delete('/api/students/:studentId', cors(), async (req, res) =>{
//     const studentId = req.params.studentId;
//     //console.log(req.params);
//     await db.query('DELETE FROM students WHERE id=$1', [studentId]);
//     res.status(200).end();

// });

// // Put request - Update request
// app.put('/api/students/:studentId', cors(), async (req, res) =>{
//     const studentId = req.params.studentId;
//     const updateStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname }
//     //console.log(req.params);
//     // UPDATE students SET lastname = 'TestMarch' WHERE id = 1;
//     console.log(studentId);
//     console.log(updateStudent);
//     const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id = ${studentId} RETURNING *`;
//     console.log(query);
//     const values = [updateStudent.lastname, updateStudent.firstname];
//     try{
//         const updated = await db.query(query, values);
//         console.log(updated.rows[0]);
//         res.send(updated.rows[0]);
//     } catch (e){
//         console.log(e);
//         return res.status(400).json({e});
//     }
// });

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});