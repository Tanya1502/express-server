const authorization = (req, res, next) => {
    // console.log(res.locals.username);
    // console.log(res.locals.role);

    if(res.locals.role != 'admin'){
        res.status(403).send('Operation not authorized')
    }
    else{
        next();
    }
    

}

module.exports = authorization;