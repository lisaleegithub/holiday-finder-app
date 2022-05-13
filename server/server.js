const express = require('express');
const cors = require('cors');
const path = require('path');
const { auth } = require('express-openid-connect');
require('dotenv').config()
const db = require('../server/db/db-connection.js');
const { count } = require('console');
const { response } = require('express');
const { STATUS_CODES } = require('http');
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
const app = express();
const axios = require('axios').default;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUERBASEURL
};

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(auth(config));

// create an endpoint for the route /api
app.get('/', (req, res) => {
    if (req.oidc && req.oidc.isAuthenticated()) {
        // select all users with the email address given
        db.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [req.oidc.user.email])
            .then(result => {
                if (result.rowCount > 0) {
                    res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
                } else {
                    db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [req.oidc.user["given_name"], req.oidc.user.email])
                        .then(result => {
                            res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
                        })
                }
            })
    } else {
        res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
    }
});

// create an endpoint for the route for the user authenticated
// to get userid
app.get('/api/me', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        db.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [req.oidc.user.email])
        .then(response => {
            res.json(response.rows[0]);
        })
    } else {
        res.status(401).json({ error: "Error in the auth0" });
    }
});

app.use(express.static(REACT_BUILD_DIR));


// create the get request for trips table
app.get('/api/:userid/trips', cors(), async (req, res) => {
    const userid = req.params.userid;
    try {
        const { rows: trips } = await db.query('SELECT * FROM trips INNER JOIN countries ON countries.code = trips.country WHERE userid = $1 ORDER BY traveldate ASC', [userid]);
        res.send(trips);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// delete request
app.delete('/api/trips/:tripid', cors(), async (req, res) =>{
    const tripid = req.params.tripid;
    await db.query('DELETE FROM trips WHERE id=$1', [tripid]);
    res.status(200).end();
});

// Make the GET request with the country and year (that it's the redirect from the user)
app.get("/api/holidays", cors(), async (req, res) => {
    const { country, month, year } = req.query;
    const url = `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&type=national&country=${country}&month=${month}&year=${year}`;
    try {
        const requestResult = await axios.get(url);
        res.send(requestResult.data);
    } catch (err) {
        console.error("Fetch error: ", err);
    }
});

// Make the GET request with the country name and country code
app.get("/api/countries", cors(), async (req, res) => {
    try {
        const { rows: countries } = await db.query('SELECT * FROM countries');
        res.send(countries);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});

// create the POST request
app.post('/api/trips', cors(), async (req, res) => {
    const {country, traveldate, userid} = req.body;
    const result = await db.query(
        'INSERT INTO trips(country, traveldate, userid) VALUES($1, $2, $3) RETURNING *',
        [country, traveldate, userid]
    );
    res.json(result.rows[0]);
});

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