const express = require('express');
const router = express.Router();
const axios = require('axios');

const URL = 'https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json';

router.get('/', (req, res) => {
    axios.get(URL)
    .then(
        (response) => res.json(response.data),
        (error) => console.log(error)
    )
});

router.get('/departments', (req, res) => {
    let allDepartments = [];
    axios.get(URL)
    .then(
        (response) => {
            allDepartments = Object.keys(response.data)
            res.json(allDepartments);
        },
        (error) => console.log(error)
    )
})

router.get('/departments/:department', (req, res) => {
    let department = req.params.department;

    axios.get(URL)
    .then(
        (response) => {
            res.json(response.data[department]);
        },
        (error) => console.log(error)
    )
})
module.exports = router;