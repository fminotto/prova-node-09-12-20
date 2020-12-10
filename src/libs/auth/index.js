const jwt = require('jsonwebtoken');

class Auth{
    verifyToken(req,res,next){
        if (!req.headers.authorization) {
            return res.status(403).json({ error: 'No credentials sent!' });
          }
          let token = req.headers.authorization;
          jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            
            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    }
}

module.exports = Auth;