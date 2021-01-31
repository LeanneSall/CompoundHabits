const express = require('express');
const { validationResult, check } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// For user 
//Register User
//Login User
//Get current user
//After getting current user can get user's habits
//Only home, about, contact, login and register pages are available to public

//POST
const User = require('../models/User')


router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password').isLength({ min: 6 })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { name, email, password } = req.body;

    try {
        //See if user exists
        let user = await User.findOne({ email })
        //if user exists send back an error
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] })
        }

        user = new User({
            name,
            email,
            password
        })
        //encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        //save to database
        await user.save();

        //return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }


})


module.exports = router;