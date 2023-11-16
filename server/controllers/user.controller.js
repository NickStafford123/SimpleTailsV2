const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            fullname: req.body.fullname,
            password: hashedPassword
        })
        await user.save()
        res.status(201).send('User created')
    } catch(err){
        if (err.code === 11000){
            res.status(400).send('Email is already taken')
        } else if (err.name === 'ValidationError') {
            let errors = []

            for (let field in error.errors){
                errors.push(error.errors[field].message)
            }

            return res.status(400).json({ errors:errors })
        } else {
            console.error(error)
            return res.status(500).send(error.message)
        }
    }
}

exports.loginUser = async (req, res) =>{
    const user = await User.findOne({ email: req.body.email })
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{
                expiresIn: '1h'
            })
            res.json({ token, userId: user._id });
        } else {
            res.status(400).send('Invalid credentials')
        }
}