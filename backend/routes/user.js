const router = require('express').Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { requireLogin } = require("../middleware/auth")

require('dotenv').config();

const jwtSecret = process.env.jwtSecret;
//Register User
router.post('/register', async(req, res) => {
    const {name, email, password} = req.body
    try{
        let user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({ msg: "There is already user with this e-mail" });
        }
        const hashed_password = await bcrypt.hash(password, 10)
        user = new User({
            name,
            email,
            password: hashed_password
        })
        await user.save()
        return res.status(201).json({message : "User Created Successfully"});
    } catch (err) {
        
    }
});

//Login user

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        let user =  await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "Invalid Credentials" });
        }
        const isMatch =  await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ msg: "Password doesn't match" })
        }

        const token = jwt.sign({_id: user._id}, jwtSecret, 
            {expiresIn: '1h'}); //so that the user can go to any protected route which requires the logged in user
            return res.json({token})//token will be inserted in headers when visiting a protected route 
    } catch (err) {

    }
});

router.get('/', requireLogin, async(req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        res.json(user)
    } catch (err){
        console.log(err)
    }
})

module.exports = router