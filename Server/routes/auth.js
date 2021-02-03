const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../middleware/auth');
const bcrypt = require('bcryptjs');


router.post('./register', async (req, res) => {
    res.send('Register')

    //Lets validate the data before we add a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //check if user is in database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.gentSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})


//LOGIN
router.post('./login', (req, res) => {
    //Validate
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    //Does email exist already
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or pasword is wrong');
    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or pasword is wrong');


    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);



})

module.exports = router;