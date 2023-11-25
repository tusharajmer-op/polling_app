const express = require('express')
const app = express()
const env = require('dotenv').config().parsed
const {user_routes} = require('./Routes')
const {connect} = require('./Modals/connect')
const {errorHandler} = require('./Middleware')
const GlobalErrorHandler = require('./Middleware/global_error_handler')
const port = 3000
app.use(express.json())
app.use('/user', user_routes)

app.use((err, req, res, next) => {
    if (err instanceof GlobalErrorHandler ){
        res.status(err.status).send(err.message)
    }
    else {
    res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))