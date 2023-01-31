const jwt = require('jsonwebtoken');
const secret = require('../config/secret')

module.exports = {
    authenticateJWT(req, res, next) {
        if(req.path === '/api/auth/login'){
            return next();
        }

        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, secret.APISecret, (err, user) => {
                if (err) {
                    return res.status(400).json({
                        'status': 'ERROR',
                        'messages': 'Authentication failure, try again.',
                        'data': {}
                    })
                }
                
                next();
            });
        } else {
            res.status(400).json({
                'status': 'ERROR',
                'messages': 'Unauthorized',
                'data': {}
            });
        }
    }
   
}