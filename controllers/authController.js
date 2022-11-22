const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    const {username, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 12);

    try {
        const newUser = await User.create({
            username,
            password: hashPassword,
        });
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});
        if(!user) return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });

        const isCorrect = await bcrypt.compare(password, user.password);
        if(isCorrect) {
            res.status(200).json({
                status: 'success',
                message: 'Logged in successfully'
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Incorrect password'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}
