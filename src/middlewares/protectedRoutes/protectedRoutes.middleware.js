const jwt = require('jsonwebtoken');

class ProtectedRoutesMiddleware {
    protect = (req,res, next) => {
        const token = req.get('Authorization');
        
        if (!token) {
            res.status(401).json({
                type: 'Auth',
                message: 'Missing token',
            });
        }
    
        const tokenWithoutBearer = token.split(' ')[1];        
    
        try {
            const tokenInfo = jwt.verify(tokenWithoutBearer, process.env.JWT_HASH);
            
            req.user = tokenInfo;                      
            
            return next();
    
        } catch (error) {
            res.status(401).json({
                type: 'Auth',
                message: 'Invalid credentials',
            });
        }

    }
}

module.exports = new ProtectedRoutesMiddleware();