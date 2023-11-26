const router = require('express').Router()
const {check_incoming_request} = require('../Middleware')
const {vote_controller} = require('../Controller')
router.all('*',(req,res,next)=>{
   check_incoming_request(req,res,next)})
router.post('/poll/:pollid/', async(req, res,next) => {

    req.body.poll_id = req.params.pollid
    await vote_controller.vote(req,res,next)
})
router.get('/view/result/:poll_id', async(req, res,next) => {  
    req.body.poll_id = req.params.poll_id
    await vote_controller.result(req,res,next)
})
module.exports = router