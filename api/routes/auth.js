var express = require('express');
var router = express.Router();
const model = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret')
const jwtAuth = require('../middleware/jwtAuth')

/* GET home page. */
router.post('/login', async function(req, res, next) {
    
    try {
        const userPwd = await model.users.findOne({
            attributes: ['email','password'],
            where: {
                email: req.body.email
            }
        })
        
        if(!userPwd){
            return res.status(400).json({
                'status': 'ERROR',
                'messages': 'Incorrect Email or Password',
                'data': {}
            })
        }

        const match = await bcrypt.compare(req.body.password, userPwd.password)
        if(!match){
            return res.status(400).json({
                'status': 'ERROR',
                'messages': 'Incorrect Email or Password',
                'data': {}
            })
        }
        
        const {dataValues} = await model.users.findOne({
            attributes: ['user_id', 'name', 'email', 'role'],
            where: {
                email: req.body.email
            }
        })

        const token = jwt.sign(dataValues, secret.APISecret);

        res.json({
            'status': 'OK',
            'messages': 'Login Successful',
            'data': {
                'token': token,
            }
        })
    } catch (err) {
        if(req.body){
            return res.status(400).json({
                'status': 'ERROR',
                'messages': 'Please provide login information before continue.',
                'data': {}
            })
        }

        res.status(500).json({
            'status': 'ERROR',
            'messages': err.message,
            'data': {}
          })
    }
});

router.get('/validate', async function(req, res, next){
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(400).json({
                'status': 'ERROR',
                'messages': 'Token cannot be null',
                'data': {}
            });
        }
        const token = authHeader.split(' ')[1];

        const user = jwt.verify(token, secret.APISecret);
        const verifyUser = await model.users.findOne({
            attributes: ['user_id','name','email','role'],
            where: {
                user_id: user.user_id
            }
        })

        if(!verifyUser){
            return res.status(400).json({
                'status': 'ERROR',
                'messages': 'Authentication Failed, User not found',
                'data': {}
            })
        }

        const newToken = jwt.sign(user, secret.APISecret)
        res.json({
            'status': 'OK',
            'messages': 'Authentication Success',
            'data': {
                'token': newToken,
                user,
            }
        })
    } catch (error) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': error.message,
            'data': {}
        });
    }
})

module.exports = router;
