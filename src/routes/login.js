const router = require('express').Router();
const connection = require('../../config/dbConnection');

const { getHashedPassword, generateAuthToken }  = require('../utils/crypto');
const authTokens = require('../storedTokens');
const { loginValidation } = require('../utils/validation');

router.get("/", (req, res) => {
    res.render('login',{message:"", toast: false, email: ""});
});

router.post("/", (req, res) => {

    const user = req.user ? true : false
    
    const { email, password } = req.body;

    const { error } = loginValidation(req.body);
    if( error ) return res.render('login', {message:error.details[0].message, toast: true, email, user});
    

    connection.query('SELECT * FROM users',(error, response) => {
        if(error) 
            return res.render('signup', {message:"There was a error during the request. Pleas try again", toast: true, toast: true, email});
        
        const user = response.find(row => {
            return row.email === email && row.password === getHashedPassword(password);
        });

        if(user) {
            const authToken = generateAuthToken();

            console.log(user)

            // Store authentication token
            authTokens[authToken] = user;

            // Setting the auth token in cookies
            res.cookie('AuthToken', authToken);

            // Redirect user to the protected page
            return res.redirect('/');

        } else {

            return res.render('login', {message:"Incorrect email or password.", toast: true, toast: true, email});

        }
    });
});


module.exports = router;