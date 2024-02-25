const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    // console.log(req.headers.authorization);
    // console.log(token);

    try {
        var token = req.headers.authorization.slice(7, req.headers.authorization.length);
        jwt.verify(token, 'secret', (_err, decoded) => {
          //  console.log(decoded);
          res.locals.username = decoded.username;
          res.locals.role = decoded.role;
            next();
        });
        
    } catch (error) {
        res.status(401);
        res.send('Authentication failed')
    }
  
}

module.exports = verifyAuth;