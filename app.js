const express = require('express')
const app = express()
const env = require('dotenv').config().parsed
const winston = require('winston')
const {user_routes,poll_routes,vote_routes} = require('./Routes')
const {connect} = require('./Modals/connect')
const {errorHandler} = require('./Middleware')
const GlobalErrorHandler = require('./Middleware/global_error_handler')
const messages = require('./utils/messages')
const port = env.PORT || 3000
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.File({ filename: 'calls.log',level:'http' }),
    ],
  });
app.use(express.json())
app.all('*',(req,res,next)=>{
    logger.http(`${req.method} ${req.url} ${req.ip}`)
    next()
})
app.use(express.static('public'))
app.use('/user', user_routes)
app.use('/poll', poll_routes)
app.use('/vote', vote_routes)
app.get('/', (req, res) => res.sendFile('../index.html'))
app.use((err, req, res, next) => {
    if (err instanceof GlobalErrorHandler ){
        logger.error(err.message)
        res.status(err.status).send(err.message)
    }
    else {
    logger.error(err.message)
    res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))