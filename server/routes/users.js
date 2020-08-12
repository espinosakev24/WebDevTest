const express = require('express');
const router = express.Router();
const db = require('./../database');


router.get('/users', async (req, res) => {
    const users = await db.query('SELECT * FROM contacts');

    res.json(users);
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const users = await db.query('SELECT * FROM contacts WHERE id = ?', [id]);

    res.json(users);
});

router.post('/users', async(req, res) => {
    const date = new Date();
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        state: req.body.state,
        city: req.body.city,
        created_at: date,
        updated_at: date
    };

    try {
        await db.query('INSERT INTO contacts set ?', [newUser]);
        res.send('User saved!');
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;